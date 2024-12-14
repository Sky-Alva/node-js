const hmacSHA256 = require("crypto-js/hmac-sha256");
const sha256= require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')
const {privatekey}=require('../configs')
const jwt= require('jsonwebtoken')

const encrypt = (message) => {
    const hashDigest = sha256(message)
    const hmacDigest = Base64.stringify(hmacSHA256(hashDigest, privatekey))
    return hmacDigest
}

const createToken =(payload) => {
    return jwt.sign(payload, privatekey,{
        expiresIn: '30d'})
    }

module.exports ={ 
    encrypt,
    createToken
}