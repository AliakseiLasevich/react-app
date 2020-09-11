const SET_ID_TO_DELETE = "SET_ID_TO_DELETE";
const SET_DELETE_MESSAGE = "SET_DELETE_MESSAGE";
const SET_DELETE_FUNCTION = "SET_DELETE_FUNCTION";

let initialState = {
    idToDelete: "",
    message: "",
    deleteFunction: ()=>{}
};

const deleteReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_ID_TO_DELETE:
            return {
                ...state,
                idToDelete: action.idToDelete
            };

        case SET_DELETE_MESSAGE:
            return {
                ...state,
                message: action.message
            };
  case SET_DELETE_FUNCTION:
            return {
                ...state,
                deleteFunction: action.deleteFunction
            };

        default:
            return state;
    }
};

export const setDeleteMessage = (message) => {
    return {
        type: SET_DELETE_MESSAGE,
        message: message
    }
};

export const setIdToDelete = (idToDelete) => {
    return {
        type: SET_ID_TO_DELETE,
        idToDelete: idToDelete
    }
};

export const resetIdToDelete = () => {
    return {
        type: SET_ID_TO_DELETE,
        idToDelete: ""
    }
};

export const setDeleteFunction = (deleteFunction) => {
    return {
        type: SET_DELETE_FUNCTION,
        deleteFunction: deleteFunction
    }
};

export default deleteReducer;