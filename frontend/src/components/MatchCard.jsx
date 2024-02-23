import React from 'react'

function MatchCard({ match }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{ match.type } Name: { match.name }</h5>
                <p className="card-text">Match Score: { match.match_score }</p>
            </div>
        </div>
    )
}

export default MatchCard
