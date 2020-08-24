import {facultyAPI} from "../api/api";

const SET_FACULTIES = "SET_FACULTIES";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";

let initialState = {
    allFaculties: [],

    //pagination
    currentPage: 1,
    totalCount: 0,
    pageSize: 20,

    isFetching: true
};

export const facultyReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_FACULTIES:
            return {
                ...state,
                allFaculties: action.faculties
            };
        case TOGGLE_ISFETCHING:
            return {
                ...state, isFetching: action.isFetching
            };

        default:
            return state;
    }
};

export const setFaculties = (faculties) => {
    return {
        type: SET_FACULTIES,
        faculties: faculties.data
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_ISFETCHING,
        isFetching: isFetching
    }
};

export const requestFaculties = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await facultyAPI.getFaculties()
        dispatch(setFaculties(response));
        dispatch(setIsFetching(false));
    };
};

export const createFaculty = (faculty) => {
    return async (dispatch) => {
        await facultyAPI.postFaculty(faculty);
        dispatch(requestFaculties());
    };
};

export const updateFaculty = (faculty, facultyId) => {
    return async (dispatch) => {
        await facultyAPI.putFaculty(faculty, facultyId)
        dispatch(requestFaculties());
    };
};

export const deleteFaculty = (facultyId) => {
    return async (dispatch) => {
        await facultyAPI.deleteFaculty(facultyId)
        dispatch(requestFaculties());
    };
};


export default facultyReducer;