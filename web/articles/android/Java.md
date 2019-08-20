# Java 自学

## JDK 理论知识(Day1)

JDK是 Java 语言的软件开发工具包，主要用于移动设备、嵌入式设备上的java应用程序。JDK是整个java开发的核心，它包含了JAVA的运行环境（JVM+Java系统类库）和JAVA工具。

-- 来自百度百科

Java 语言的软件开发工具包有不同的版本，用于开发不同类型的应用:

|    Version    |     Name     | Publish Date |
|     ----      |     ----     |     ---      |
|   JDK 1.1.4   |    Sparkler  |  1997-09-12  |
|   J2SE 1.2    |   Playground |  1998-12-04  |   
|   Java SE 5.0 |      Tiger   |  2004-09-30  |
|   Java SE 10	|              |  2018-03-14  |

- JDK(Java Development Kit) 是较为原始的一个版本，现在基本不用了
- J2SE(standard edition) 标准版，是我们通常用的一个版本，从JDK 5.0开始，改名为Java SE
- Java EE(enterprise edition) 企业版，使用这种JDK开发J2EE应用程序

另外还有一个做手机应用的版本 Java ME。

在一台电脑上可以同时安装Java SE、Java EE、Java ME，不影响，对应开发需求不一样，用对应的版本。

## 自己的理解与行动

JDK 有了广义和狭义两种说法，广义上指所有版本的 Java 语言的软件开发工具包，狭义上指 1.2 之前的版本。

分别安装 SE、EE 、ME 对比学习。

## Mac 上安装运行 Java

Java 属于 oracle 公司，从其官网进入到 Java SDK 的下载列表，里面有个版本的下载地址
https://www.oracle.com/technetwork/java/javase/downloads/index.html

### 下载安装最新的 SE12
 
地址: https://download.oracle.com/otn-pub/java/jdk/12.0.2+10/e482c34c86bd4bf8b56c0b35558996b9/jdk-12.0.2_osx-x64_bin.dmg

只有 173M。

直接下一步下一步就完成了，省去了手动安装配置环境变量等步骤，大体原理就是将 java 相关的可执行文件拷贝到 /usr/bin 下，环境变量由 /etc/paths 统一指定。

```shel
# 运行下面命令验证是否安装成功
java --version
# 安装成功后输出如下内容
java 12.0.2 2019-07-16
Java(TM) SE Runtime Environment (build 12.0.2+10)
Java HotSpot(TM) 64-Bit Server VM (build 12.0.2+10, mixed mode, sharing)
```

### 安装 IDE

能写 Java 的 IDE 很多，有老牌的 NetBeans 和 Eclipse，也有比较新的 IntelliJ IDEA 和专门开发安卓 App 的 Android Studio。组里做 Java 开发的貌似用 IntelliJ IDEA 的比较多，这里从个众。

IntelliJ IDEA 有官方免费试用版 和 社区免费版，当然如果你不差钱直接花 499$ 买个官方正式版。这里选择了免费版，想着入门应该够用了。

https://www.jetbrains.com/idea/features/

## 命令行项目

打开 IntelliJ IDEA 选择 Command Line App 新建项目，在提示的地方输入 `println`，点击运行就可以看到结果了。

```java
package com.company;

public class Main {

    public static void main(String[] args) {
	    // write your code here
        System.out.println("Hello, world!");
    }
}
```

多加点代码断点调试也不再话下

```java
String str = "Hello,";
str = new StringBuilder(str).append(" world!").toString();
System.out.println(str);
```

还可以在命令行中输入 `java ./src/com/company/Main.java` 运行查看输出。

Java 不同于 JavaScript，前者是编译型语言后者是解释型语言(又称脚本语言)，前者需要先编译再运行后者边编译边运行。Java 项目的打包是先编译然后打包编译的结果，JavaScript 的打包只是进行写法转换和文件压缩。

命令行工具一般打包成 jar 包，大体步骤如下:
- File / Project Structure / Artifacts, Type 选为 JAR，设置打包输出路径，确定；
- Build / Artifacts / build, 构建打包。

执行打包后的文件:

```shell
java -jar command-line-app.jar
```

无论是 node 还是 java 的 cli 工具都需要装对应的环境才能运行，优点在于跨平台，还有生态比较完善，很多功能不用重头写。shell 的优势在于类 Liunx 系统原生支持，Windows 10 对 shell 的支持也日趋完善。

注: 具体打包步骤参见官网 https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html

## Java Web(Day2 + Day3)

> 此内容不在预期当中，和后端写 Java 的同事合作多年却不知道他们怎么写代码，这里偏移主题满足一下个人的好奇心，完全可以跳过这章不影响后面学习。

### hello world

安装 Java EE 8 Platform SDK(包括了 Java EE Web Profile SDK)。

- 下载 Java EE 8 Platform SDK
- 将解压后的文件拷贝到 /usr/local
- 配置环境变量，~/.bash_profile

``` 
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-12.0.2.jdk/Contents/Home
```

安装 tomcat

- 下载 tomcat
- 将解压后的文件拷贝到 /usr/local

安装 maven，maven 相当于 js 的 npm，负责依赖管理

- 下载 (maven)[https://maven.apache.org/download.cgi]
- 将解压后的文件拷贝到 /usr/local
- 配置环境变量，~/.bash_profile

```
export M2_HOME=/usr/local/apache-maven-3.6.1
export PATH=$M2_HOME/bin:$PATH
```

最后用 `source ~/.bash_profile` 命令让配置文件生效。在终端输入：java -version 和 mvn -version 检测 jdk 和 maven 是否安装成功，有版本号显示就是成功的。

打开 IntelliJ IDEA 选择 Spring，勾选 Spring MVC 和 Spring Web Services 新建项目。在 Run / Edit Configration / + / Tomcat Server / Local / Application server / Tomcat Home 下配置 tomcat 安装路径。

到此环境就准备好了，你可以直接运行然后在浏览器中查看，虽然是 404 页面但是服务已经启动，下面我们还需要学一下 Spring MVC 框架，如果和前端对比一下就是需要知道 Vue 或 React 这些框架下怎么写代码怎么配置路由等。

随着项目的功能越来越复杂，为了更好的可读性和可维护性后端进化出了 MVC 这种模式，将模型、视图、控制器分离，前端进化出了 MVVM 实现数据的双向绑定避免手动操作视图的繁复。当前主流的是前后端分离，后端对于视图的控制弱化成了 api，接收数据处理数据最后输出视图数据(一般是 json 结构)，视图在浏览器端生成(服务端渲染通过 nodejs 在服务端生成)。

现在项目中一般采用反射来处理 url 和 controller 的映射关系，与之对比的是通过 web.xml 中的 mapping 配置来定义映射，其中背后的原理是约定优于配置，配置需要手动去写，看的时候需要去查代码才知道映射逻辑，而约定可以直接推断出映射关系。这里的约定可以认为定义。

怎么定义约定呢，源头也是 web.xml，将原始项目的 `*.from` 替换成 `/` 来监听所有请求，当然加一个前缀如 `/api/` 也是可以的。 

```xml
<servlet-mapping>
    <servlet-name>dispatcher</servlet-name>
    <!-- <url-pattern>*.form</url-pattern> -->
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

第二步是配置 dispatcher-servlet.xml，定义 controller 路径，如果 url 是 `/users` 那么它对应的 controller 路径是 `/src/controller/UsersController.java`

```xml
<!-- 扫描 controller 下的组件 -->
<context:component-scan base-package="controller"/>
<!-- 配置 view 的路径前缀和后缀 -->
<bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/page/" />
    <property name="suffix" value=".jsp" />
</bean>
```

然后在 src 右击 New / Package，包名为 "controller"，再在下面添加 Java Class，类名 HelloController，内容:

```java
package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloController{

    @RequestMapping("/hello")
    public ModelAndView handleRequest(javax.servlet.http.HttpServletRequest httpServletRequest, javax.servlet.http.HttpServletResponse httpServletResponse) throws Exception {
        ModelAndView mav = new ModelAndView("hello");
        mav.addObject("Title", "Spring MVC, Hello");
        mav.addObject("message", "Hello Spring MVC");
        return mav;
    }
}
```

最后在 web/WEB-INF 下添加 文件夹 pages，再添加 hello.jsp，内容:

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>${Title}</title>
  </head>
  <body>
  <div>Hello Page: </div>
  ${message}
  </body>
</html>
```

启动运行，url "http://localhost:8084/hello"，就可以看到页面。

注: 如果 javax.servlet 包找不到，将本地 Tomcat 服务器的目录下【lib】文件夹下的 servlet-api.jar 包拷贝到工程【lib】文件夹下，添加依赖，File / Project Structure... / Libraries / Spring / +

### 依赖管理


## 参考和扩展阅读

[The top 11 Free IDE for Java Coding]https://blog.idrsolutions.com/2015/03/the-top-11-free-ide-for-java-coding-development-programming/

[Java EE Web Profile SDK](https://www.oracle.com/technetwork/java/javaee/downloads/index.html)

[tomcat download](https://tomcat.apache.org/download-90.cgi)

[Spring MVC 入门](https://www.jianshu.com/p/91a2d0a1e45a)

[mac os安装java web开发环境配置](https://my.oschina.net/u/1760791/blog/738386)