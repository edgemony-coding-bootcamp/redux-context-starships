import {DISCARD_ERROR, DISPLAY_ERROR} from "./constants";
const initialErrorState = {
    error: false,
    message: ''
}


export default (state = initialErrorState, action) => {
    switch (action.type) {
        case DISPLAY_ERROR:
            return {
                error: true,
                message: action.payload
            }

        case DISCARD_ERROR:
            return {
                error: false,
                message: ''
            }

        default:
            return state
    }
}
