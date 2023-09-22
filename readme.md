# 简介

基于 koa 服务端 RESTful 项目基础架构，支持JavaScript es5/6/7/8。

此项目安装koa常用插件，支持对静态资源的访问，支持跨越的解决方案，支持代理转发请求。

框架可以根据不同的环境配置启动，可随意调整开发，测试，生产环境的配置。

开箱即用，可以直接应用到中小企业的后端服务，支持集群，多线程模式(默认开启)，可以通过pm2配置文件修改。

# 数据库
本项目使用prisma操作MySQL数据库，更多请查看官网文档 https://prisma.yoga/ 中文文档更细更全面。

# 目录结构说明

```bash
├── bin                         # bin入口目录
│   └── www                     # 启动文件入口
├── config                      # 配置文件
│   ├── db.config.js            # 数据库配置文件
│   ├── jwt.config              # JWT配置文件
│   ├── logger.config.js        # 日志配置文件
│   ├── proxy.config.js         # 代理配置文件
│   └── session.config.js       # session配置文件
├── logs                        # 保存的日志文件
├── prisma                      # prisma 目录
│   └── schema.prisma           # prisma schema文件
├── src                         # 源代码目录，编译后目标源代码位于 dist 目录logs
│   ├── controllers             # 控制器
│       └── userController.js   # user控制器
│   ├── middleware              # 中间件目录
│       └── errorRouteCatch.js  # 示例插件 -  router异常处理
│   ├── models                  # 模型层
│   ├── routes                  # 路由层
│         └── user.js           # api路由文件
│   └── services                # 服务层
│         └── userService.js    # user服务层
│   ├── utils                   # 工具类目录
│   ├── app.js                  # 入口文件
├── static                      # 静态资源目录
├── .eslintignore               # eslint 忽略文件
├── .eslintrc.js                # eslint 配置文件
├── .gitignore                  # Git 忽略文件
├── .prettierignore             # prettier 忽略文件
├── .prettierrc.js              # prettier 配置文件
├── .babel.config.js            # Babel 配置文件
├── package.json                # npm
├── pm2.config.js               # pm2 配置文件
└── README.md                   
```

# 本地开发
通过nodemon进行实时热编译

```bash
npm run serve
```
通过"serve": "cross-env NODE_ENV=dev nodemon bin/www"，执行/bin/www文件，并设置环境变量 NODE_ENV=dev

这个脚本首先使用Babel进行代码转译，然后创建一个HTTP服务器并开始监听指定的端口。如果在尝试监听端口时发生错误，它会调用onError函数来处理错误。如果服务器成功开始监听，它会调用onListening函数来打印服务器的URL。如果环境变量NODE_ENV设置为"dev"，则还会打印出所有网络接口的URL。


# 代码风格
使用eslint+prettier统一代码格式，推荐使用vscode，安装以下插件，

ESLint：
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Prettier - Code formatter：https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

将手动代码格式化工具默认选择为Prettier即可，或者配置保存时自动eslint格式化

# 日志
使用log4js作为日志记录器


# 部署

服务器安装pm2

```bash
npm install pm2 -g
```

通过pm2部署，采用多套配置部署至对应环境，执行对应的命令即可，如：

```bash
npm run prod
```

## docker部署
PM2 配合 Docker 部署说明： http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/

# 鉴权
后端通过JWT鉴权，登录时会把用户信息通过cookie的形式设置到客户端

```javascript
let userInfo = data[0]
let token = jwt.sign(userInfo, jwtConfig.publicKey, {
    expiresIn: jwtConfig.expiresIn,
})
ctx.cookies.set("token", token, {
    // 过期时间（以毫秒为单位），这里设置为7天
    maxAge: 7 * 24 * 60 * 60 * 1000,
    // Cookie在哪个路径下可用，默认是'/'
    path: "/",
    // 域名，如果需要在子域名中共享Cookie，可以设置
    // domain: '.example.com',
    // 是否只通过HTTPS传输Cookie
    secure: false,
    // 是否只允许服务器访问Cookie
    httpOnly: true,
    // 签名Cookie以增加安全性
    signed: true,
})
```


前端无需任何处理，http请求会自动把cookie带上，后端通过中间件自动获取，保存在ctx.state.user中。

```javascript
ctx.sendResponse("0", "ok", {
    userInfo: ctx.state.user,
    userPermission: [],
    userMenuTree: [],
})
```

如果前端需要token，登录接口把token通过http给前端保存即可，但是不推荐这样做

```javascript
let userInfo = data[0]
let token = jwt.sign(userInfo, jwtConfig.publicKey, {
    expiresIn: jwtConfig.expiresIn,
})
ctx.cookies.set("token", token, {
  // ...这里省略部分代码
})
ctx.sendResponse("0", "登录成功", token)
```

接着你需要修改 app.js中，去掉 cookie: "token"，那么你将需要写一个中间件读取前端传过来的token并解密，你觉得这样麻烦吗？

```javascript
// JWT认证
app.use(
    koaJwt({
        secret: jwtConfig.publicKey,
        // cookie: "token", // 通过cookie token字段获取token
    }).unless({
        path: [/^\/api\/user\/login/, /^\/home/, /^\/static/],
    })
)
```