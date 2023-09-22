// 请求工具类
import axios from "axios"

const axiosInstance = axios.create({
    timeout: 10 * 1000,
    baseURL: "/api",
})

// 请求的中间拦截
axiosInstance.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
)

// 请求返回的中间拦截, response: {data: Object, status: 200, statusText: "OK", headers: Object, config: Object, request: XMLHttpRequest }
axiosInstance.interceptors.response.use(
    response => {
        if (response) {
            switch (response.status) {
                case 200:
                    return response.data
                default:
                    break
            }
        } else {
            throw new Error("请求出错，请检查网络！")
        }
    },
    error => Promise.reject(error)
)

export class Net {
    get(url, params = {}, config = {}) {
        return axiosInstance.get(url, { ...config, params })
    }

    post(url, params = {}, config = {}) {
        return axiosInstance.post(url, params, config)
    }
}

export default new Net()
