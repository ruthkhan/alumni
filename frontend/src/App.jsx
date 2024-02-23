import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './views/Registration'
import Login from './components/Login'
import UserContext from './components/UserContext'
import Matches from './views/Matches'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [mentorMatches, setMentorMatches] = useState([])
  const [gradMatches, setGradMatches] = useState([])
  
  return (
    <UserContext.Provider value={{ mentorMatches, setMentorMatches, gradMatches, setGradMatches }}>
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={ <Registration /> } />
            <Route path="/login" element={ <Login /> } default />
            <Route path="/matches" element={ <Matches /> } />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
