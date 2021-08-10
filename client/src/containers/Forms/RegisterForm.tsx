
import React, { useState } from "react"
import axios from "axios"

import s from '../../styles/containers/Form.module.sass'
import Button from "../../components/Inputs/Button"
import TextInput from "../../components/Inputs/Text"

export const RegisterForm: React.FC = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [errorText, setErrorText] = useState<string>('')


    let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        debugger
        console.log('регестрируеся')

        if (password !== repeatPassword) return setErrorText('Пароли не сопадают')

        let data = {
            login,
            password,
            name: name ? name : null,
            email: email ? email : null,
        }

        axios({
            method: 'post',
            url: process.env.HOST_SRV,
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
                    localStorage.setItem('user_id', res.data.id)
                    localStorage.setItem('login', res.data.login)
                }
            })
            .catch(err => {
                debugger
                console.log(err)})

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