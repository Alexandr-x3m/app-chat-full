import React, { useState } from 'react'
import axios from 'axios'

import s from '../../styles/containers/Form.module.sass'
import TextInput from '../../components/Inputs/Text'
import Button from '../../components/Inputs/Button'
import { debug } from 'console'

const AuthForm: React.FC = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorText, setErrorText] = useState<string>('')


    let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        debugger
        console.log('логинимся')

        let data = {
            login,
            password
        }

        axios({
            method: 'post',
            url: `http://192.168.0.51:8888/logIn`,
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
            />
            <TextInput
                name={'Пароль*'}
                value={password}
                setValue={setPassword}
                required={true}
            />
            <Button 
                name={'log in'}
                onClick={handleSubmit}
            />

        </form>
    )
}

export default AuthForm;