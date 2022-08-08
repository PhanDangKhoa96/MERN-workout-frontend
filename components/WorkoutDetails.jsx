import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import API_ENDPOINT from './../const/constansts';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext()
    const handleClick = async () => {
        const res = await fetch(API_ENDPOINT + '/' + workout._id, {
            method: "DELETE"
        })
        const json = await res.json()
        if (res.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json._id })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails