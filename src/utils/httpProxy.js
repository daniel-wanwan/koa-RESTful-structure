import { createProxyMiddleware } from "http-proxy-middleware"
import { getProxyConfig } from "../../config/proxy.config"

const proxyConfig = getProxyConfig()

/**
 * 根据不同的环境配置代理路径，处理代理请求
 * @param {*} ctx
 * @param {*} next
 */
const proxyHelper = async (ctx, next) => {
    return createProxyMiddleware(proxyConfig)(ctx, next)
}

export default proxyHelper
