import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import AuthForm from '../containers/Forms/AuthForm'

const LogIn = () => {

    
    const logIn = () => {
        alert('вы вошли')

    }

    return (
        <div>
            <h4>If account with this name dont exist, i am create new</h4>
            <AuthForm />
            <NavLink to="/register" >
                <span>зарегестрироваться</span>
            </NavLink>

        </div>
    )
}

export default LogIn;