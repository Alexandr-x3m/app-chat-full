import React from "react"
import { NavLink } from "react-router-dom"
import { RegisterForm } from "../containers/Forms/RegisterForm"

export const Registration: React.FC = () => {

    return (
        <>
            <h1>Create new user</h1>
            <RegisterForm />
            <NavLink to="auth" >
                Войти 
            </NavLink>
        </>
    )
}