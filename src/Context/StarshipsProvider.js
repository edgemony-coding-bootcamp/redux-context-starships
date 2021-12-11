import {createContext, useContext, useReducer} from "react";
import starshipReducer from './starshipsReducer'
import {
    ADD_STARSHIP_ERROR, ADD_STARSHIP_REQUEST, ADD_STARSHIP_SUCCESS,
    DELETE_STARSHIP_ERROR, DELETE_STARSHIP_REQUEST,
    DELETE_STARSHIP_SUCCESS,
    FETCH_ALL_STARSHIPS_ERROR,
    FETCH_ALL_STARSHIPS_REQUEST,
    FETCH_ALL_STARSHIPS_SUCCESS
} from "./constants";
import axios from "axios";

const defaultState = {
    loading: false,
    error: null,
    starships: []
}

const StarShipsContext = createContext(defaultState)
export const useStarShipContext = () => useContext(StarShipsContext)

export default ({children}) => {
    const [state, dispatch] = useReducer(starshipReducer, defaultState)

    const fetchAllShips = async () => {
        dispatch({type: FETCH_ALL_STARSHIPS_REQUEST})
        try {
            const {data: starships} = await axios.get("http://localhost:3000/starships")
            dispatch({type: FETCH_ALL_STARSHIPS_SUCCESS, payload: starships})
        } catch (e) {
            dispatch({type: FETCH_ALL_STARSHIPS_ERROR, payload: e})
        }
    }

    const addShip = async (starship) => {
        dispatch({type: ADD_STARSHIP_REQUEST})
        try {
            const {data} = await axios.post('http://localhost:3000/starships', starship)
            dispatch({type: ADD_STARSHIP_SUCCESS, payload: data})
        } catch (e) {
            dispatch({type: ADD_STARSHIP_ERROR, payload: e})
        }
    }

    const deleteShip = async (id) => {
        dispatch({type: DELETE_STARSHIP_REQUEST})
        try {
            const {status} = await axios.delete(`http://localhost:3000/starships/${id}`)
            if (status === 200) {
                dispatch({type: DELETE_STARSHIP_SUCCESS, payload: id})
            } else {
                throw new Error('Delete Failed')
            }
        } catch (e) {
            dispatch({type: DELETE_STARSHIP_ERROR, payload: e})
        }
    }


    const value = {state, fetchAllShips, addShip, deleteShip}

    return (
        <StarShipsContext.Provider value={value}>
            {children}
        </StarShipsContext.Provider>
    )
}
