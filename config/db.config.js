const configMap = {
    dev: {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "testdb",
        connectionLimit: 20,
    },
    test: {
        host: "localhost",
        user: "allen",
        password: "123456",
        database: "testdb",
        connectionLimit: 20,
    },
    prod: {
        host: "localhost",
        user: "allen",
        password: "123456",
        database: "testdb",
        connectionLimit: 20,
    },
}

export default configMap

export function getDbConfig() {
    return configMap[process.env.NODE_ENV]
}
