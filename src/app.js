import Koa from "koa"
import bodyparser from "@koa/bodyparser"
import cors from "@koa/cors"
import session from "koa-session"
import koaStatic from "koa-static"
import json from "koa-json"
import onerror from "koa-onerror"
import koaJwt from "koa-jwt"
import { errorHandler, notFoundHandler, responseFormat } from "./middleware"
import { accessLogger, logger } from "../config/logger.config"
import sessConfig from "../config/session.config"
import { getJwtConfig } from "../config/jwt.config"
import routers from "./routes/index"

// 创建Koa应用
const app = new Koa()

// 获取jwt配置
const jwtConfig = getJwtConfig()

// 错误处理
onerror(app)

// 记录启动日志
logger.info("start app", "env:", process.env.NODE_ENV)

// 使用中间件
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"],
    })
)
app.use(cors())
app.use(json())
app.use(accessLogger)
app.use(responseFormat)
app.use(errorHandler())
app.use(notFoundHandler())
app.use(koaStatic(__dirname + "../static"))

// JWT认证
app.use(
    koaJwt({
        secret: jwtConfig.publicKey,
        cookie: "token",
    }).unless({
        path: [/^\/api\/user\/login/, /^\/home/, /^\/static/],
    })
)

app.keys = [jwtConfig.publicKey]

// 使用session
app.use(session(sessConfig, app))

// 使用路由
routers.forEach(router => {
    router.prefix("/api")
    app.use(router.routes(), router.allowedMethods())
})

// 错误处理
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx)
    logger.error("server error", err, ctx)
})

module.exports = app
