import React, { useContext, useState } from 'react'
import axios from 'axios'

import s from '../../styles/containers/Form.module.sass'
import TextInput from '../../components/Inputs/Text'
import Button from '../../components/Inputs/Button'
import { AuthContext } from '../../context/AuthContext'

const AuthForm: React.FC = () => {

    const auth = useContext(AuthContext)

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
            url: `http://192.168.0.51:3001/api/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    let { Date, Email, Login, Name, Password, VerifyHash, id } = res.data.data[0]
                    return auth.logIn(id, VerifyHash, Login)
                }
                if (res.status === 204) {
                    setErrorText('Неправильно введены данные')
                } 
            })
            .catch(err => {
                alert(`Авторизация ${err.message}`)
            })
    }

    return (
        <>
        
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
        </>
    )
}

export default AuthForm;