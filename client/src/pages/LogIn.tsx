import React, { useState } from 'react'

import AuthForm from '../containers/Forms/Auth'

const LogIn = () => {

    
    const logIn = () => {
        alert('вы вошли')
    }

    return (
        <div>
            <h4>If account with this name dont exist, i am create new</h4>
            <AuthForm />

        </div>
    )
}

export default LogIn;