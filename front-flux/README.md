# Node 环境

8.11.1
公司私库NPM镜像地址: http://maven-local.mobisummer-inc.com/repository/npm/

# 目录规范说明

## src/
+ src/assets  资源文件，包括图片，字体图标，字体

+ src/common  公用文件，具体说明如下：

   - commandType.js 定义下发指令类型

   - eventType.js   定义事件类型

   - LocalStoreKey.js 定义localStore键值

   - navigation.js  定义导航路径

   - locationChangeType.js 定义window.history更换方式

   - topViewType.js 定义可切换View类型

   - statusCode.js  定义Http状态码

   - utils.js       定义常用工具类方法  

+ src/core 框架核心代码

+ src/controller 控制器相关代码，具体说明如下：

   - state          定义状态

   - context.js     定义状态机上下文
   
   - controller.js  定义控制器

   - outerEventHandler.js 外部事件转化器，如浏览器事件

   - stateManager.js 状态管理

   - stateScene.js 状态快照

+ src/dataUtil   数据查询工具类方法

+ src/model   Model层代码

   - graphql  定义graphql查询语句 

+ src/views   views相关代码

   - common   定义view层公共代码

   - components 定义通用组件

   - modules   定义各模块代码

   - root      定义RootView

   - style     定义通用样式


# 框架demo
http://localhost:3000/ 点击demo 

# 如何增加新模块
## 增加应用状态处理类
目录地址i: src/controller/state
例子： AccountState.js

## 增加外部事件转化处理
文件地址：src/controller/outerEventHandler.js
在方法handleBrowerEvent()中，增加路径判断，转为内部事件

## 一级菜单项状态切换
文件地址：src/controller/context.js
在方法getNextStateScene()中，增加事件拦截，找到要切换的状态，在外部完成状态切换

## 增加导航配置
文件地址： src/common/navigation.js
增加NavigationPath, 增加导航跳转的状态类与View类

## 增加菜单节点
文件地址： src/views/modules/home/menuUrlMatcher.js
增加MenuList数组项 

# 自动化构建
+ npm start 启动项目
   - package.json中新增字段 "proxy": "http://localhost:4000" 配置后端服务地址

+ npm run build 编译项目
   - 将打包好的静态文件放入nginx中。
   - 修改/nginx/conf/nginx配置文件。
    

   ```
    // 在server配置项新增以下路由
    location /user/ {
        proxy_pass  http://localhost:4000$uri;
        proxy_redirect off;
    }	
    
    location /graphql {
        proxy_pass  http://localhost:4000/graphql;
        proxy_redirect off;
    }

    location / {
        try_files  $uri /index.html;
        root       F:\mobisummer\bop-front\build;
        index      index.html index.htm;
    }   
 
   ```


