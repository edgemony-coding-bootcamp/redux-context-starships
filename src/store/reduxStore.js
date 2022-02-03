import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import thunk from 'redux-thunk'

import starshipReducer from './starShipReducer'
import errorReducer from "./errorReducer";

const defaultStore = {
    starships: {
        starships: [],
        loading: false
    },
    error: {
        error: false,
        message: ''
    },
}

const rootReducer = combineReducers({error: errorReducer,starships: starshipReducer })


export const store = createStore(rootReducer, defaultStore, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
