import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import GradForm from '../components/GradForm'
import MentorForm from '../components/MentorForm'
import UserContext from '../components/UserContext'

const Registration = () => {

    const { mentorMatches, setMentorMatches, gradMatches, setGradMatches } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('grad') // 'grad' or 'mentor'
    const navigate = useNavigate()

    const handleRegistration = async (formData) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/${userType}_profile/`, {
                email,
                password, 
                userType,
                ...formData,
            })
            console.log('Registration successful:', response.data)
            if (userType === 'mentor') {
                setGradMatches(response.data.gradMatches)
            } else if (userType === 'grad') {
                setMentorMatches(response.data.mentorMatches)
            }
            // Redirect to Match Page upon successful registration
            navigate('/matches')
        } catch (error) {
            console.error('Registration failed:', error.response.data)
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-start vh-100">
            <div className="card p-4 shadow">
                <h1 className="mb-4">Registration</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="userType" className="form-label">Registration Type:</label>
                    <select className="form-select" name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="grad">Recent Grad</option>
                        <option value="mentor">Mentor</option>
                    </select>
                </div>
                <hr />
                {userType === 'mentor' ? (
                    <MentorForm onSubmit={handleRegistration} />
                ) : (
                    <GradForm onSubmit={handleRegistration} />
                )}
            </div>
        </div>
    )
}

export default Registration