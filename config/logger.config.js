import path from "path"
import * as log4js from "log4js"

// level: ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF

log4js.configure({
    pm2: true,
    pm2InstanceVar: "INSTANCE_ID",
    appenders: {
        access: {
            type: "dateFile",
            encoding: "utf-8",
            pattern: "yyyy-MM-dd", //生成文件的规则
            alwaysIncludePattern: true, //文件名始终以日期区分
            filename: path.join(__dirname, "../logs/access.log"), //生成文件名
            numBackups: 7, // 要保留日志文件的数量(不包括热文件)
            keepFileExt: true,
            layout: {
                type: "pattern",
                pattern: "%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %m",
                charset: "utf-8",
            },
        },
        trace: {
            type: "dateFile",
            encoding: "utf-8",
            pattern: "yyyy-MM-dd",
            alwaysIncludePattern: true, //文件名始终以日期区分
            filename: path.join(__dirname, "../logs/trace.log"), //生成文件名
            numBackups: 7, // 要保留日志文件的数量(不包括热文件)
            keepFileExt: true,
            layout: {
                type: "pattern",
                pattern: "%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %m",
                charset: "utf-8",
            },
        },

        stdout: {
            type: "stdout",
            // layout: {
            //     type: "pattern",
            //     pattern: "%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %m",
            //     charset: "utf-8",
            // },
        },
    },
    categories: {
        default: { appenders: ["stdout"], level: "info" },
        access: { appenders: ["access"], level: "info" },
        trace: { appenders: ["trace"], level: "all" },
    },
})

//记录所有访问级别的日志
export const accessLogger = async (ctx, next) => {
    const accessLogger = log4js.getLogger("access")
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    const originalUrl = ctx.originalUrl
    const protocol = ctx.protocol
    const hostname = ctx.hostname
    const method = ctx.method
    const status =
        ctx.response.status || ctx.response.__statusCode || ctx.res.statusCode
    const httpVersion =
        ctx.req.httpVersionMajor + "." + ctx.req.httpVersionMinor
    const remoteAddr =
        ctx.headers["x-forwarded-for"] ||
        ctx.ip ||
        ctx.ips ||
        (ctx.socket &&
            (ctx.socket.remoteAddress ||
                (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
    const userAgent = ctx.headers["user-agent"]
    const contentLength =
        (ctx.response._headers && ctx.response._headers["content-length"]) ||
        (ctx.response.__headers && ctx.response.__headers["Content-Length"]) ||
        ctx.response.length ||
        "N/A"
    const requestLog = `${protocol}://${hostname}${originalUrl} ${httpVersion} ${method} ${status} ${remoteAddr} ${userAgent} ${contentLength}bytes ${ms}ms`
    // 打印请求信息
    accessLogger.log("info", requestLog)
}

//记录所有应用级别的日志
export const logger = log4js.getLogger("trace")
