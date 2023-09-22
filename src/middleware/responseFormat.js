// 统一的响应中间件
export async function responseFormat(ctx, next) {
    ctx.sendResponse = (code, msg, data = null) => {
        ctx.status = 200
        ctx.body = {
            code,
            msg,
            data,
        }
    }
    await next()
}
