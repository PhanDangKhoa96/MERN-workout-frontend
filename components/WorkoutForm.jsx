import React, { useState } from 'react'
import API_ENDPOINT from './../const/constansts';
import { useWorkoutContext } from './../hooks/useWorkoutContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({ title, load, reps }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json()

        if (res.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])

            dispatch({ type: "CREATE_WORKOUT", payload: json })
        }

        if (!res.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Number of Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm