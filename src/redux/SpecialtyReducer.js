import {specialtyAPI} from "../api/api";

const SET_SPECIALTIES = "SET_SPECIALTIES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    allSpecialties: [],
    isFetching: true
};

export const specialtyReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SPECIALTIES:
            return {
                ...state,
                allSpecialties: action.allSpecialties
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };

        default:
            return state;
    }
};

export const setSpecialties = (specialties) => {
    return {
        type: SET_SPECIALTIES,
        allSpecialties: specialties.data
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};

export const requestSpecialties = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await specialtyAPI.getSpecialties();
        dispatch(setSpecialties(response));
        dispatch(setIsFetching(false));
    };
};

export const createSpecialty = (specialty) => {
    return async (dispatch) => {
        await specialtyAPI.postSpecialty(specialty)
        dispatch(requestSpecialties());
    };
};

export const updateSpecialty = (specialty, publicId) => {
    return async (dispatch) => {
        await specialtyAPI.putSpecialty(specialty, publicId);
        dispatch(requestSpecialties());
    };
};

export const deleteSpecialty = (publicId) => {
    return async (dispatch) => {
        await specialtyAPI.deleteSpecialty(publicId);
        dispatch(requestSpecialties());
    };
};



export default specialtyReducer;