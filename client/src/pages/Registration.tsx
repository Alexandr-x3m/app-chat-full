import React from "react"
import { NavLink } from "react-router-dom"
import { RegisterForm } from "../containers/Forms/RegisterForm"

export const Registration: React.FC = () => {

    return (
        <>
        <h1>Creating new user</h1>
            <RegisterForm />
            <NavLink to="/auth" >
                <span>авторизоваться</span>
            </NavLink>
        </>
    )
}