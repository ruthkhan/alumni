import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                email, 
                password,
            })
            console.log('Login success:', response.data)
            // Store tokens or handle success as needed
            localStorage.setItem('accessToken', response.data.access)
            // Redirect to MatchPage upon successful login
            navigate('/matches')
        } catch (error) {
            console.error('Login failed. Please register first if you have not already done so.', error.response.data);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login