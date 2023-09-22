export const errorHandler = () => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            console.log("errorHandler", err.status, err.message)
            switch (err.status) {
                case 401:
                    // 处理令牌验证失败的情况
                    ctx.status = 200
                    ctx.sendResponse("100001", "请先登录")
                    break

                case 403:
                    // 处理令牌验证失败的情况
                    ctx.status = 200
                    ctx.sendResponse("100001", "身份过期")
                    break
                default:
                    ctx.status = err.status || 500
                    ctx.sendResponse("-1", "系统错误")
            }
        }
    }
}

export const notFoundHandler = () => {
    return async (ctx, next) => {
        switch (ctx.status) {
            case 404:
                ctx.body = "没有找到内容 - 404"
                break
        }
        await next()
    }
}
