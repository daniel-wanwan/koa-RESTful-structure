import koaRouter from "@koa/router"
import httpProxy from "../utils/httpProxy"

const router = new koaRouter()
/**
 * 路径前缀
 */
router.prefix("/proxy")

/**
 * http代理
 */

router.get("/getBusinessInfo", async (ctx, next) => {
    ctx.respond = false
    await httpProxy(ctx, next)
})

router.post("/addBusinessInfo", async (ctx, next) => {
    ctx.respond = false
    await httpProxy(ctx, next)
})

export default router
