import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'

function GradForm() {
    const [formData, setFormData] = useState({
        gradName:'', 
        gradDate:'', 
        prevJob:'', 
        mentorText:'', 
    })

    const handleChange = (e) => {
        setFormData((prevData) => ({
        ...prevData, 
        [e.target.name]: e.target.value, 
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/grad_profile/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => console.log('Form submitted:', data))
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow">
            <h1 className="mb-4">Grad Profile</h1>
            <form onSubmit={ handleSubmit }>
            <div className="mb-3">
                <label htmlFor="gradName" className="form-label">Name:</label>
                <input
                type="text"
                className="form-control"
                id="gradName"
                name="gradName"
                value={ formData.gradName }
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
                value={formData.gradDate}
                onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="prevJob" className="form-label">Previous Job:</label>
                <select
                className="form-select"
                id="prevJob"
                name="prevJob"
                value={formData.prevJob}
                onChange={handleChange}
                >
                <option value="">Select an option</option>
                <option value="artist">Artist</option>
                <option value="custService">Customer Service</option>
                <option value="sales">Sales</option>
                <option value="military">Military</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="mentorText" className="form-label">What I'm looking for in a mentor</label>
                <textarea
                className="form-control"
                id="mentorText"
                name="mentorText"
                value={formData.mentorText}
                onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default GradForm
