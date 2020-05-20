import {studentGroupAPI} from "../api/api";

const SET_STUDENT_GROUPS = "SET_STUDENT_GROUPS";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";


let initialState = {
    allStudentGroups: [],
    isFetching: true
};

export const studentGroupReducer = (state = initialState, action) => {

    switch (action.type) {

        case TOGGLE_ISFETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case SET_STUDENT_GROUPS:
            return {
                ...state,
                allStudentGroups: action.allStudentGroups
            };

        default:
            return state;
    }
};

export const setStudentGroups = (allStudentGroups) => {
    return {
        type: SET_STUDENT_GROUPS,
        allStudentGroups
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_ISFETCHING,
        isFetching: isFetching
    }
};

export const getStudentGroups = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        studentGroupAPI.getStudentGroups()
            .then(response => {
                dispatch(setStudentGroups(response.data));
                dispatch(setIsFetching(false));
            });
    };
};

export const postStudentGroup = (studentGroup) => {
    return (dispatch) => {
        studentGroupAPI.postStudentGroup(studentGroup)
            .then(response => {
                dispatch(getStudentGroups());
            })
    }
};

export const putStudentGroup = (studentGroup) => {
    return (dispatch) => {
        studentGroupAPI.putStudentGroup(studentGroup)
            .then(response => {
                dispatch(getStudentGroups());
            })
    }
}

export default studentGroupReducer;