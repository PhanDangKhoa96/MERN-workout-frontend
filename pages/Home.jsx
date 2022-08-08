import React from 'react'
import { useEffect } from 'react'
import WorkoutForm from '../components/WorkoutForm';
import WorkoutDetails from './../components/WorkoutDetails';
import API_ENDPOINT from './../const/constansts';
import { useWorkoutContext } from './../hooks/useWorkoutContext';

const Home = () => {
    const { workout, dispatch } = useWorkoutContext()

    const fetchWorkouts = async () => {
        const response = await fetch(API_ENDPOINT)

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_WORKOUTS', payload: json })
        }
    }

    useEffect(() => {
        fetchWorkouts()
    }, [workout])


    return (
        <div className="home">
            <div className="workouts">
                {workout && workout.map(workout => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home