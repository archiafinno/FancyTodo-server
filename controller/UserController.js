const models = require('../models')
const {generateToken} = require('../helper/jwt.js')
const {decryptPassword} = require('../helper/bcrypt.js')

class UserController {
    static read(req, res, next){
        models.User.findAll()
        .then(result => {
            res.status(200).json({
                Users: result
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static register(req, res, next) {
        const {email, password} = req.body
        const newAccount = {email, password}
        models.User.create(newAccount)
        .then(result => {
            const payload = {
                id: result.id,
                email: result.email
            }
            // let tes = `eyJhbGciOiJIUzI1NiJ9.YXJjaGlhZmlubm9AZ21haWwuY29t.j_HWqJS9PFWtvpdNMDwyoqt1EpPbE3kbprVaZE2mwVg`
            let token = generateToken(payload)
            // console.log(tes == token)
            res.status(201).json({
                id: result.id,
                email: result.email,
                access_token: token
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        const data = {email, password}
        models.User.findOne({where: {email : email}})
        .then(result => {
            if (result) {
                let compare = decryptPassword(password, result.password)
                if (compare) {
                    let payload = {
                        id: result.id,
                        email
                    }
                    // console.log(payload)
                    let token = generateToken(payload)
                    res.status(200).json({
                        id: result.id,
                        email: email,
                        access_token: token
                    })
                } else {
                    return next({
                        name: `BadRequest`,
                        errors: [{message : `Invalid email/password`}]
                    })
                }
            } else {
                return next({
                    name: `BadRequest`,
                    errors: [{message : `Invalid email/password`}]
                })
            }
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = UserController