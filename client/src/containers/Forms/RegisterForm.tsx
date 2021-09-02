
import React, { useState, useContext } from "react"
import axios from "axios"

import s from '../../styles/containers/Form.module.sass'
import Button from "../../components/Inputs/Button"
import TextInput from "../../components/Inputs/Text"
import { AuthContext } from "../../context/AuthContext"

export const RegisterForm: React.FC = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [errorText, setErrorText] = useState<string>('')

    const auth = useContext(AuthContext)


    let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('регестрируеся')

        if (password !== repeatPassword) return setErrorText('Пароли не сопадают')

        let data = {
            login,
            password,
            name: name ? name : null,
            email: email ? email : null,
        }

        axios({
            method: 'POST',
            url: 'http://192.168.0.51:3001/api/auth/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
            .then(res => {
                debugger
                console.log(res)
                if (res.status === 204) {
                    return setErrorText('Пользователь с данным именем не найдем')
                }
                if (res.status === 200) {
                    let { message, id, VerifyHash, Login } = res.data

                    setErrorText(message)
                    auth.logIn(id, VerifyHash, Login)
                }
            })
            .catch(err => {
                setErrorText(err.response.data.message)
            })

    }

    return (
        <form
            onSubmit={handleSubmit}
            className={s.form}
            encType="multipart/form-data"
        >
            <div className={s.error_alert}>
                {errorText}
            </div>
            <TextInput
                name={'Логин*'}
                value={login}
                setValue={setLogin}
                required={true}
                autofocus={true}
            />
            <TextInput
                name={'Имя пользователя'}
                value={name}
                setValue={setName}
            />
            <TextInput
                name={'Эл. почта'}
                value={email}
                setValue={setEmail}
            />
            <TextInput
                name={'Пароль*'}
                value={password}
                setValue={setPassword}
                required={true}
                autofocus={true}
            />
            <TextInput
                name={'Повторите пароль*'}
                value={repeatPassword}
                setValue={setRepeatPassword}
                required={true}
                autofocus={true}
            />
            <Button
                name={'Зарегестрироваться'}
                onClick={handleSubmit}
            />

        </form>
    )
}