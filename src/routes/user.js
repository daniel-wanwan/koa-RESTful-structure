import koaRouter from "@koa/router"
import usersController from "../controllers/usersController"

const router = new koaRouter()
/**
 * 路径前缀
 */
router.prefix("/user")

// 登录
router.post("/login", usersController.login)

// 获取用户信息
router.get("/gerUserInfo", usersController.gerUserInfo)

export default router
