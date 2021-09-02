import React, { useState } from 'react';
import { Route } from 'react-router-dom'

import { useRoutes } from './routes'
import dotenv from 'dotenv'
import './styles/App.css'
import { AuthContext } from './context/Auth.Context';
import { useAuth } from './hooks/auth.hooks';
import { Header } from './components/Header/Header';
import { useEffect } from 'react';

export const App = () => {

  dotenv.config()

  const { isAuth, logIn, logOut, verifyHash, userId, userLogin } = useAuth()

  const routes = useRoutes(isAuth)


  return (
    <AuthContext.Provider value={{ logIn, logOut, verifyHash, userId, userLogin, isAuth }} >
      <div className="App">
        <Header />
        <main>
          {routes}
        </main>
      </div>
    </AuthContext.Provider>
  )
}