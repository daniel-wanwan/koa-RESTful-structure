const configMap = {
    dev: {
        publicKey: "dev1qaz2wsx3edc4rfv5tgb6yhn7ujm",
        expiresIn: "30d",
    },
    test: {
        publicKey: "test1qaz2wsx3edc4rfv5tgb6yhn7ujm",
        expiresIn: "30d",
    },
    prod: {
        publicKey: "prod1qaz2wsx3edc4rfv5tgb6yhn7ujm",
        expiresIn: "7d",
    },
}

export default configMap

export function getJwtConfig() {
    return configMap[process.env.NODE_ENV]
}
