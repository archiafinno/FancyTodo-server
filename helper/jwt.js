const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, 'todoninno')
}

const decodeToken = (payload) => {
    return jwt.verify(payload, 'todoninno')
}

module.exports = {
    generateToken,
    decodeToken
}