let configMap = {
    dev: {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
            "^/proxy*": "",
        },
    },
    test: {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
            "^/proxy*": "",
        },
    },
    prod: {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
            "^/proxy*": "",
        },
    },
}

export default configMap

export function getProxyConfig() {
    return configMap[process.env.NODE_ENV]
}
