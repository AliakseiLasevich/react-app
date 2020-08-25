import {studentGroupAPI} from "../api/api";

const SET_STUDENT_GROUPS = "SET_STUDENT_GROUPS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


let initialState = {
    allStudentGroups: [],
    isFetching: true
};

export const studentGroupReducer = (state = initialState, action) => {

    switch (action.type) {

        case TOGGLE_IS_FETCHING:
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
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};

export const requestStudentGroups = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await studentGroupAPI.getStudentGroups();
        dispatch(setStudentGroups(response.data));
        dispatch(setIsFetching(false));
    };
};

export const postStudentGroup = (studentGroup) => {
    return async (dispatch) => {
        await studentGroupAPI.postStudentGroup(studentGroup);
        dispatch(requestStudentGroups());
    }
};

export const putStudentGroup = (studentGroup) => {
    return async (dispatch) => {
        await studentGroupAPI.putStudentGroup(studentGroup);
        dispatch(requestStudentGroups());
    }
};

export const deleteStudentGroup = (studentGroup) => {
    return async (dispatch) => {
        await studentGroupAPI.delete(studentGroup);
        dispatch(requestStudentGroups());
    }
};

export default studentGroupReducer;