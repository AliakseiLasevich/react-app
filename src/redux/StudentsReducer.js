import {studentCourseAPI, studentGroupAPI, studentSubgroupAPI} from "../api/api";

const SET_STUDENT_GROUPS = "SET_STUDENT_GROUPS";
const SET_STUDENT_COURSES = "SET_STUDENT_COURSES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


let initialState = {
    allStudentCourses: [],
    allStudentGroups: [],
    isFetching: true,
};

export const studentGroupReducer = (state = initialState, action) => {

    switch (action.type) {

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case SET_STUDENT_COURSES:
            return {
                ...state,
                allStudentCourses: action.allStudentCourses
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

export const setStudentCourses = (allStudentCourses) => {
    return {
        type: SET_STUDENT_COURSES,
        allStudentCourses
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

export const requestStudentCourses = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await studentCourseAPI.getAllStudentCourses();
        dispatch(setStudentCourses(response.data));
        dispatch(setIsFetching(false));
    };
};

export const createStudentGroup = (studentGroup) => {
    return async (dispatch) => {
        await studentGroupAPI.postStudentGroup(studentGroup);
        dispatch(requestStudentCourses());
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

export const postStudentCourse = (studentCourse) => {
    return async (dispatch) => {
        await studentCourseAPI.postStudentCourse(studentCourse);
        dispatch(requestStudentGroups());
    }
};


export const createStudentSubgroup = (subgroup) => {
    return async (dispatch) => {
        await studentSubgroupAPI.postStudentSubgroup(subgroup);
        dispatch(requestStudentCourses());
    }
};

export const updateStudentSubgroup = (subgroup, publicId) => {
    return async (dispatch) => {
        await studentSubgroupAPI.putStudentSubgroup(subgroup);
        dispatch(requestStudentGroups());
    }
};

export default studentGroupReducer;