import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MatchCard from './MatchCard'

function Matches() {

    const [mentorMatches, setMentorMatches] = useState([])
    const [gradMatches, setGradMatches] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/matches/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                if (response.data.authenticated) {
                    const { user_type, matches } = response.data
                    // Set matches based on user type
                    if (user_type === 'mentor') {
                        setMentorMatches([]) // Reset mentor matches
                        setGradMatches(matches) 
                    } else if (user_type === 'grad') {
                        setGradMatches([]) // Reset grad matches
                        setMentorMatches(matches) 
                    }
                } else {
                    console.error('Authentication failed:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }
        fetchData()
    }, [])

    return (
        <div className="container mt-5">
            <h1>Top 3 Mentor / Grad Matches</h1>

            {(mentorMatches && mentorMatches.length > 0) && (
            <div className="row">
                {mentorMatches.map(match => (
                <div key={match.mentor_id} className="col-md-4 mb-3">
                    <MatchCard key={match.mentor_id} match={{ type: 'Mentor', ...match }} />
                </div>
                ))}
            </div>
            )}

            {(gradMatches && gradMatches.length > 0) && (
            <div className="row">
                {gradMatches.map(match => (
                <div key={match.grad_id} className="col-md-4 mb-3">
                    <MatchCard key={match.grad_id} match={{ type: 'Grad', ...match }} />
                </div>
                ))}
            </div>
            )}

        </div>
    )
}

export default Matches