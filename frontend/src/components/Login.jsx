import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext'

function Login() {

    const { userId, setUserId, visibleMatches, setVisibleMatches, userType, setUserType } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                email, 
                password,
            })
            console.log('Login success:', response.data)
            setUserType(response.data.userType)
            if (response.data.userType === 'mentor') {
                setVisibleMatches(response.data.grad_matches)
            } else if (response.data.userType === 'grad') {
                setVisibleMatches(response.data.mentor_matches)
            }
            // Redirect to MatchPage upon successful login
            setUserId(response.data.userId)
            navigate('/matches')
        } catch (error) {
            console.error('Login failed. Please register first if you have not already done so.', error.message)
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-start vh-100">
            <div className="card p-4 shadow">
                <h1 className="mb-4">Login</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" className="form-control" name="email"value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                {/* {error && <p>{error}</p>} */}
            </div>
        </div>
    )
}

export default Login