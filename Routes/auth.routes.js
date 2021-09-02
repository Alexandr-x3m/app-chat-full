const axios = require('axios')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { Router } = require('express')
const auth = Router()


//api/auth/register
auth.post(
    '/register',
    [
        //check('email', 'Hекорректный email').isEmail(),
        check('login', 'Hекорректный login').isLength({ min: 6 }),
        check('password', 'Hекорректный пароль').isLength({ min: 6 })
    ],
    async (req, res) => {
        console.log('register')
        try {
            //const errors = validationResult(req)

            /* if (!errors.isEmpty()) (
                res.status(400).json({
                    message: 'Неправильно введены данные',
                    errors: errors.array()
                })
            ) */
            if (!req.body.login || !req.body.password) return res.status(400).json({ message: 'Неверно указан логин или пароль' })

            const { login,
                password,
                email,
                name
            } = req.body


            console.log('here 1')


            const candidate = await axios({
                method: "POST",
                url: process.env.DB_HOST,
                header: {
                    'content-type': 'application/json'
                },
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
                .then(check_res => {
                    console.log('finish')
                    return check_res.data.data.ChatUsers
                })
                .catch(err_check => res.status(400).json({ message: 'Не удалось проверить пользователя в бд', err_check }))

            console.log(candidate)


            if (candidate.length !== 0) return res.status(400).json({ message: 'Пользователь с данным логином существует' })

            const hashedPassword = await bcrypt.hash(password, 12)
            const verifyHash = await bcrypt.hash(`${login}_chatapi`, 12)

            console.log({ hashedPassword })
            console.log({ verifyHash })
            console.log({ login })
            console.log({ email })

            await axios({
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
                        }) {
                          affected_rows
                          returning {
                            Login
                            VerifyHash
                            id
                          }
                        }
                      }`
                }
            })
                .then((res_create) => {
                    console.log('created')
                    if (res_create.data.data.insert_ChatUsers.affected_rows === 1) {
                        let { Login, VerifyHash, id } = res_create.data.data.insert_ChatUsers.returning[0]
                        console.log(Login)
                        return res.status(200).json({ message: 'Пользователь успешно создан', Login, VerifyHash, id })
                    }
                })
                .catch((err) => {
                    console.log('not created')
                    return res.status(500).json({
                        message: 'Пользователь не создался', err: err.message
                    })
                })



        } catch (error) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error })
        }

    })

//api/auth/login
auth.post('/login', async (req, res) => {
    console.log('login')
    try {

        if (!req.body.login || !req.body.password) return res.sendStatus(400)

        let { login, password } = req.body
        console.log(login)

        //let hashedPassword = await bcrypt.hash(password, 12)

        await axios({
            method: "POST",
            url: process.env.DB_HOST,
            header: {
                'content-type': 'application/json'
            },
            data: {
                query: `query Authorization {
                    ChatUsers(where: {
                        Login: {_eq: "${login}"}
                    }) {
                      Email
                      Date
                      Login
                      Name
                      Password
                      VerifyHash
                      id
                    }
                }`
            }
        })
            .then(response => {
                let data = response.data.data.ChatUsers                

                if (data.length != 0) {
                    console.log('user finded')

                    let hashPass = data[0].Password

                    // Load hash from your password DB.
                    bcrypt.compare(password, hashPass, function (err, result) {
                        if (result) {
                            console.log('here 1')
                            return res.status(200).json({ data })
                        } else {
                            return res.sendStatus(204)
                        }
                    });


                } else {
                    return res.sendStatus(204)
                }

            })
            .catch(error => res.status(404).json({ message: 'Пользователь не найден' }))

    } catch (error) {

    }
})

//api/auth/checkUser
auth.post('/checkUser', async (req, res) => {
    console.log('checkUser')
    try {
        if (!req.body.LGU || !req.body.UID || !req.body.VFH) return res.sendStatus(400)

        const { LGU, UID, VFH } = req.body

        await axios({
            method: 'POST',
            url: process.env.DB_HOST,
            headers: { 'Content-Type': 'application/json' },
            data: {
                query: `query CheckUser {
                    ChatUsers(where: {
                        Login: {_eq: "${LGU}"}, 
                        id: {_eq: "${UID}"}, 
                        VerifyHash: {_eq: "${VFH}"
                    }}) {
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
            .then((response) => {
                console.log(response.data.data.ChatUsers)
                let data = response.data.data.ChatUsers[0]

                if (data) {
                    return res.status(200).json({ message: 'Пользователь существует!' })
                }

                return res.status(400).json({ message: 'Такого пользователя не существует!' })
            })
            .catch((err) => {
                console.log(err.message)
                console.log(`message --- ${err.message}`)
            })

    } catch (error) {

    }
})

module.exports = auth