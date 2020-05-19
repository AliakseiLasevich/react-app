import {specialtyAPI} from "../api/api";

const SET_SPECIALTIES = "SET_SPECIALTIES";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";

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

        case TOGGLE_ISFETCHING:
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
        type: TOGGLE_ISFETCHING,
        isFetching: isFetching
    }
};

export const getSpecialties = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        specialtyAPI.getSpecialties()
            .then(response => {
                    console.log(response);
                    dispatch(setSpecialties(response));
                    dispatch(setIsFetching(false));
                }
            );
    };
};

export const postSpecialty = (specialty) => {
    return (dispatch) => {
        specialtyAPI.postSpecialty(specialty)
            .then(response => {
                    dispatch(getSpecialties());
                }
            )
    };
};

export const putSpecialty = (specialty) => {
    return (dispatch) => {
        specialtyAPI.putSpecialty(specialty)
            .then(response => {
                    dispatch(getSpecialties());
                }
            )
    };
};

export default specialtyReducer;