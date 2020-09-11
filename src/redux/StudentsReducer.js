import {studentCourseAPI, studentGroupAPI, studentSubgroupAPI} from "../api/api";
import {setMessage} from "./MessageReducer";

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

export const updateStudentGroup = (studentGroup, publicId) => {
    return async (dispatch) => {
        await studentGroupAPI.putStudentGroup(studentGroup, publicId);
        dispatch(requestStudentCourses());
    }
};

export const deleteStudentGroup = (studentGroup) => {
    return async (dispatch) => {
        await studentGroupAPI.delete(studentGroup);
        dispatch(requestStudentGroups());
    }
};

export const createStudentCourse = (studentCourse) => {
    return async (dispatch) => {
        try {
            await studentCourseAPI.postStudentCourse(studentCourse);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
        dispatch(requestStudentCourses());
    }
};

export const deleteStudentCourse = (courseId) => {
    return async (dispatch) => {
        await studentCourseAPI.deleteCourse(courseId);
        dispatch(requestStudentCourses());
    }
};

export const updateStudentCourse = (studentCourse, courseId) => {
    return async (dispatch) => {
        try {
            await studentCourseAPI.putStudentCourse(studentCourse, courseId);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
        dispatch(requestStudentCourses());
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