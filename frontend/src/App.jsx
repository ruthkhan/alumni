import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './views/Registration'
import Login from './components/Login'
import Matches from './components/Matches'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={ <Registration /> } />
        <Route path="/login" element={ <Login /> } default />
        <Route path="/matches" element={ <Matches /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
