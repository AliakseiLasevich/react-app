import {cabinetAPI} from "../api/api";
import {setMessage} from "./MessageReducer";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_CABINETS = "SET_CABINETS";


let initialState = {
    allCabinets: [],
    isFetching: true,
};

const cabinetsReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_CABINETS:
            return {
                ...state,
                allCabinets: action.cabinets
            };

        default:
            return state;
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};


export const setCabinets = (cabinets) => {
    return {
        type: SET_CABINETS,
        cabinets
    }
};

export const requestCabinets = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await cabinetAPI.getCabinets();
        dispatch(setCabinets(response.data))
        dispatch(setIsFetching(false))
    }
};

export const createCabinet = (cabinet) => {
    return async (dispatch) => {
        try {
            await cabinetAPI.postCabinet(cabinet);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
        dispatch(requestCabinets());
    }
};

export const updateCabinet = (cabinet, publicId) => {
    return async (dispatch) => {
        await cabinetAPI.putCabinet(cabinet, publicId);
        dispatch(requestCabinets());
    }
};

export const deleteCabinet = (cabinetId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        await cabinetAPI.deleteCabinet(cabinetId);
        dispatch(requestCabinets());
        dispatch(setIsFetching(false));
    }
};

export default cabinetsReducer;