import React, { useState } from 'react'
import GradForm from './components/GradForm'
import MentorForm from './components/MentorForm'
import Matches from './components/Matches'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [mentorMatches, setMentorMatches] = useState([])
  const [gradMatches, setGradMatches] = useState([])

  const handleFormSubmitted = (newMatches) => {
    setIsFormSubmitted(true)
    if (newMatches.mentor_matches) {
      setMentorMatches(newMatches.mentor_matches)
    }
    if (newMatches.grad_matches) {
      setGradMatches(newMatches.grad_matches)
    }
  }

  return (
    <div className="container mt-5">
      {
        isFormSubmitted ? (
          <Matches mentorMatches={ mentorMatches } gradMatches={ gradMatches } />
        ) : (
          <div className="d-flex justify-content-center align-items-start">
            <div className="p-4">
              <GradForm onSuccess={ handleFormSubmitted } />
            </div>
            <div className="p-4">
              <MentorForm onSuccess={ handleFormSubmitted } />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
