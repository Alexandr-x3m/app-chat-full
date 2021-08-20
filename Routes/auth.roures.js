const axios = require('axios')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { Router } = require('express')
const auth = Router()


//api/auth/register
auth.post(
    '/register',
    [
        check('email', 'Hекорректный email').isEmail(),
        check('email', 'Hекорректный пароль').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) (
                res.status(400).json({
                    message: 'Неправильно введены данные',
                    errors: errors.array()
                })
            )

            const { login, password, email, name } = req.body

            const candidate = await axios({
                method: "POST",
                url: process.env.DB_HOST,
                header: {},
                data: {
                    query: `query CheckLogin {
                    ChatUsers(where: {Login: {_eq: "${login}"}}) {
                      Email
                      Date
                      Login
                      Name
                      Password
                      id
                    }
                }`
                }
            })

            if (candidate.data.ChatUsers.length !== 0) return res.status(400).json({ message: 'Пользователь с данным логином существует' })

            const hashedPassword = await bcrypt.hash(password, 12)
            const verifyHash = await bcrypt.hash(`${login}_chatapi`, 12)

            let user = await axios({
                method: "POST",
                url: process.env.DB_HOST,
                header: {},
                data: {
                    query: `mutation MyMutation {
                        insert_ChatUsers(objects: {
                            Login: "${login}", 
                            Password: "${hashedPassword}", 
                            Email: "${email ? email : null}", 
                            Name: "${name ? name : null}", 
                            VerifyHash: "${verifyHash}"
                        })
                    }`
                }
            })

            if (user.data.insert_ChatUsers.affected_rows !== 1) return res.status(400).json({ message: 'Не удалось создать пользователя попробуйте позже' }) 

            res.status(200).json({ message: 'Пользователь успешно создан' }) 
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }

    })

//api/auth/login
auth.post('/register', async (req, res) => {
    console.log(req.body)

    try {
        console.log(req.body)
        if (req.body) return res.sendStatus(400)
    } catch (e) {

    }
})

module.exports = auth