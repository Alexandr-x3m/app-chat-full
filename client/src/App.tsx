import React from 'react';
import { Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

import { Routes } from './routes'

import './styles/App.css'

export const App = () => {

  const { userLogin, userId, verifyHash, logIn, logOut } = useAuth()
  const isAuth = !!userLogin && !!userId && !!verifyHash
  console.log({isAuth})

  return (
    <AuthContext.Provider value={{
      userLogin, userId, verifyHash, logIn, logOut, isAuth 
    }} >
      <div className="App">
        <main>
          <Routes isAuthenticated={isAuth} />
        </main>
      </div>
    </AuthContext.Provider>
  )
}