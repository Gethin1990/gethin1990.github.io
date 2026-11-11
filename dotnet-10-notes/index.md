# .NET 10 知识整理


> 本文以 **.NET 10（LTS，2025-11-11 发布，支持至 2028-11-14）** 为基准整理。写于 2026-11-11：此时 .NET 11（STS）刚于 11-10 发布，而 .NET 8、.NET 9 已在同日结束支持——**生产环境的主力目标是 .NET 10，不是最新的 .NET 11**。
>
> 定位：一份按目录检索的体系化速查笔记，不是入门教程，也不是 release notes 的翻译。默认读者写过 C# 和 ASP.NET Core，想把「版本、语言、运行时、库、框架、工具链、升级」这几层串成一张图。
>
> 姊妹篇：[EF Core 知识整理](/ef-core-notes/) 单独展开 ORM 那一层，本文第 7 节只做索引。

## 1. 版本坐标：先搞清楚自己在哪

### 1.1 发布节奏与支持策略

| 规则 | 内容 |
| --- | --- |
| 节奏 | 每年 11 月一个主版本；补丁在每月第二个星期二（Patch Tuesday） |
| LTS | **偶数版本**，3 年免费支持与补丁（.NET 8、.NET 10） |
| STS | 奇数版本，2 年（.NET 9、.NET 11） |
| 质量 | LTS 与 STS 代码质量完全相同，差别只有支持时长 |
| 组件 | 运行时、SDK、ASP.NET Core、EF Core 共用同一生命周期 |

当前（2026-11-11）关键日期：

| 版本 | 类型 | 发布 | 终止支持 | 状态 |
| --- | --- | --- | --- | --- |
| .NET 8 | LTS | 2023-11-14 | **2026-11-10** | 已结束支持 |
| .NET 9 | STS | 2024-11-12 | **2026-11-10** | 已结束支持 |
| **.NET 10** | **LTS** | **2025-11-11** | **2028-11-14** | 活动，生产首选 |
| .NET 11 | STS | 2026-11-10 | 2028-11-14 | 活动，尝鲜/短周期项目 |

要点：**「最新版」≠「该升级的版本」**。企业应用跟 LTS 走，隔一个 LTS 升一次（8 → 10 → 12）是成本最低的路线；STS 适合能保持年度升级节奏的团队。另外官方要求在支持期内**持续安装最新补丁**，停留在旧补丁版本不符合支持条件。

### 1.2 版本号怎么读

| 概念 | .NET 10 的值 | 说明 |
| --- | --- | --- |
| SDK 版本 | `10.0.100`（GA） | 第一位主版本，第二位 minor，`1xx` 为功能带，`2xx/3xx/4xx` 为后续功能带 |
| 运行时 | `10.0.x` | 与 SDK 独立安装、独立打补丁 |
| TFM | `net10.0` | 写在 `.csproj` 的 `<TargetFramework>` |
| 语言版本 | C# 14 | `net10.0` 默认；可用 `<LangVersion>` 显式指定 |
| 其他语言 | F# 10、Visual Basic 编译器更新 | VB 主要是 `unmanaged` 约束与 `OverloadResolutionPriorityAttribute` 支持 |
| IDE | Visual Studio 2026 / VS Code + C# Dev Kit | VS 2026 随附 .NET 10 SDK |

`global.json` 钉住 SDK，避免 CI 与本机版本漂移：

```json
{
  "sdk": {
    "version": "10.0.100",
    "rollForward": "latestFeature"
  },
  "test": {
    "runner": "Microsoft.Testing.Platform"
  }
}
```

注意 `dnx` 脚本会**绕过 `global.json` 的 SDK 选择**（官方列为 .NET 10 行为变更），在严格锁定版本的 CI 里别混用。

## 2. 平台组成与日常命令

.NET 10 不是「一个框架」，而是几层东西的合称：

| 层 | 内容 | 常见载体 |
| --- | --- | --- |
| 运行时 | CoreCLR（JIT + GC）、NativeAOT、Mono/WASM | `Microsoft.NETCore.App` |
| 基础库 | BCL：`System.*`、`System.Text.Json`、网络、加密、诊断 | 随运行时共享框架发布 |
| 应用框架 | ASP.NET Core、EF Core、MAUI、WinForms / WPF | 共享框架或 NuGet 包 |
| SDK | MSBuild、NuGet、`dotnet` CLI、模板、工作负载 | 本机 / CI 安装 |
| 语言 | Roslyn（C# / VB）、F# 编译器 | 随 SDK |

平台特定的 TFM 别写错：

| 目标 | TFM |
| --- | --- |
| 通用库 / 控制台 / Web | `net10.0` |
| Windows 桌面 | `net10.0-windows`（WinForms / WPF 加 `UseWindowsForms` / `UseWPF`） |
| Android / iOS / macOS | `net10.0-android`、`net10.0-ios`、`net10.0-maccatalyst` |
| 浏览器 | `net10.0-browser`（Blazor WASM 走 `Microsoft.NET.Sdk.BlazorWebAssembly`） |

日常命令（.NET 10 新增**名词优先**写法，旧写法仍可用但脚本里建议统一）：

```bash
dotnet --info                         # 看清 SDK / 运行时 / RID
dotnet new webapi -n Api && cd Api
dotnet package add Serilog            # 旧：dotnet add package
dotnet package list --vulnerable --include-transitive
dotnet reference add ../Shared/Shared.csproj   # 旧：dotnet add reference
dotnet build -c Release
dotnet publish -c Release -o ./out
dotnet completions script zsh         # 原生补全脚本，支持 bash/fish/nushell/powershell/zsh
dotnet clean --cli-schema             # 输出命令树的 JSON，供脚本 / 工具集成
```

**共享框架 vs NuGet 包**：`Microsoft.AspNetCore.App` 是共享框架（随运行时，不写版本号）；`Microsoft.EntityFrameworkCore.*`、`Microsoft.Extensions.*` 独立发 NuGet 包。升级时前者跟运行时走，后者必须**手动把整套 `Microsoft.*` 包升到 10.x 同一版本**，混用大版本是典型故障源。

## 3. C# 14：语法层面的增量

C# 14 随 .NET 10 SDK 提供，只支持 `net10.0`（语言版本可单独设，但新特性依赖新 BCL 时不能降级）。

### 3.1 `field` 关键字：从自动属性平滑过渡到自定义访问器

```csharp
public string Email
{
    get;
    set => field = value?.Trim().ToLowerInvariant() ?? string.Empty;
}

public SqlConnection Connection
{
    get => field ??= new SqlConnection("...");
}
```

不用再手写 backing field，也能只给其中一个访问器写 body。坑：**类里若已有名为 `field` 的标识符会产生歧义**，用 `@field` 或 `this.field` 区分，或改名。这是官方明确提示的潜在源码级 breaking change。

### 3.2 扩展成员（`extension` 块）

以前只能扩展实例方法，现在能扩展**属性**、**静态成员**、**运算符**：

```csharp
public static class Enumerable
{
    extension<TSource>(IEnumerable<TSource> source)   // 实例扩展成员
    {
        public bool IsEmpty => !source.Any();
        public IEnumerable<TSource> Where(Func<TSource, bool> p) { /* ... */ }
    }

    extension<TSource>(IEnumerable<TSource>)          // 静态扩展成员
    {
        public static IEnumerable<TSource> Identity => Enumerable.Empty<TSource>();
        public static IEnumerable<TSource> operator +(
            IEnumerable<TSource> left, IEnumerable<TSource> right) => left.Concat(right);
    }
}

// 调用：sequence.IsEmpty / IEnumerable<int>.Identity
```

`System.Numerics.Tensors` 就用它给 `Tensor<T>` 提供了 `tensor + tensor` 这类运算（仅当 `T` 实现对应泛型数学接口时可用）。

### 3.3 其他特性速查

| 特性 | 写法 | 说明 |
| --- | --- | --- |
| 空条件赋值 | `customer?.Order = GetCurrentOrder();` | 左侧为 null 时**右侧表达式不求值**；支持 `+=` 等复合赋值，不支持 `++` / `--` |
| `nameof` 未绑定泛型 | `nameof(List<>)` → `"List"` | 以前必须写 `List<int>` |
| lambda 参数修饰符 | `TryParse<int> p = (text, out result) => int.TryParse(text, out result);` | `ref/in/out/scoped/ref readonly` 可省略参数类型；`params` 仍要求显式类型 |
| 一等 Span 转换 | `ReadOnlySpan<T>` / `Span<T>` / `T[]` 间隐式转换 | 影响重载解析，官方把「C# 14 带 span 参数的重载解析」列为行为变更 |
| 更多 partial 成员 | `partial` 构造函数、`partial` 事件 | 必须恰好一个定义声明 + 一个实现声明；事件实现声明要写 `add/remove` |
| 用户自定义复合赋值 | 自定义 `+=` / `-=` / `++` / `--` | 避免「先复制再运算」的临时对象 |
| file-based app 预处理指令 | `#:package` / `#:sdk` 等 | 见第 8 节 |

## 4. 运行时与 JIT：这一版的重心

.NET 10 运行时改进集中在「**去抽象化（de-abstraction）**」：把高层语法带来的虚调用、堆分配消除掉，让写得好懂的代码接近手写优化代码。

| 改进 | 机制 | 收益场景 |
| --- | --- | --- |
| 数组接口方法去虚拟化 | JIT 能识别并内联数组的接口实现 | `foreach` 走 `IEnumerable<T>` 的数组遍历 |
| 数组枚举去抽象 | 配合内联、循环克隆、条件逃逸分析，把 enumerator 栈分配 | 大量集合遍历 |
| 小数组栈分配 | 编译期已知长度且不逃逸的**值类型 / 引用类型**小数组放栈上 | `int[] a = {1,2,3}`、`string[] w = {"a","b"}` |
| 逃逸分析扩展 | 覆盖局部 struct 字段与委托对象 | 闭包内小对象、lambda 热路径；**closure 类本身仍堆分配**，官方注明留待后续版本 |
| 结构体参数代码生成 | physical promotion，成员直接放共享寄存器，去掉中间内存读写 | 大量小 struct 传参 |
| 循环反转 | 从词法分析改为**基于流图的自然循环识别**，转成 `do-while` 形状 | 为循环克隆、展开、归纳变量优化铺路 |
| 代码布局 | 把块重排建模成非对称 TSP，用 `3-opt` 启发式 | 提高热路径密度、缩短跳转距离 |
| 内联策略 | 支持「因前一次内联才够格去虚拟化」的连锁内联；`try-finally` 也可内联；更善用 profile data，不再给未盈利的候选用 `NoInlining` 打死 | 分层调用、热路径 |
| AVX10.2 | `System.Runtime.Intrinsics.X86.Avx10v2` | **硬件尚无，JIT 支持默认禁用**，别在业务代码里假设可用 |
| NativeAOT | 类型预初始化器支持全部 `conv.*` 与 `neg` 操作码 | 启动更快 |
| Arm64 写屏障 | 按 GC 配置动态切换写屏障实现，更精确处理 GC region | 官方基准：GC 暂停改善 **8% ~ 20%+**，代价是写屏障吞吐略降 |

要点：这些基本都是**免费的运行时升级收益，不用改代码**。所以「升级到 .NET 10 后先跑一轮基准」比「手工把 foreach 改成 for」有意义得多。反过来，别为了微优化牺牲可读性去迎合 JIT 的旧限制——限制正在被逐版移除。

## 5. 基础库新增 API（按领域速查）

### 5.1 序列化：`System.Text.Json`

```csharp
var strict = new JsonSerializerOptions
{
    Strict = true   // 组合：拒绝未映射成员、拒绝重复属性、区分大小写、
                    // RespectNullableAnnotations、RespectRequiredConstructorParameters
};

var opts = new JsonSerializerOptions { AllowDuplicateProperties = false };
// {"Value":1,"Value":-1} 在旧行为下结果为 -1；禁用重复属性后抛 JsonException
```

- `JsonSerializerOptions.Strict` 与 `JsonSerializerOptions.Default` **读兼容**：默认选项序列化的内容，可以用 Strict 反序列化。
- 新增 `PipeReader` 重载：`DeserializeAsync<T>(pipe.Reader)`、`DeserializeAsyncEnumerable<T>(pipe.Reader)`、`SerializeAsync(pipe.Writer, ...)`，省掉 `PipeReader → Stream` 转换。ASP.NET Core 的 MVC / Minimal API 已在内部自动用上，应用无需改代码。
- source generator 支持 `[JsonSourceGenerationOptions(ReferenceHandler = JsonKnownReferenceHandler.Preserve)]` 处理循环引用。

### 5.2 后量子密码（PQC）

| 算法 | 标准 | 类型 |
| --- | --- | --- |
| ML-KEM | FIPS 203 | `MLKem` |
| ML-DSA | FIPS 204 | `MLDsa`（含 HashML-DSA 的 `SignPreHash` / `VerifyPreHash`、`SignMu` / `VerifyMu`） |
| SLH-DSA | FIPS 205 | `SlhDsa` |
| 复合签名 | ietf-lamps-pq-composite-sigs（GA 时为 draft-08） | `CompositeMLDsa` |

设计变化：这些类型**不继承 `AsymmetricAlgorithm`**，改用静态工厂（`GenerateKey` / `ImportFromPem`）与静态 `IsSupported` 属性。平台要求 OpenSSL 3.5+ 或带 PQC 支持的 Windows CNG（.NET 10 新增）。

> `MLDsa` / `SlhDsa` / `CompositeMLDsa` 仍标记 `[Experimental]`（诊断 `SYSLIB5006`），标准与 OID 未最终定稿，短期别放进长期存档的签名格式。其他新增：`Aes.DecryptKeyWrapPadded`（AES-KWP / RFC 5649）、`X509Certificate.ExportPkcs12` 可选 `Pbes2Aes256Sha256`、`X509Certificate2Collection.FindByThumbprint` 支持非 SHA-1 摘要、`PemEncoding.FindUtf8`。

### 5.3 网络与全球化

- `WebSocketStream`：把 WebSocket 包成 `Stream`，`WebSocketStream.Create(...)` 用于流式协议，`CreateReadableMessageStream` / `CreateWritableMessageStream` 用于单条消息；`Dispose()` 自动完成关闭握手，省掉自己处理分帧、缓冲、编解码的胶水代码。
- macOS 客户端 TLS 1.3：**opt-in**，走 Apple `Network.framework`：

```csharp
AppContext.SetSwitch("System.Net.Security.UseNetworkFramework", true);
// 或环境变量 DOTNET_SYSTEM_NET_SECURITY_USENETWORKFRAMEWORK=1
```

启用后 TLS 1.0/1.1 可能不可用，且缓冲、读写完成、取消语义与旧 `Secure Transport` 不同；官方特别提示**别依赖零字节读判断数据是否就绪**。

- `CompareOptions.NumericOrdering`：`"2" < "10"`、`"02" == "2"`（数值比较）。**不适用于** `IndexOf` / `LastIndexOf` / `StartsWith` / `EndsWith` / `IsPrefix` / `IsSuffix` 这类索引型操作。
- `ISOWeek` 新增 `DateOnly` 重载；`TimeSpan.FromMilliseconds` 新增单参数 `long` 重载，解决 LINQ 表达式树无法处理可选参数的问题（原双参数重载的第二参数改为必填）。

### 5.4 集合、ZIP、诊断

| 领域 | 新增 |
| --- | --- |
| 集合 | `OrderedDictionary<TKey,TValue>` 的 `TryAdd` / `TryGetValue` 返回索引，配合 `GetAt` / `SetAt`；`JsonObject` 已用它，属性更新快 10–20% |
| ZIP | 异步 API：`ZipArchive.CreateAsync`、`ZipArchiveEntry.OpenAsync`、`ZipFile.CreateFromDirectoryAsync` / `ExtractToDirectoryAsync` / `OpenAsync` / `OpenReadAsync`、`ZipFileExtensions.*Async`；`Update` 模式不再把全部 entry 载入内存，解压并行化 |
| 性能 | `GZipStream` 拼接流复用 `ZLibStreamHandle`，官方数据约 **快 35%**，每段少分配 64–80 字节、约 400 ns |
| 诊断 | `ActivitySourceOptions.TelemetrySchemaUrl` / `Meter.TelemetrySchemaUrl`；`ActivityEvent`、`ActivityLink` 支持进程外序列化；`ParentRateLimitingSampler(100)` 限制每秒 root activity 数 |
| 进程 | Windows `ProcessStartInfo.CreateNewProcessGroup`，配合 `GenerateConsoleCtrlEvent(CTRL_BREAK_EVENT, pid)` 做隔离的优雅退出 |
| 数值 | `Matrix4x4.CreateBillboardLeftHanded` 等左手系变换；`System.Numerics.Tensors` 转正，新增非泛型 `IReadOnlyTensor`，切片不再复制数据 |

## 6. ASP.NET Core 10

| 领域 | 新增 / 变化 |
| --- | --- |
| 验证 | `builder.Services.AddValidation()`，Minimal API 支持 Query / Header / Body 的 DataAnnotations 验证，失败返回 400 + 错误详情；Blazor 表单支持嵌套对象、集合、`IValidatableObject`、`[SkipValidation]`；**基于源生成**，兼容 Native AOT，但只发现调用 `AddValidation()` 所在程序集的类型——多程序集要各自注册 |
| OpenAPI | 支持 **OpenAPI 3.1**（`options.OpenApiVersion = OpenApiSpecVersion.OpenApi3_1`），支持 YAML 端点；`Microsoft.OpenApi` 升级 2.0.0，`OpenApiSchema.Nullable` 已移除，可空改用 `type` 数组含 `null` / `JsonSchemaType.Null`；写了 document/operation/schema transformer 的必须复核 |
| Blazor | 框架静态资源预加载（`<ResourcePreloader />`）、`blazor.web.js` 改为静态 Web 资源（带压缩与指纹）、`[PersistentState]` 声明式状态持久化 + 自定义序列化器、Circuit 状态持久化、WASM 性能分析与诊断计数器 |
| Minimal API | `TypedResults.ServerSentEvents(stream, eventType: "heartRate")` 支持 SSE；`AddValidation()`；JSON 反序列化自动走 PipeReader |
| 认证 | Identity 支持 **Passkey / WebAuthn / FIDO2** 无密码登录；Cookie 认证对「已知 API 端点」（`[ApiController]`、JSON 读写的 Minimal API、`TypedResults`、SignalR，由 `IApiEndpointMetadata` 标识）**不再 302 跳登录页，改为 401/403** |
| 可观测性 | 认证 / 授权 / Identity 指标（如 `aspnetcore.identity.sign_in.sign_ins`）、内存池自动驱逐与相关指标 |
| 破坏性变化 | `WebHostBuilder` / `IWebHost` / `IActionContextAccessor` / `WithOpenApi` 等标记过时；Blazor `<NotFound>` 渲染片段改用 `NotFoundPage`；`blazor.boot.json` 内联进 `dotnet.js`；`BlazorCacheBootResources` 移除；WASM `HttpClient` 响应默认流式（`BrowserHttpReadStream` 不支持同步读，可用 `WasmEnableStreamingResponse=false` 退出） |

> 升级集成测试时先跑一遍：302 → 401/403 的行为变化最容易让断言批量变红。

## 7. EF Core 10：只做索引

EF Core 10 随 .NET 10 发布，与运行时同生命周期，但需要 .NET 10 SDK 构建、.NET 10 运行时运行，**不支持更早的 .NET 版本，也不支持 .NET Framework**。

主要变化：`LeftJoin` / `RightJoin` 运算符、命名查询过滤器、复杂类型映射 JSON 并在 LINQ 中过滤、SQL Server 2025 / Azure SQL 矢量搜索、`ExecuteUpdateAsync` 支持普通 lambda、日志内联常量默认脱敏、集合参数化翻译改进（`Contains` 生成的 SQL 文本变化，会让 SQL Server 计划缓存失效）。

完整梳理见本站[《EF Core 知识整理》](/ef-core-notes/)；升级前务必看官方 EF Core 10 breaking changes 与 Provider 兼容性（第三方 Provider 未跟上时不能升级）。

## 8. SDK 与工具链：file-based apps 是最大变化

### 8.1 单文件 C# 应用

不用 `.csproj`，一个 `.cs` 文件即可构建、运行、发布：

```csharp
#!/usr/bin/env -S dotnet --
#:sdk Microsoft.NET.Sdk.Web
#:package Spectre.Console@*
#:package Serilog@4.0.0
#:project ../Shared/Shared.csproj
#:property PublishAot=false
#:property TargetFramework=net10.0

using Spectre.Console;
AnsiConsole.MarkupLine("[green]Hello, .NET 10[/]");
```

| 指令 | 作用 |
| --- | --- |
| `#:package` | NuGet 引用。**省略版本仅在有 `Directory.Packages.props` 中央包管理时有效**，否则写 `@版本` 或 `@*` |
| `#:project` | 引用另一个项目 |
| `#:property` | 设置 MSBuild 属性，支持表达式与环境变量：`#:property LogLevel=$([MSBuild]::ValueOrDefault('$(LOG_LEVEL)', 'Information'))` |
| `#:sdk` | 指定 SDK，默认 `Microsoft.NET.Sdk`，可写 `Microsoft.NET.Sdk.Web`，也支持 `Aspire.AppHost.Sdk@13.0.2` 带版本 |
| `#:include` | 包含其他文件（支持 glob）。**属于 .NET 11 Preview 3 / SDK 10.0.300+ 的增强，不是 .NET 10 GA 特性** |

命令：

```bash
dotnet run --file app.cs          # 最明确：当前目录有 .csproj 时也不会误跑项目
dotnet run app.cs                 # 简写；目录里有项目文件时会优先跑项目并把 app.cs 当参数
dotnet app.cs                     # shorthand
dotnet run app.cs -- arg1 arg2    # 应用参数放在 -- 之后
dotnet publish app.cs             # 默认 Native AOT，产物在同级 artifacts/ 下
dotnet project convert app.cs     # 转成 .csproj + .cs，原文件保持不变
```

shebang 用 `#!/usr/bin/env -S dotnet --`（`-S` 拆分参数，`--` 防止 `dotnet` 吞掉应用参数）；文件需 LF 换行、无 BOM、`chmod +x`。发布默认开启 Native AOT，用到不兼容的反射/包时用 `#:property PublishAot=false` 关掉。

### 8.2 其他 SDK 变化

| 变化 | 精确写法 |
| --- | --- |
| 名词优先命令 | `dotnet package add/list/remove`、`dotnet reference add/list/remove` |
| 一次性工具执行 | `dotnet tool exec --source ./artifacts/package/ dotnetsay "Hi"`，或 `dnx dotnetsay "Hi"` |
| 平台特定工具 | 单包多 RID，可在 `<RuntimeIdentifiers>` 里加 `any` 兜底；发布形态支持 self-contained / trimmed / AOT |
| `dotnet test` 支持 MTP | `global.json` 里 `"test": { "runner": "Microsoft.Testing.Platform" }` |
| 容器 | `dotnet publish /t:PublishContainer`（控制台应用不再需要 `EnableSdkContainerSupport`）；`<ContainerImageFormat>Docker</ContainerImageFormat>` 或 `OCI` |
| 包裁剪 | `net10.0+` 默认裁剪框架已提供的包引用，减少 restore 与误报；`RestoreEnablePackagePruning=false` 可关 |
| 补全 / 内省 | `dotnet completions script [SHELL]`、任意命令加 `--cli-schema` 输出 JSON |
| MSBuild 任务 | `msbuild.exe` / VS 2026 可运行为 .NET 编写的 task，需 `Runtime="NET"` + `TaskFactory="TaskHostFactory"`（进程外，有 IPC 开销；`Host Object` 暂不支持） |
| 交互 | 交互终端下 `--interactive` 默认开启；CI 用 `--interactive false` |

## 9. 部署形态怎么选

| 形态 | 命令 / 配置 | 适用 | 代价 |
| --- | --- | --- | --- |
| 框架依赖（默认） | `dotnet publish -c Release` | 服务器已装 .NET 10 运行时，镜像最小 | 依赖宿主运行时版本 |
| 自包含 | `--self-contained true -r linux-x64` |  uncontrollable 宿主环境 | 体积大，需自己跟安全补丁 |
| Native AOT | `<PublishAot>true</PublishAot>` | CLI 工具、冷启动敏感的 Serverless / 微服务 | 无动态代码生成，反射序列化、部分库不兼容；需实测裁剪告警 |
| 剪裁 | `<PublishTrimmed>true</PublishTrimmed>` | WASM / 体积敏感 | .NET 10 中 **`PublishTrimmed` 时 HTTP/3 默认禁用**；反射代码需标注 |
| 单文件 | `<PublishSingleFile>true</PublishSingleFile>` | 分发单个可执行 | .NET 10 起不再在可执行文件目录查找原生库 |
| 容器 | `dotnet publish /t:PublishContainer` | K8s / 云 | **默认基础镜像改为 Ubuntu**；.NET 10 无 Debian 镜像，`apt` 包名与旧镜像不同 |

可观测性配套：`ActivitySource` / `Meter` 现在可带 telemetry schema URL；默认 trace context propagator 改为 **W3C 标准**（.NET 10 行为变更，跨系统链路追踪需核对）；`dotnet-counters` / `dotnet-trace` / OpenTelemetry 与 ASP.NET Core 新指标直接对接。

## 10. 从 .NET 8 / 9 升级：检查清单

按这个顺序做，别一上来就改 TFM：

1. **装 SDK**：本机与 CI 都升到 .NET 10 SDK；更新 `global.json`、CI 的 `actions/setup-dotnet` / `UseDotNet@2`。
2. **改 TFM**：`<TargetFramework>net10.0</TargetFramework>`，注意 `Directory.Build.props` 里常有集中定义。
3. **升包**：把所有 `Microsoft.AspNetCore.*`（若显式引用）、`Microsoft.EntityFrameworkCore.*`、`Microsoft.Extensions.*` 一起升到 10.x；检查第三方 Provider / 库是否已有 .NET 10 版本。
4. **处理 NuGet 审计**：`net10.0+` 下 **`NuGetAuditMode` 默认 `all`**（旧为 `direct`），传递依赖漏洞也会报 `NU1901`–`NU1904`；`TreatWarningsAsErrors` 的项目会直接 restore 失败。用 `dotnet nuget why <package>` 定位依赖链，或用 `<NuGetAuditSuppress Include="https://github.com/advisories/XXXX" />` 精确豁免，别全局关 `NuGetAudit`。
5. **消除新告警**：`PackageReference` 不写版本现在**报错**；框架已提供的直接引用会触发 `NU1510`（删掉即可）。
6. **核对行为变化**（编译器不会提醒，最容易漏）：

| 变化 | 影响 |
| --- | --- |
| `System.Linq.AsyncEnumerable` 内置进核心库 | 与 `System.Linq.Async` NuGet 包产生类型歧义，删包或升到兼容版本 |
| `BackgroundService.ExecuteAsync` 全部作为 Task 在后台运行 | 依赖「首个 await 之前的同步段在启动期间执行」的代码要挪到构造函数 / `StartAsync` |
| 配置中的 null 值被保留 | `IConfiguration` 读值逻辑需复核 |
| 默认 trace propagator → W3C | 跨服务 trace 上下文格式变化 |
| `System.Text.Json` 检查属性名冲突 | 重复属性 / 命名策略冲突会报错 |
| `dotnet new sln` 默认生成 `.slnx` | 老工具链 / 脚本需适配 |
| 工作负载默认从 loose manifests 切到 **workload sets** | MAUI 等环境 CI 需检查 |
| CLI 非命令相关日志改走 stderr、`dotnet watch` 日志改走 stderr | 解析 stdout 的脚本要改 |
| 浏览器 `HttpClient` 默认流式响应 | `ReadAsStreamAsync()` 返回 `BrowserHttpReadStream`，不支持同步读 |
| Cookie 认证对已知 API 端点返回 401/403 | 集成测试 302 断言失效 |
| EF Core 10 `Contains` 翻译改为多标量参数 | SQL 文本变了，部署后计划缓存重编译；快照测试会挂 |
| `C# 14` span 重载解析 / `field` 标识符歧义 | 编译期或语义级变化，逐条看官方 breaking changes |

7. **验证**：`dotnet build -warnaserror` 跑通 → 全量测试 → 基准对比（JIT 改进通常是白捡的性能）→ 检查生成的迁移 SQL 与 OpenAPI 文档 → 灰度发布观察 GC 暂停、启动时间、401/403 比例。
8. **最后更新部署**：容器基础镜像、服务器 / PaaS 运行时栈、监控告警规则。

> 官方 `Breaking changes in .NET 10` 页面明确标注「work in progress, not a complete list」，升级前把 ASP.NET Core 10 / EF Core 10 各自的 breaking changes 页面一起看。

## 11. 反模式速查

| 反模式 | 正确做法 |
| --- | --- |
| 「升级就用最新版」→ 上 .NET 11 STS | 生产跟 LTS（.NET 10），STS 只用于能年度升级的项目 |
| 只改 `TargetFramework`，包版本不动 | `Microsoft.*` 一整套升到 10.x，先确认 Provider 兼容 |
| 看到 `NU1901`–`NU1904` 就关掉 `NuGetAudit` | `dotnet nuget why` 定位传递依赖，升级或精确 `NuGetAuditSuppress` |
| 手工把 `foreach` 改 `for` 做「优化」 | 先升级 + BenchmarkDotNet 实测，.NET 10 已去虚拟化数组接口方法 |
| 业务代码假设 AVX10.2 可用 | 该 intrinsics 默认禁用、硬件尚无，必须走 `IsSupported` 分支 |
| `#:package Serilog` 不写版本 | 除中央包管理外要写 `@版本` 或 `@*` |
| file-based app 直接 `dotnet publish` 后上生产，不看 AOT 兼容性 | 默认 Native AOT，反射序列化/动态代码要先验证，必要时 `PublishAot=false` |
| 忽略 Blazor `blazor.boot.json` 的完整性校验脚本 | 已内联进 `dotnet.js`，相关脚本需重新评估 |
| 沿用 8/9 的 Dockerfile 只改 tag | 基础镜像变 Ubuntu、无 Debian 镜像，检查 `apt` 包名与用户/权限 |
| 依赖 `BackgroundService` 启动期同步执行 | 显式放构造函数 / `StartAsync` |
| 假定 API 未认证仍返回 302 | 已知 API 端点现在返回 401/403，前端与测试同步调整 |
| 不看迁移文档直接升级 EF Core Provider | 第三方 Provider 可能尚未发布 10.x，先查兼容矩阵 |
| 在 NativeAOT 项目里用运行时反射生成序列化器 | 用 source generator（`System.Text.Json` 源生成、`AddValidation()` 等） |

## 12. 参考

- .NET 10 新增功能总览：<https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/overview>
- 运行时改进：<https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/runtime>
- 基础库新增 API：<https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/libraries>
- SDK 与 CLI 改进：<https://learn.microsoft.com/dotnet/core/whats-new/dotnet-10/sdk>
- file-based apps：<https://learn.microsoft.com/dotnet/core/sdk/file-based-apps>
- C# 14 新增功能：<https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-14>
- ASP.NET Core 10 发行说明：<https://learn.microsoft.com/aspnet/core/release-notes/aspnetcore-10.0>
- .NET 10 中断性变更：<https://learn.microsoft.com/dotnet/core/compatibility/10>
- .NET 支持策略与生命周期：<https://dotnet.microsoft.com/platform/support/policy/dotnet-core>
- NuGet 安全审计与 `NuGetAuditMode`：<https://learn.microsoft.com/nuget/concepts/auditing-packages>
- EF Core 10 新增功能：<https://learn.microsoft.com/ef/core/what-is-new/ef-core-10.0/whatsnew>

