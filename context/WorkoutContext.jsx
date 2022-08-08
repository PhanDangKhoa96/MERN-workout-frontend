import { createContext, useReducer } from "react";
import { workoutReducer } from "../reducer/workoutReducer";

export const WorkoutContext = createContext()

export const WorkoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, { workout: null })

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }} >
            {children}
        </WorkoutContext.Provider>
    )
}