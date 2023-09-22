import jwt from "jsonwebtoken"
import usersService from "../services/usersService"
import request from "../utils/request"
import helper from "../utils/helper"
import { logger } from "../../config/logger.config"
import { getJwtConfig } from "../../config/jwt.config"

const jwtConfig = getJwtConfig()

class usersController {
    static async login(ctx) {
        let params = ctx.request.body
        let account = params.account
        let password = params.password
        if (account && password) {
            try {
                let data = await usersService.getUserInfoByAccount(
                    account,
                    password
                )
                if (data.length) {
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

                    ctx.sendResponse("0", "登录成功", "ok")
                } else {
                    ctx.sendResponse("-1", "账号或者密码错误")
                }
            } catch (err) {
                ctx.sendResponse("-1", "用户信息查询失败", err)
                logger.error("users/login", "response:", err)
            }
        } else {
            ctx.sendResponse("-1", "参数异常")
            logger.error("users/login", "params:", params)
        }
    }

    static async gerUserInfo(ctx) {
        ctx.sendResponse("0", "ok", {
            userInfo: ctx.state.user,
            userPermission: [],
            userMenuTree: [
                {
                    name: "用户管理",
                    icon: "User",
                    path: "/user",
                    children: [
                        {
                            path: "/user/userMgt",
                            name: "用户列表",
                            icon: "User",
                        },
                    ],
                },
                {
                    path: "/system/monitor",
                    name: "系统监控",
                    icon: "Odometer",
                },
                {
                    path: "/example",
                    name: "代码示例",
                    icon: "Document",
                },
            ],
        })
    }
}

export default usersController
