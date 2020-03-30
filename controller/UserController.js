const models = require('../models')
const {generateToken} = require('../helper/jwt.js')
const {decryptPassword} = require('../helper/bcrypt.js')

class UserController {
    static read(req, res){
        models.User.findAll()
        .then(result => {
            res.status(200).json({
                Users: result
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static register(req, res) {
        const {email, password} = req.body
        const newAccount = {email, password}
        models.User.create(newAccount)
        .then(result => {
            const payload = {
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
            if (err.name == 'SequelizeValidationError') {
                res.status(404).json({
                    msg: err.errors[0].message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static login(req, res) {
        const {email, password} = req.body
        const data = {email, password}
        models.User.findOne({where: {email : email}})
        .then(result => {
            if (result) {
                let compare = decryptPassword(password, result.password)
                if (compare) {
                    let payload = {email}
                    let token = generateToken(payload)
                    res.status(200).json({
                        email: email,
                        access_token: token
                    })
                } else {
                    res.status(404).json({
                        type: `Bad request`,
                        msg: `Invalid email/password`
                    })
                }
            } else {
                res.status(404).json({
                    type: `Bad request`,
                    msg: `Invalid email/password`
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController