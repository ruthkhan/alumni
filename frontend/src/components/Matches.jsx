import React from 'react'
import MatchCard from './MatchCard'

function Matches({ mentorMatches, gradMatches }) {
    
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