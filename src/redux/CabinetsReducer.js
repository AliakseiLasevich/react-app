import {cabinetAPI} from "../api/api";
import {requestBuildings} from "./BuildingsReducer";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    allCabinets: [],
    isFetching: true
};

const cabinetsReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
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

export const createCabinet = (cabinet) => {
    return async (dispatch) => {
        await cabinetAPI.postCabinet(cabinet);
        dispatch(requestBuildings());
    }
};

export const updateCabinet = (cabinet, publicId) => {
    return async (dispatch) => {
        await cabinetAPI.putCabinet(cabinet, publicId);
        dispatch(requestBuildings());
    }
};

export const deleteCabinet = (cabinetId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        await cabinetAPI.deleteCabinet(cabinetId);
        dispatch(requestBuildings());
        dispatch(setIsFetching(false));
    }
};

export default cabinetsReducer;