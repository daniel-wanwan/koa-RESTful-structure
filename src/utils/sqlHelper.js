import mysql from "mysql"
import { getDbConfig } from "../../config/db.config"

const dbConfig = getDbConfig()

/**
 * 数据库连接帮助类
 */
export default class sqlHelper {
    /**
     * 创建数据库连接池
     */
    static getPool() {
        return mysql.createPool(dbConfig)
    }
    /**
     * 执行SQL查询
     * @param {string} sql - SQL查询语句
     * @param {Array} values - SQL查询参数
     */
    static execute(sql, values) {
        return new Promise((resolve, reject) => {
            sqlHelper.getPool().getConnection((err, conn) => {
                if (err) return reject(err)
                conn.query(sql, values, (err, rows) => {
                    if (err) reject(err)
                    else resolve(rows)
                    conn.release()
                })
            })
        })
    }
    /**
     * 查询数据库
     * @param {string} sql - SQL查询语句
     * @param {Array} values - SQL查询参数
     */
    query(sql, values) {
        return sqlHelper.execute(sql, values)
    }

    /**
     * 插入数据到数据库
     * @param {string} sql - SQL插入语句
     * @param {Array} values - SQL插入参数
     */
    insert(sql, values) {
        return sqlHelper.execute(sql, values)
    }

    /**
     * 更新数据库中的数据
     * @param {string} sql - SQL更新语句
     * @param {Array} values - SQL更新参数
     */
    update(sql, values) {
        return sqlHelper.execute(sql, values)
    }

    /**
     * 从数据库中删除数据
     * @param {string} sql - SQL删除语句
     * @param {Array} values - SQL删除参数
     */
    delete(sql, values) {
        return sqlHelper.execute(sql, values)
    }
    /**
     * 从数据库中查询一条数据，返回值是对象，而非数组
     * @param {string} sql - SQL查询语句
     * @param {Array} values - SQL查询参数
     */
    get(sql, values) {
        return sqlHelper
            .execute(sql, values)
            .then(rows => {
                if (rows.length >= 1) {
                    return rows[0]
                } else {
                    return undefined
                }
            })
            .catch(err => {
                console.error(err)
                throw err
            })
    }
}
