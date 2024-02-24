import React, { useContext, useState } from 'react'
import axios from 'axios'
import MatchCard from '../components/MatchCard'
import UserContext from '../components/UserContext'

function Matches() {

    const { userId, visibleMatches, setVisibleMatches, userType } = useContext(UserContext)

    const handleRemoveMatch = async (matchId) => {
        try {
            await axios.post('http://localhost:8000/api/remove-match/', {
                userId, 
                matchId,
                userType,
            })
            // Remove the match from visibleMatches
            const updatedVisibleMatches = visibleMatches.filter(
                (match) => match.mentor_id !== matchId && match.grad_id !== matchId
            )
            setVisibleMatches(updatedVisibleMatches)
        } catch (error) {
            console.error('Error removing match:', error.message)
        }
    }

    return (
        <div className="container mt-5">
            <h1>Top 3 Mentor / Grad Matches</h1>

            <div className="row">
                {visibleMatches.map((match) => (
                <div key={ match.mentor_id || match.grad_id } className="col-md-4 mb-3">
                    <MatchCard 
                        match={ match }
                        onRemove={() => handleRemoveMatch(match.mentor_id || match.grad_id )}  />
                </div>
                ))}
            </div>
        </div>
    )
}

export default Matches