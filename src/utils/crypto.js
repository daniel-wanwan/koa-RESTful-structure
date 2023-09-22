import crypto from "crypto"

/**
 * 使用MD5方式加密数据
 * @param {string} data
 */
const md5 = data => {
    return crypto.createHash("md5").update(data, "utf-8").digest("hex")
}

/**
 * 使用SHA256方式加密数据
 * @param {string} data
 */
const sha256 = data => {
    return crypto.createHash("sha256").update(data, "utf-8").digest("hex")
}

/**
 * 使用SHA512方式加密数据
 * @param {string} data
 */
const sha512 = data => {
    return crypto.createHash("sha512").update(data, "utf-8").digest("hex")
}

// 定义对称加密工具函数
// 参数：明文，密钥，算法（默认为aes-256-cbc）
// 返回：密文
function symmetricEncrypt(plaintext, key, algorithm = "aes-256-cbc") {
    // 创建加密器对象
    const cipher = crypto.createCipher(algorithm, key)
    // 对明文进行加密
    let ciphertext = cipher.update(plaintext, "utf8", "hex")
    ciphertext += cipher.final("hex")
    // 返回密文
    return ciphertext
}

// 定义对称解密工具函数
// 参数：密文，密钥，算法（默认为aes-256-cbc）
// 返回：明文
function symmetricDecrypt(ciphertext, key, algorithm = "aes-256-cbc") {
    // 创建解密器对象
    const decipher = crypto.createDecipher(algorithm, key)
    // 对密文进行解密
    let plaintext = decipher.update(ciphertext, "hex", "utf8")
    plaintext += decipher.final("utf8")
    // 返回明文
    return plaintext
}

// 定义非对称加密工具函数
// 参数：明文，公钥，算法（默认为rsa）
// 返回：密文
function asymmetricEncrypt(plaintext, publicKey, algorithm = "rsa") {
    // 创建加密器对象
    const cipher = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(plaintext)
    )
    // 对明文进行加密
    let ciphertext = cipher.toString("base64")
    // 返回密文
    return ciphertext
}

// 定义非对称解密工具函数
// 参数：密文，私钥，算法（默认为rsa）
// 返回：明文
function asymmetricDecrypt(ciphertext, privateKey, algorithm = "rsa") {
    // 创建解密器对象
    const decipher = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(ciphertext, "base64")
    )
    // 对密文进行解密
    let plaintext = decipher.toString()
    // 返回明文
    return plaintext
}

export default {
    md5,
    sha256,
    sha512,
    symmetricEncrypt,
    symmetricDecrypt,
    asymmetricEncrypt,
    asymmetricDecrypt,
}
