import React, { useState } from 'react'

function MentorForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name:'', 
        gradDate:'', 
        prevJob:'', 
        currentJob:'',
        mentorType:'',
        gradText:'', 
    })

    const handleChange = (e) => {
        setFormData((prevData) => ({
        ...prevData, 
        [e.target.name]: e.target.value, 
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ mentor_data: formData })
    }

    return (
        <div className="container d-flex justify-content-center align-items-start vh-100">
            <div className="card p-4 shadow">
                <h2 className="mb-4">Mentor Profile</h2>
                <form onSubmit={ handleSubmit }>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={ formData.name }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gradDate" className="form-label">Bootcamp Graduation Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="gradDate"
                            name="gradDate"
                            value={ formData.gradDate }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="prevJob" className="form-label">Previous Job:</label>
                        <select
                            className="form-select"
                            id="prevJob"
                            name="prevJob"
                            value={ formData.prevJob }
                            onChange={ handleChange }
                        >
                        <option value="">Select an option</option>
                        <option value="artist">Artist</option>
                        <option value="custService">Customer Service</option>
                        <option value="sales">Sales</option>
                        <option value="military">Military</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="currentJob" className="form-label">Current Job:</label>
                        <select
                            className="form-select"
                            id="currentJob"
                            name="currentJob"
                            value={ formData.currentJob }
                            onChange={ handleChange }
                        >
                        <option value="">Select an option</option>
                        <option value="cybersec">CyberSecurity</option>
                        <option value="dev">Developer</option>
                        <option value="infra">DevOps / Network / Infrastructure</option>
                        <option value="data">Data Analyst / Scientist</option>
                        <option value="pMgr">Product / Program / Project Manager</option>
                        <option value="sales">Tech Sales / Pre-Sales</option>
                        <option value="test">Test Engineer</option>
                        <option value="otherTech">Other Tech</option>
                        <option value="nonTech">Non-Tech</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Preferred Mentorship Type:</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="mentorType"
                                id="Career Advice"
                                value="Career Advice"
                                checked={ formData.mentorType === 'Career Advice' }
                                onChange={ handleChange }
                            />
                            <label className="form-check-label" htmlFor="Career Advice">
                                Career Advice
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="mentorType"
                                id="Code Review / Project Feedback"
                                value="Code Review / Project Feedback"
                                checked={ formData.mentorType === 'Code Review / Project Feedback' }
                                onChange={ handleChange }
                            />
                            <label className="form-check-label" htmlFor="Code Review / Project Feedback">
                                Code Review / Project Feedback
                            </label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gradText" className="form-label">Any other unique career experiences to share</label>
                        <textarea
                            className="form-control"
                            id="gradText"
                            name="gradText"
                            value={ formData.gradText }
                            onChange={ handleChange }
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default MentorForm
