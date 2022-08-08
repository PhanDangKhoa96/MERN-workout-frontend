export const workoutReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'SET_WORKOUTS': {
            return { workout: payload }
        }

        case 'DELETE_WORKOUT': {
            return { workout: state.workout.filter(w => w._id !== payload) }
        }

        case 'CREATE_WORKOUT': {
            return { ...state.workout, payload }
        }

        default:
            break;
    }
}