# EF Core 知识整理


> 本文以 **EF Core 10（EF10，随 .NET 10 于 2025 年 11 月发布，LTS，支持至 2028-11-10）** 为基准整理，涉及版本差异处会标注。EF10 需要 .NET 10 SDK 构建、.NET 10 运行时运行，不支持更早的 .NET 版本，也不支持 .NET Framework。
>
> 定位：一份可按目录检索的复习/速查笔记，而非入门教程。默认读者写过基本 LINQ 查询，但想把零散知识点串成体系。

## 1. EF Core 是什么

EF Core 是 .NET 的对象关系映射（O/RM）框架：把实体类映射到数据库表，把 LINQ 表达式树翻译成 SQL，并把查询结果物化回对象。它不是「隐藏 SQL 的黑盒」，而是「用 C# 写 SQL、但必须看得见生成了什么 SQL」的一层抽象。

与经典 EF6 的关键差异：

| 维度 | EF6 | EF Core |
| --- | --- | --- |
| 平台 | .NET Framework / Windows | 跨平台，.NET 6+ |
| 建模 | EDMX 设计器、Database First 为主 | Code First 为主，模型从代码约定推导；支持反向工程（Scaffold） |
| 数据库 | 关系型为主 | 关系型 + 非关系型（Cosmos DB） |
| 映射能力 | 较全（如多对多无导航、存储过程映射） | 更精简，但持续补齐；不支持 EDMX |
| 性能 | 较重 | 轻量、可池化、编译查询、批量更新 |
| 迁移 | 独立工具 | `dotnet ef` CLI / PMC，随包发布 |

核心组件：

| 组件 | 职责 |
| --- | --- |
| `DbContext` | 工作单元（Unit of Work）+ 身份映射（Identity Map），持有连接、模型、变更跟踪器 |
| `DbSet<TEntity>` | 实体的查询入口与仓库式门面 |
| Model / `IModel` | 实体 → 表/列的映射元数据，`OnModelCreating` 时构建并缓存 |
| Provider | 把通用表达式树翻译成具体数据库方言（SQL Server、Npgsql、SQLite、Pomelo MySQL…） |
| `ChangeTracker` | 记录实体状态，决定 `SaveChanges` 生成哪些 INSERT/UPDATE/DELETE |
| Migrations | 模型快照 → 增量架构变更脚本 |

Provider 选择提示：`Microsoft.EntityFrameworkCore.SqlServer`、`Npgsql.EntityFrameworkCore.PostgreSQL`、`Microsoft.EntityFrameworkCore.Sqlite`、`Pomelo.EntityFrameworkCore.MySql` 各自对 JSON、数组、序列、uuid 的支持不同。**同一个 LINQ 在不同 Provider 上可能生成不同 SQL，甚至不可翻译**；`InMemory` 只适合极简场景，官方明确不建议用它替代真实数据库做测试（它不校验关系、约束、事务和 SQL 翻译）。

## 2. DbContext：生命周期与变更跟踪

### 2.1 注册与配置

```csharp
// Program.cs
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
           .EnableRetryOnFailure(maxRetryCount: 3)   // 连接弹性
           .LogTo(Console.WriteLine, LogLevel.Information));

// 高吞吐、上下文无状态时可用池化
builder.Services.AddDbContextPool<AppDbContext>(options => /* ... */, poolSize: 128);

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Blog> Blogs => Set<Blog>();
    public DbSet<Post> Posts => Set<Post>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        => modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
}
```

要点：

- 默认 **Scoped**，一个 Web 请求一个实例；`DbContext` **不是线程安全的**，禁止跨线程并发使用同一实例。
- `AddDbContextPool` 复用上下文实例但会重置状态；若上下文里注入了**每次请求不同的状态**（如从 `IHttpContextAccessor` 取租户 ID 并缓存在字段里），池化会串数据，别用。
- `OnConfiguring` 适合没有 DI 的场景（控制台、设计时），两者都写时 `OnConfiguring` 后执行、可叠加。
- 模型只构建一次并按「上下文类型 + 配置」缓存；把租户相关变量写进 `OnModelCreating` 是典型误用，租户过滤应放进查询过滤器的表达式参数里。

### 2.2 实体状态与 SaveChanges

| 状态 | 含义 | `SaveChanges` 行为 |
| --- | --- | --- |
| `Added` | 新实体 | INSERT |
| `Unchanged` | 与快照一致 | 无操作 |
| `Modified` | 属性与快照不同 | UPDATE（默认只更新变化列） |
| `Deleted` | 待删除 | DELETE |
| `Detached` | 未被跟踪 | 无操作 |

`SaveChanges` / `SaveChangesAsync` 会先调用 `DetectChanges()`，再按依赖关系排序，**默认把本次所有变更包在一个数据库事务里**（要么全成，要么全回滚）。返回值是受影响行数。

```csharp
context.ChangeTracker.AutoDetectChangesEnabled = false;  // 批量插入时可临时关闭自动检测
context.ChangeTracker.Clear();                       // 清空跟踪，长生命周期上下文防内存膨胀
var entry = context.Entry(blog);
entry.Property(b => b.Name).IsModified = true;        // 只更新单列
entry.Reload();                                      // 丢弃本地修改，重新读库
```

`DetectChanges` 是 O(被跟踪实体数)，大批量循环 `Add` 时是主要开销来源；批量插入用 `AddRange` + 适时 `Clear()`，或改用 `ExecuteUpdate`/第三方 Bulk 扩展。

## 3. 模型配置

优先级：**约定（Convention） < 数据注解（Data Annotations） < Fluent API**。Fluent API 是唯一能表达全部映射的方式，团队项目建议统一用 `IEntityTypeConfiguration<T>` 分文件维护。

```csharp
public class BlogConfiguration : IEntityTypeConfiguration<Blog>
{
    public void Configure(EntityTypeBuilder<Blog> b)
    {
        b.ToTable("Blogs");
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).ValueGeneratedOnAdd();          // identity / 自增
        b.Property(x => x.Url).IsRequired().HasMaxLength(200);
        b.HasIndex(x => x.Url).IsUnique();
        b.Property<DateTime>("LastUpdated");                  // 阴影属性：类里没有，模型里有
        b.Property(x => x.Status).HasConversion<string>();    // 枚举存字符串
        b.Property(x => x.RowVersion).IsRowVersion();         // SQL Server 乐观并发
        b.HasQueryFilter(x => !x.IsDeleted);                  // 全局查询过滤器：软删除
        b.HasMany(x => x.Posts)
         .WithOne(p => p.Blog)
         .HasForeignKey(p => p.BlogId)
         .OnDelete(DeleteBehavior.Cascade);
    }
}
```

### 3.1 关系与级联删除

| 关系 | 常规配置 | 备注 |
| --- | --- | --- |
| 一对多 | `HasMany().WithOne().HasForeignKey()` | 外键可为空 → 可选关系 |
| 一对一 | `HasOne().WithOne().HasForeignKey<Dependent>(...)` | 必须显式指定哪边是从表 |
| 多对多 | `HasMany().WithMany()`（EF5+ 跳过导航） | 自动生成联结表，可用 `UsingEntity` 定制中间实体 |

`DeleteBehavior` 决定「删除主体时从表怎么办」：`Cascade`（一起删）、`SetNull`（外键置空，要求可空）、`Restrict`/`NoAction`（阻止或依赖数据库约束）、`ClientCascade`（只删已跟踪的从表）。**注意 `Cascade` 与 `SetNull` 是 EF 对已加载实体的客户端行为，数据库侧仍要建对应的外键约束**，两者不一致时会踩坑。

### 3.2 继承映射

| 策略 | 表结构 | 适用 | 代价 |
| --- | --- | --- | --- |
| TPH（默认） | 单表 + 判别列 | 子类少、字段差异小、查询快 | 列稀疏、子类字段必须可空 |
| TPT（EF5+） | 每类一张表 | 子类字段多、需要非空约束 | 查询 JOIN 多 |
| TPC（EF7+） | 每个具体类一张独立表 | 按类型查询为主 | 主键必须跨表全局唯一（用 Sequence/HiLo） |

### 3.3 值对象、拥有类型与复杂类型

| 概念 | 是否有标识/主键 | 典型用途 |
| --- | --- | --- |
| 拥有类型 `OwnsOne` / `OwnsMany` | 有（影子主键），可映射到独立表 | 地址、订单项；EF8 起可 `ToJson()` 存成单列 JSON |
| 复杂类型 `ComplexProperty`（EF8+） | 无标识，不能独立查询 | 值对象，如金额、坐标；EF10 起也支持 `ToJson()` |
| 值转换器 `HasConversion` | — | 枚举、自定义结构、加解密、JSON 序列化到单列 |

选择顺序：纯值对象 → 复杂类型；需要作为独立集合/被单独引用 → 拥有实体；需要自己的主键与生命周期 → 普通实体。JSON 列便于存稀疏属性，但**过滤性能依赖数据库的 JSON 索引能力**，别在大表上想当然。

### 3.4 其他常用配置

- 值生成：`ValueGeneratedOnAdd`（identity/默认）、`UseHiLo`、`UseSequence`、`ValueGeneratedOnAddOrUpdate`；Guid 主键通常客户端生成（`Guid.CreateVersion7()` 之类）以避免回查。
- 种子数据：`HasData()`，主键必须显式给定，随迁移一起版本化；不适合大批量初始化数据。
- 表拆分 / 实体拆分：`ToTable` 共享 + `HasOne` 共主键，或 `SplitToTable`。
- 后备字段：`HasField("_name")`、`UsePropertyAccessMode(...)`，用于封装领域模型。
- 全局查询过滤器：软删除、多租户常用；`IgnoreQueryFilters()` 会**关掉该实体所有过滤器**（EF10 可按名关闭，见第 8 节）。过滤器里引用上下文实例字段（如 `_tenantId`）才能实现按租户动态取值。

## 4. 查询

### 4.1 从 LINQ 到 SQL

```
LINQ 表达式树 → 查询编译（缓存）→ Provider 翻译 → 生成 SQL + 参数 → 执行 → 物化 → 变更跟踪/身份解析
```

- `IQueryable` 是**延迟执行**：构造不查库，`ToListAsync` / `FirstOrDefaultAsync` / `CountAsync` / 枚举时才发 SQL。
- EF Core 3.0 起**中间查询不再允许隐式客户端求值**，无法翻译会直接抛异常；只有最终投影（最外层 `Select`）可以在客户端执行。
- 查询按「表达式树形状」缓存，所以**同一个 `Where` 里传入不同常量会复用编译结果并被参数化**；字符串拼接出的表达式形状则会撑爆缓存。

### 4.2 跟踪与非跟踪

```csharp
var blogs = await context.Blogs.AsNoTracking().ToListAsync();                     // 只读，不建快照，最快
var blogs2 = await context.Blogs.Include(b => b.Posts)
                                .AsNoTrackingWithIdentityResolution()          // 无跟踪但仍保证同一行只物化一次
                                .ToListAsync();
```

经验：读多写少的接口默认 `AsNoTracking`；需要更新时用 `AsTracking()` 或 `Attach` 后再改。无跟踪查询不会自动 fixup 导航关系，涉及图结构时要留意。

### 4.3 加载相关数据的三种方式

| 方式 | 写法 | 适用 / 风险 |
| --- | --- | --- |
| 预先加载 | `Include(b => b.Posts).ThenInclude(p => p.Author)` | 一次往返；多个集合 `Include` 会产生**笛卡尔积** |
| 过滤 Include | `Include(b => b.Posts.Where(p => p.IsPublished).OrderBy(...).Take(5))`（EF5+） | 只加载需要的子集 |
| 显式加载 | `context.Entry(blog).Collection(b => b.Posts).LoadAsync()` | 按需，但易写成 N+1 |
| 延迟加载 | `UseLazyLoadingProxies()`（需 `Microsoft.EntityFrameworkCore.Proxies`、导航属性 `virtual`） | 方便但隐式往返，线上最容易引发 N+1，慎用 |

多集合 `Include` 时优先 `AsSplitQuery()`（拆成多条 SQL 再在客户端拼装）；代价是多次往返，且**拆分查询之间不保证一致性快照**，高并发写入场景需评估。`AsSingleQuery()` 可强制单查询。

### 4.4 投影优先

```csharp
// 好：只取需要的列，生成 SELECT Name, Count，不跟踪实体
var dto = await context.Blogs
    .Where(b => b.Rating > 3)
    .Select(b => new BlogDto { Name = b.Name, PostCount = b.Posts.Count })
    .ToListAsync();
```

`Select` 到 DTO / 匿名类型是最高性价比的优化：少传数据、少物化、不跟踪。`Include` 之后再 `Select` 投影通常会被 EF 忽略，属于无意义写法。

### 4.5 原生 SQL 与编译查询

```csharp
var name = "dotnet";
var sql = context.Blogs
    .FromSqlInterpolated($"SELECT * FROM Blogs WHERE Name = {name}")  // 内插字符串自动参数化
    .Where(b => b.Rating > 3);                                        // 可继续叠加 LINQ

await context.Database.ExecuteSqlInterpolatedAsync($"UPDATE Blogs SET Rating = 5 WHERE Name = {name}");
var ids = await context.Database
    .SqlQueryRaw<int>("SELECT Id AS Value FROM Blogs")   // EF7+ 非实体结果；标量类型列名须为 Value
    .ToListAsync();
```

- 用 `FromSqlInterpolated` / `ExecuteSqlInterpolated`（或 `FromSqlRaw` 显式传 `SqlParameter`），**绝不要手工拼字符串**；EF10 还会对 Raw SQL 的字符串拼接发出警告。
- `FromSql*` 的 SQL 必须返回实体映射所需的全部列，且默认是跟踪查询；复杂报表 SQL 建议用 Dapper 或视图映射。
- 热点查询可用 `EF.CompileQuery` / `EF.CompileAsyncQuery` 跳过查询编译开销；只在编译开销确实占比高时用（先测）。

### 4.6 常见查询坑

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 运行时抛「无法翻译」 | `Where` 里调用了自定义方法/正则/复杂字符串操作 | 改用 `EF.Functions`、数据库函数映射，或先物化再过滤（注意数据量） |
| N+1 次 SQL | 循环里访问未加载导航，或延迟加载 | `Include` / 一次性投影 / 批量预取 |
| 结果集暴涨 | 多个集合 `Include` 笛卡尔积 | `AsSplitQuery()` 或改投影 |
| 字符串比较行为诡异 | 大小写/尾随空格由数据库排序规则决定，不是 C# 规则 | 统一 `Collation`，或显式用 `EF.Functions.Like` |
| `DateTime.Now` 查询不符合预期 | 客户端求值与数据库 `GETDATE()` 语义不同 | 先算好变量再传入，或用数据库函数映射 |
| 分页结果重复/漏 | `OrderBy` 不唯一 | 追加唯一键做第二排序键（EF10 对拆分查询的排序也更一致） |
| 查询缓存膨胀 | 动态拼表达式、每次形状不同 | 固定查询形状 + 参数化；EF10 改进了集合参数化转换 |

## 5. 写入、事务与并发

### 5.1 更新与批量操作

```csharp
// 普通：跟踪 → 改 → 保存
var blog = await context.Blogs.FindAsync(id);
blog.Url = "https://example.com";
await context.SaveChangesAsync();

// 批量：EF7+，直接发一条 UPDATE/DELETE，不加载实体、不走变更跟踪
await context.Blogs
    .Where(b => b.Rating < 3)
    .ExecuteUpdateAsync(s => s.SetProperty(b => b.Rating, b => b.Rating + 1));
await context.Blogs.Where(b => b.IsDeleted).ExecuteDeleteAsync();
```

`ExecuteUpdate` / `ExecuteDelete` 的代价要清楚：**绕过 `ChangeTracker`、绕过 `SaveChanges` 的隐式事务边界、不触发级联删除的客户端行为、不会更新已跟踪实体的内存状态、不会做乐观并发检查**。执行完同一上下文里已加载的实体是陈旧的，必要时 `ChangeTracker.Clear()`。EF10 起 `ExecuteUpdateAsync` 接受普通 lambda（可在运行时按条件决定 `SetProperty`），并支持更新 JSON 列中的复杂类型。

### 5.2 断开实体（Web API 常见）

| API | 行为 |
| --- | --- |
| `Attach(entity)` | 标记 `Unchanged`，仅当你随后改属性才有 UPDATE |
| `Update(entity)` | 递归遍历图，把实体标记为 `Modified`（**所有列都会被更新**），键由生成器生成的新实体标记 `Added` |
| `Entry(e).State = EntityState.Modified` | 只影响该实体，不递归 |
| `FindAsync(id)` | 先查 `ChangeTracker`（已跟踪则**不发 SQL**），未命中才查库 |

「先查再改」比 `Update(dto)` 更安全：避免全列覆盖、避免把未提交字段误写、便于做并发校验。

### 5.3 事务与重试

```csharp
await using var tx = await context.Database.BeginTransactionAsync();
try
{
    await context.Orders.AddAsync(order);
    await context.SaveChangesAsync();
    await context.Database.ExecuteSqlInterpolatedAsync($"UPDATE Stock SET Qty = Qty - 1 WHERE Id = {id}");
    await tx.CommitAsync();
}
catch { await tx.RollbackAsync(); throw; }
```

- 跨多个 `SaveChanges`、混合原生 SQL、跨 DbContext 共享事务 → 显式事务；`ExecutionStrategy` 可跨上下文加入同一事务。
- 启用 `EnableRetryOnFailure` 后，**自定义重试逻辑必须包在 `executionStrategy.ExecuteAsync(...)` 里**，否则会抛「用户发起的事务不支持重试」；`SaveChanges` 本身已由策略自动处理。
- 事务尽量短，别把远程调用包在数据库事务里。

### 5.4 乐观并发

```csharp
b.Property(x => x.RowVersion).IsRowVersion();     // SQL Server rowversion
// 或 b.Property(x => x.Version).IsConcurrencyToken();

try { await context.SaveChangesAsync(); }
catch (DbUpdateConcurrencyException ex)
{
    foreach (var entry in ex.Entries)
    {
        var dbValues = await entry.GetDatabaseValuesAsync();   // 数据库当前值
        if (dbValues is null) { /* 已被他人删除 */ }
        else
        {
            entry.OriginalValues.SetValues(dbValues);          // 数据库赢：以库值为基准重提交
            // 或 entry.CurrentValues.SetValues(...)            // 客户端赢
            await context.SaveChangesAsync();                  // 注意重试仍可能再次冲突
        }
    }
}
```

原理：`UPDATE ... WHERE Id = @id AND RowVersion = @original`，受影响行数为 0 即判定冲突。用 `ExecuteUpdate` 时这套检查**不会自动发生**，需要手动在 `Where` 里带版本条件。

## 6. 迁移与部署

### 6.1 常用命令

| 目的 | 命令 |
| --- | --- |
| 安装/升级工具 | `dotnet tool install -g dotnet-ef` / `dotnet tool update -g dotnet-ef` |
| 新增迁移 | `dotnet ef migrations add AddBlogRating` |
| 应用到本地库 | `dotnet ef database update` / 回退 `dotnet ef database update <上一迁移名>` |
| 删除最后一个未应用的迁移 | `dotnet ef migrations remove` |
| 生成 SQL 脚本 | `dotnet ef migrations script --idempotent -o migrate.sql` |
| 生成自包含迁移程序 | `dotnet ef migrations bundle`（官方推荐用于部署自动化） |
| 反向工程已有库 | `dotnet ef dbcontext scaffold "<连接串>" Microsoft.EntityFrameworkCore.SqlServer` |
| 查看模型/迁移清单 | `dotnet ef migrations list` / `dotnet ef dbcontext info` |

迁移目录里三个东西要一起进版本库：`*.cs`（Up/Down）、`*Designer.cs`（该次迁移的模型快照）、`AppDbContextModelSnapshot.cs`（当前模型快照，用于计算下一次差异）。数据库里的 `__EFMigrationsHistory` 表记录已应用的迁移 ID。

设计时若上下文依赖 DI/配置无法直接构造，实现 `IDesignTimeDbContextFactory<TContext>`；迁移项目与启动项目分离时用 `--project` / `--startup-project`。

### 6.2 生产部署要点

- 官方建议：本地开发直接用 CLI；部署自动化用**迁移捆绑包**；需要 DBA 审核/改写 SQL 时用**已审核的 SQL 脚本**（`--idempotent` 可重复执行）。
- 不建议在多实例同时启动的 Web 应用里直接 `await context.Database.MigrateAsync()`：并发迁移、权限过大、启动时间不可控。放到发布流水线或 init job 里，且只跑一次。
- `EnsureCreated()` 只建库建表、**不写迁移历史表**，之后无法再用迁移演进模型；只适合原型、集成测试的临时库。
- 破坏性变更（改列类型、删列、重命名）EF 生成的迁移可能直接丢数据，必须人工改写 `Up()`，必要时拆成「加新列 → 双写回填 → 切读 → 删旧列」多步发布。
- EF10 起「**停止用一个事务操作所有迁移**」，即每个迁移各自一个事务；对长批次迁移的失败恢复行为有影响，升级时留意。

## 7. 性能与诊断

### 7.1 先看 SQL，再谈优化

```csharp
optionsBuilder.LogTo(Console.WriteLine, new[] { RelationalEventId.CommandExecuted })
              .EnableSensitiveDataLogging();     // 仅开发环境：会打印参数值，有泄密风险

var sql = query.ToQueryString();                 // 不执行，直接看生成的 SQL
var q = context.Blogs.TagWith("BlogList API v2"); // 在 SQL 里加注释，便于 APM/慢查询定位
```

EF10 默认对日志中的**内联常量做脱敏（redaction）**，生产环境更安全；需要参数值时仍要显式开启敏感日志，但仅限本地排查。更深的可观测性用 `DbCommandInterceptor`（读写分离、加 hint、埋点）或 OpenTelemetry 的 EF Core instrumentation。

### 7.2 优化清单

| 症状 | 优先手段 |
| --- | --- |
| 只读接口慢、内存高 | `AsNoTracking()` + `Select` 到 DTO，不取多余列 |
| 列表页 N+1 | 投影里直接 `Count`/`Any`，或 `Include` + `AsSplitQuery` |
| 热点查询 CPU 高 | `EF.CompileQuery`、加索引、检查参数化与执行计划 |
| 大批量导入慢 | `AddRange` + 关 `AutoDetectChangesEnabled` + 分批 `SaveChanges`/`Clear()`，或第三方 Bulk 扩展 |
| 批量状态更新生成上千条 UPDATE | `ExecuteUpdateAsync` |
| 高并发下上下文创建开销 | `AddDbContextPool` |
| 数据库往返多 | 合并查询、减少 `SaveChanges` 次数、外部缓存 |
| 偶发连接失败 | `EnableRetryOnFailure`（配合 `ExecutionStrategy`） |
| 长生命周期上下文内存涨 | 缩短作用域、`ChangeTracker.Clear()` |

顺序原则（官方性能文档同样强调）：**先测量、再定位瓶颈、再改；用 BenchmarkDotNet 对自己的场景做对比，别照搬公共基准**。多数真实系统里，网络往返与数据库执行时间远大于 EF 自身开销，索引和查询形状通常比「换 ORM」有效得多。

## 8. EF Core 10 值得关注的新东西

| 特性 | 说明 | 注意 |
| --- | --- | --- |
| `LeftJoin` / `RightJoin` | .NET 10 的一流 LINQ 运算符，EF 可翻译，告别 `GroupJoin` + `SelectMany` + `DefaultIfEmpty` 模板 | 结果选择器右侧可能为 `null`，投影要做空值处理 |
| 命名查询筛选器 | `HasQueryFilter("SoftDelete", ...)` + `IgnoreQueryFilters(["SoftDelete"])` 只关掉指定过滤器 | 迁移旧代码时，`IgnoreQueryFilters()` 无参行为仍会全关，需逐个补名 |
| 复杂类型映射 JSON | `ComplexProperty(x => x.Attrs, x => x.ToJson())`，JSON 列内字段可在 LINQ 里过滤，并支持 `ExecuteUpdate` | 仅复杂类型，自有实体不适用；大表过滤依赖数据库 JSON 索引 |
| 矢量搜索 | Azure SQL / SQL Server 2025 的 `SqlVector<float>`、`EF.Functions.VectorDistance`、`VECTOR_DISTANCE()`；Cosmos 矢量相似度搜索转正 | 需要 SQL Server 2025 或较新的 Azure SQL 层级 |
| `ExecuteUpdateAsync` 常规 lambda | 可用普通（非表达式树）lambda 动态构造更新 | 仍绕过变更跟踪与并发检查 |
| 安全与翻译改进 | 日志内联常量默认脱敏、Raw SQL 字符串拼接告警、集合参数化转换改进、拆分查询排序更一致 | 升级后检查日志/告警输出 |
| 其他 | 复杂类型的表拆分与结构支持、自定义默认约束名、SQLite 可关闭 `AUTOINCREMENT`、迁移不再共用单事务 | 见官方 breaking changes 清单 |

升级路径：升级 .NET 10 SDK → 把 `Microsoft.EntityFrameworkCore.*` 与 Provider 一并升到 10.x（**大版本混用会出奇怪的运行时错误**）→ 处理弃用告警 → 跑测试 → 检查生成的 SQL 与迁移差异 → 最后更新 CI/容器镜像与服务器运行时。EF10 含少量 breaking changes，务必先看官方迁移指南。

## 9. 反模式速查

| 反模式 | 正确做法 |
| --- | --- |
| 单例 / static `DbContext` | Scoped，一请求一实例 |
| 在 `OnModelCreating` 里读当前租户/用户 | 用查询过滤器 + 上下文字段表达式 |
| 全表 `ToList()` 再在内存里 `Where` | 让过滤条件在 SQL 里完成 |
| 每个接口都 `Include` 一整张对象图 | 按接口需要投影 DTO |
| 用 `InMemory` Provider 做集成测试 | 用同类型真实数据库（Testcontainers / SQLite 文件模式按场景选） |
| 直接用 `Update(dto)` 覆盖全列 | 先查再改，或用 `ExecuteUpdate` 精确设列 |
| 生产启动时自动 `Migrate()` | 发布流水线里执行脚本 / 迁移捆绑包 |
| 生产打开 `EnableSensitiveDataLogging` | 仅本地排查时开 |
| 依赖 `ExecuteUpdate` 做级联删除、并发校验 | 这些是 `SaveChanges` 路径的语义，需手工实现 |
| 不看生成 SQL 就上线复杂查询 | `ToQueryString()` + 慢查询日志 + 执行计划复核 |

## 10. 参考

- EF Core 官方文档：<https://learn.microsoft.com/ef/core/>
- EF Core 10 新增功能：<https://learn.microsoft.com/ef/core/what-is-new/ef-core-10.0/whatsnew>
- 性能简介：<https://learn.microsoft.com/ef/core/performance/>
- 迁移概述：<https://learn.microsoft.com/ef/core/managing-schemas/migrations/>
- 应用迁移（脚本 / 捆绑包 / 部署策略）：<https://learn.microsoft.com/ef/core/managing-schemas/migrations/applying>
- .NET CLI 工具参考：<https://learn.microsoft.com/ef/core/cli/dotnet>

