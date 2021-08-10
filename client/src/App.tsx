import React from 'react';
import { Route } from 'react-router-dom'

import { Routes } from './routes'

import './styles/App.css'

export const App = () => {


  return (
    <div className="App">
      <main>
        <Routes isAuthenticated={false} />
      </main>
    </div>
  )
}