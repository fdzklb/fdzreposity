# Node 环境

## 8.11.1
## 公司私库NPM镜像地址: http://maven-local.mobisummer-inc.com/repository/npm/

# 目录规范说明

## src/
+ src/adapter  定义Adapter

+ src/amAuthSDK  权限验证SDK

+ src/config 配置文件，包括Adapter设置，日志打印设置，数据库设置
   - config.dev.js  开发环境
   - config.test.js 测试环境
   - config.prod.js 生产环境 

+ src/graphql 定义Graphql协议和接口方法，按模块分文件夹，分别定义schema和resolver.
   
   - 协议说明：http://wiki.mobisummer.com/pages/viewpage.action?pageId=13113181

   - resolver需将参数转化为内部通用协议，通用协议说明见：http://wiki.mobisummer.com/pages/viewpage.action?pageId=13110689
   
+ src/handler 定义handler类
   
   - 调用request(commonProtocol)方法 将通用协议转化成数据提供协议。

   - 新增handler类，需在handlerType.js中定义类型
     ```
      // 注意：定义的value值，为新增handle类的文件名。
      module.exports = {
        /*-- Auth Module --*/

        /* setTokenHandler */
        SET_TOKEN: 'setTokenHandler', 
        /* getTokenHandler */
        GET_TOKEN: 'getTokenHandler',
     }
     ```
   - handler基类中可初始化数据源配置，即provider。
     ```
       /**
        * set Provider configs
        */
        setProviderConfigs() {
          /**
          * Provider configs
          * support array
          */
          this.providerConfigs = {
            type: PROVIDER_TYPE.DB,
            key: DBCONFIG.MS
          };
        }

     ```
    - 可在子类中重新此方法，重置数据源，并且支持多个数据源，设置成数组即可

+ src/service   业务层代码，涉及到复杂的sql查询,可下放到Service来做

   - service按业务实体来创建
   - handler可依赖多个service
   - service依赖handler层的数据源provider
   - 重写setProvider方法可重置数据源provider
   - 新增service, 需定义serviceType
    ```
      // 注意：定义的value值，为新增Service类的文件名。
      module.exports = {
        /* CampaginService */
        CAMPAIGN: 'campaignService',
      }
    ```

+ src/sql   定义sql语句，只支持参数查询方式。
   
   - mysql.js 定义mysql相关语句

   - redshift.js  定义redshift相关语句

+ src/provider 数据提供者，支持多种DB查询，http协议等。
  
   - db 目前只实现mysql，redshift查询
   
   - http http协议查询

   - mockjs mock数据源

+ src/auth.js token验证
  
   - 生成token值存在user_token表里，建议先放在redshift, 再落地到mysql。

+ src/constant.js 常量定义，多为类型枚举值

+ src/server.js 启动入口, 提供接口如下：
  
  - /user/login  用户登录
  - /user/auth   用户验证
  - /graphql     graphql协议查询接口

+ src/utils.js  常用工具类方法

# 自动化构建
+ npm start [test|production] 启动项目
  - npm start test 按测试环境配置启动
  - npm start production 按生产环境配置启动

+ npm run build 编译项目





