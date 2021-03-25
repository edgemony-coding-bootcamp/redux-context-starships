import {createContext, useReducer} from "react";
import  starshipReducer from './starshipsReducer'
import {FETCH_ALL_STARSHIPS_ERROR, FETCH_ALL_STARSHIPS_REQUEST, FETCH_ALL_STARSHIPS_SUCCESS} from "./constants";
import axios from "axios";
const defaultState = {
    loading: false,
    error: null,
    starships: []
}

export const StarShipsContext = createContext(defaultState)

export default ({children}) => {
    const [state, dispatch] = useReducer(starshipReducer, defaultState)

    const fetchAllShips = async () => {
        dispatch({type: FETCH_ALL_STARSHIPS_REQUEST})
        try {
            const { data: starships} = await axios.get("http://localhost:3000/starships")
            dispatch({type: FETCH_ALL_STARSHIPS_SUCCESS, payload: starships})
        } catch (e) {
            dispatch({type: FETCH_ALL_STARSHIPS_ERROR, payload: e})
        }
    }


    const value = {state, fetchAllShips}

    return (
        <StarShipsContext.Provider value={value}>
            {children}
        </StarShipsContext.Provider>
    )
}
