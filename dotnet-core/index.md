# Dotnet Core


## 概述

### 谈一谈对DDD的理解

**DDD，领域驱动设计**。就是通过领域来指导软件设计，是一种十分抽象的软件设计思想，它主要分为战略设计和战术设计。  

**战略方面**，通过事件风暴进行领域模型的划分，划分出核心域，子域，支撑域，定义通用语言，划分出界限上下文。  
**在战术设计方面**，ddd将架构分层，“松耦合，高内聚”是架构设计的整体思想。按照DDD思想，可以分为领域层，基础设施层，应用层，接口层。  

**接口层**为前端用户提供api接口。基础设施层可以放一些第三方的服务，数据库连接等内容。  
**应用层**是对领域服务的编排，是很薄的一层（目前我自己的架构，应用的是cqrs，所有的相关逻辑都是放在了应用层，而领域层只是放了实体，因为暂时还不是特别理解领域层的服务和事件都应该写什么）。  
**领域层**包括实体，值对象，聚合根，领域服务，领域事件等内容。

### ASP.NET Core 比 ASP.NET 更具优势的地方是什么

1. 跨平台
2. 对框架没有依赖
3. 处理请求效率更高
4. 可以自我寄宿
5. 轻量高性能
6. 可以使用vs；vs code进行开发

### ASP.NET Core 主要的特性有哪些

1. startup 类
2. 依赖关系注入（服务）
3. 中间件
4. 主机
5. 服务器
6. appsettings.json 配置
7. 选项
8. 环境（dev,stage,prod）
9. Logging
10. 路由
11. 处理错误
12. 发送HTTP请求
13. 静态文件

## Startup

### 什么是dot net core的startup class

**Startup class是dot net core应用的入口**。  
所有的dot net core应用必须有这个class。这个类用来配置应用。  
这个类的调用是在program main函数里面进行配置的。类的名字可以自己定义。

### 如何在controller中注入service

ConfigureServices 添加 Service；

```cs
services.TryAddTransient<IDataAccess, DataAccess>();
```

在controller 添加注入

```cs
private readonly ILogManager _logManager;
public HomeController(ILogManager logManager)
    {
        _logManager = logManager;
    }
```

### Startup 类包括哪些配置

1. ConfigureServices （可选择）方法以配置应用的服务。 服务是一个提供应用功能的可重用组件。 在 ConfigureServices 中注册服务，并通过依赖关系注入 (DI) 或 ApplicationServices 在整个应用中使用服务。

2. Configure 方法用于指定应用响应 HTTP 请求的方式。 可通过将中间件组件添加到 IApplicationBuilder 实例来配置请求管道。

### startup class的configure方法有什么作用

这个方法来定义整个应用如何响应HTTP请求。  
它有几个比较重要的参数，application builder，Hosting environment, logo factory， 在这里我们可以配置一些中间件用来处理路径，验证和session等等。

## 依赖注入

### ASP.NET Core Filter如何支持依赖注入

1. 可以通过全局注册，支持依赖注入；
2. 通过TypeFilter(typeof(Filter)) 标记在方法，标记在控制器
3. 通过ServiceType(typeof(Filter))标记在方法，标记在控制器，必须要注册Filter这类；

TypeFilter和ServiceType的本质是实现了一个IFilterFactory接口；

### 介绍ASP.NET Core中服务的生命周期

1. Singleton 只有一个服务的实例被创建，这个实例，存储在内存中，可以在整个应用程序中使用。我们可以对一些初始化代价比较大的服务，使用Singleton模式。
   `services.AddSingleton<IProductService, ProductService>();`
2. Scoped 范围内的，作用域生存期服务，以每个客户端请求(连接)一次的方式创建。可以这么理解：同一个请求中同一个IServiceProvider提供的对象是同一个。
   `services.AddSingleton<IProductService, ProductService>();`
3. Transient 服务每次被请求的时候，都会创建一个服务实例，这种模式特别适合轻量级、无状态的服务。
   `services.AddSingleton<IProductService, ProductService>();`

### 什么是依赖注入

通过控制反转（Ioc），对象A在被创建的时候，由一个IOC容器来控制依赖，把类B通过构造函数，属性或工厂模式等方法，注入到类A内，实现对类A和类B的解耦。

### 依赖注入有哪几种方式

1. 属性注入

   ```cs
   using Microsoft.Extensions.Logging;
   using Microsoft.Extensions.Logging.Abstractions;
   namespace MyApp
   {
      public class ProductService
      {
         public ILogger<ProductService> Logger { get; set; }
         private readonly IProductRepository _productRepository;
         public ProductService(IProductRepository productRepository)
         {
               _productRepository = productRepository;
               Logger = NullLogger<ProductService>.Instance;
         }
         public void Delete(int id)
         {
               _productRepository.Delete(id);
               Logger.LogInformation($"Deleted a product with id = {id}");
         }
      }
   }
   ```

2. 构造函数注入

   ```cs
   public class ProductService
   {
      private readonly IProductRepository _productRepository;
      public ProductService(IProductRepository productRepository)
      {
         _productRepository = productRepository;
      }
      public void Delete(int id)
      {
         _productRepository.Delete(id);
      }
   }
   ```

3. 接口注入

### 控制反转是什么

**控制反转**（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。

### 依赖注入有哪些著名的框架

Unity、autofac、spring.net、MEF、Injection、Asp.Net Core的ServiceCollection。

### 依赖注入实现原理

实现DI，核心在于依赖注入容器IContainer，该容器具有以下功能

1. （容器）保存可用服务的集合 // 要用的特定对象、特定类、接口服务
2. （注册）提供一种方式将各种部件与他们依赖的服务绑定到一起；// Add...函数或containerBuilder.Register函数，
3. （解析点）为应用程序提供一种方式来请求已配置的对象： 构造函数注入、属性注入.

运行时，框架会一层层通过反射构造实例，最终得到完整对象。

## 中间件

### 什么是中间件（Middleware）

**中间件是一种装配到应用管道以处理请求和响应的软件。**

每个组件：

1. 选择是否将请求传递到管道中的下一个组件。
2. 可在管道中的下一个组件前后执行工作。

请求委托用于生成请求管道。 请求委托处理每个 HTTP 请求。

使用 RunMap 和 Use 扩展方法来配置请求委托。 可将一个单独的请求委托并行指定为匿名方法（称为并行中间件），或在可重用的类中对其进行定义。 这些可重用的类和并行匿名方法即为中间件，也叫中间件组件。 请求管道中的每个中间件组件负责调用管道中的下一个组件，或使管道短路。 当中间件短路时，它被称为“终端中间件”，因为它阻止中间件进一步处理请求。

```cs
public class Startup
{
    public void Configure(IApplicationBuilder app)
    {
        app.Use(async (context, next) =>
        {
            // Do work that doesn't write to the Response.
            await next.Invoke();
            // Do logging or other work that doesn't write to the Response.
        });

        app.Run(async context =>
        {
            await context.Response.WriteAsync("Hello from 2nd delegate.");
        });
    }
}
```

### 中间件的使用场景有哪些

身份验证，Session存储，日志记录等。

其实我们的Asp.net core项目中本身已经包含了很多个中间件。比如 身份认证中间件 UseAuthorization()等系列。

### 列举官方常用的中间件

以下 Startup.Configure 方法将为常见应用方案添加中间件组件：

1. 异常/错误处理
   1. 当应用在开发环境中运行时：
      1. 开发人员异常页中间件 (UseDeveloperExceptionPage) 报告应用运行时错误。
      2. 数据库错误页中间件报告数据库运行时错误。
   2. 当应用在生产环境中运行时：
      1. 异常处理程序中间件 (UseExceptionHandler) 捕获以下中间件中引发的异常。
      2. HTTP 严格传输安全协议 (HSTS) 中间件 (UseHsts) 添加 Strict-Transport-Security 标头。
2. HTTPS 重定向中间件 (UseHttpsRedirection) 将 HTTP 请求重定向到 HTTPS。
3. 静态文件中间件 (UseStaticFiles) 返回静态文件，并简化进一步请求处理。
4. Cookie 策略中间件 (UseCookiePolicy) 使应用符合欧盟一般数据保护条例 (GDPR) 规定。
5. 用于路由请求的路由中间件 (UseRouting)。
6. 身份验证中间件 (UseAuthentication) 尝试对用户进行身份验证，然后才会允许用户访问安全资源。
7. 用于授权用户访问安全资源的授权中间件 (UseAuthorization)。
8. 会话中间件 (UseSession) 建立和维护会话状态。 如果应用使用会话状态，请在 Cookie 策略中间件之后和 MVC 中间件之前调用会话中间件。
9. 用于将 Razor Pages 终结点添加到请求管道的终结点路由中间件（带有 MapRazorPages 的 UseEndpoints）。

```cs
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseDatabaseErrorPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseCookiePolicy();
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseSession();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
    });
}
```

### 中间件的执行顺序

1. 异常/错误处理
2. HTTP 严格传输安全协议
3. HTTPS 重定向
4. 静态文件服务器
5. Cookie 策略实施
6. 路由
7. 身份验证
8. 会话
9. MVC

![中间件的执行顺序](https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/20210810132314-2021-08-10-13-23-15.png)

### application builder的use和run方法有什么区别

这两个方法都在start up class的configure方法里面调用。都是用来向应用请求管道里面添加中间件的。

Use方法可以调用下一个中间件的添加，而run不会。

### dot net core 管道里面的map拓展有什么作用

可以针对不同的路径添加不同的中间件。

```cs
public class Startup
{
    private static void HandleMapTest1(IApplicationBuilder app)
    {
        app.Run(async context =>
        {
            await context.Response.WriteAsync("Map Test 1");
        });
    }

    private static void HandleMapTest2(IApplicationBuilder app)
    {
        app.Run(async context =>
        {
            await context.Response.WriteAsync("Map Test 2");
        });
    }

    public void Configure(IApplicationBuilder app)
    {
        app.Map("/map1", HandleMapTest1);

        app.Map("/map2", HandleMapTest2);

        app.Run(async context =>
        {
            await context.Response.WriteAsync("Hello from non-Map delegate. <p>");
        });
    }
}
```

## 配置

### ConfigurationBinder 的常用方法

1. GetValue
2. GetSection
3. GetChildren
4. Exists
5. AddJsonFile

## 日志

### 日志的级别有哪些

| LogLevel | “值” | 方法           | 描述                                                                                                       |
| -------- | ---- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| Trace    | 0    | LogTrace       | 包含最详细的消息。 这些消息可能包含敏感的应用数据。 这些消息默认情况下处于禁用状态，并且不应在生产中启用。 |
| 调试     | 1    | LogDebug       | 用于调试和开发。 由于量大，请在生产中小心使用。                                                            |
| 信息     | 2    | LogInformation | 跟踪应用的常规流。 可能具有长期值。                                                                        |
| 警告     | 3    | LogWarning     | 对于异常事件或意外事件。 通常包括不会导致应用失败的错误或情况。                                            |
| 错误     | 4    | LogError       | 表示无法处理的错误和异常。 这些消息表示当前操作或请求失败，而不是整个应用失败。                            |
| 严重     | 5    | LogCritical    | 需要立即关注的失败。 例如数据丢失、磁盘空间不足。                                                          |
| 无       | 6    |                | 指定日志记录类别不应写入任何消息。                                                                         |

## 路由

### 默认路由的配置和使用

```cs
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvc();
    }
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
        app.UseMvc(routes =>
        {
            routes.MapRoute(
                name: "default",
                template: "{controller=Home}/{action=Index}/{id?}");
        });
    }
}
```

### 配置多个默认路由

```cs
app.UseMvc(routes =>
{
    //New Route
   routes.MapRoute(
      name: "about-route",
      template: "about",
      defaults: new { controller = "Home", action = "About" }
    );
   routes.MapRoute(
      name: "default",
      template: "{controller=Home}/{action=Index}/{id?}");
});
```

### 配置标签(Attributes)为个方法或控制器指定路由

```cs
[Route("[controller]")]
public class AnalyticsController : Controller
{
    [Route("Dashboard")]
    public IActionResult Index()
    {
        return View();
    }
    [Route("[action]")]
    public IActionResult Charts()
    {
        return View();
    }
}
```

### 配置RESTful路由

```cs
[Route("api/[controller]")]
public class ValuesController : Controller
{
    // GET api/values
    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] {"hello", "world!"};
    }
    // POST api/values
    [HttpPost]
    public void PostCreate([FromBody] string value)
    {
    }
   // POST api/values/5
   [HttpPost("{id}")]
   public void PostUpdate(int id, [FromBody] string value)
   {
   }
}
```

### 配置路由器参数约束

```cs
[HttpGet("{id:int}")]
public string GetById(int id)
{
    return "item " + id;
}
```

## 错误处理

### Asp.Net Core中有哪些异常处理的方案

1. 继承 Controller，重写 OnActionExecuted
2. 使用 ActionFilterAttribute
3. 使用 IExceptionFilter
4. 使用 ExceptionHandler
5. 自定义 Middleare 处理

