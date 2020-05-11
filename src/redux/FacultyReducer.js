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

//          THUNK-CREATOR:
export const getFaculties = (something) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        facultyAPI.getFaculties()
            .then(response => {
                    dispatch(setFaculties(response));
                    dispatch(setIsFetching(false));
                }
            );
    };
};

export const addFacultyToDatabase = (faculty) => {
    return (dispatch) => {
        facultyAPI.postFaculty(faculty)
            .then(response =>{
                console.log(response);
                dispatch(getFaculties());
            }
            )
    };
};

export const updateFaculty = (faculty) => {
    return (dispatch) => {
        facultyAPI.putFaculty(faculty)
            .then(response =>{
                    console.log(response);
                    dispatch(getFaculties());
                }
            )
    };
};



export default facultyReducer;