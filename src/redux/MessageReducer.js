const SET_MESSAGE = "SET_MESSAGE";
const RESET_MESSAGE = "RESET_MESSAGE";


let initialState = {
    message: ""
};

const messageReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                message: action.message
            };
            case RESET_MESSAGE:
            return {
                ...state,
                message: ""
            };
        default:
            return state;
    }
};

export const setMessage = (message) => {
    return {
        type: SET_MESSAGE,
        message: message
    }
};

export const resetMessage = () => {
    return {
        type: SET_MESSAGE,
        message: ""
    }
};

export default messageReducer;