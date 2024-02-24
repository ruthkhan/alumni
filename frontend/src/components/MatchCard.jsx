import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import UserContext from './UserContext'

function MatchCard({ match, onRemove }) {

    const { userType } = useContext(UserContext)

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{ userType === 'mentor' ? "Grad" : "Mentor" } Name: { match.name }</h5>
                <p className="card-text">Match Score: { match.match_score }</p>
                <div className="match-card">
                    {/* Bootstrap tick and cross buttons */}
                    <Button variant="success" className="round-button" onClick={() => handleButtonClick(true)}>
                        &#10003; {/* Tick symbol */}
                    </Button>
                    <Button variant="danger" className="round-button" onClick={onRemove}>
                        &#10007; {/* Cross symbol */}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MatchCard
