import {studentCourseAPI, studentGroupAPI, studentSubgroupAPI} from "../api/api";
import {setMessage} from "./MessageReducer";

const SET_STUDENT_GROUPS = "SET_STUDENT_GROUPS";
const SET_STUDENT_COURSES = "SET_STUDENT_COURSES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


let initialState = {
    studentCourses: [],
    studentGroups: [],
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
                studentCourses: action.studentCourses
            };

        case SET_STUDENT_GROUPS:
            const courseId = action.studentGroups.courseId;
            const groups = {...state.studentGroups};
            groups[courseId] = action.studentGroups.groups;

            return {
                ...state,
                studentGroups: groups
            };

        default:
            return state;
    }
};

export const setStudentGroups = (studentGroups) => {
    return {
        type: SET_STUDENT_GROUPS,
        studentGroups
    }
};

export const setStudentCourses = (studentCourses) => {
    return {
        type: SET_STUDENT_COURSES,
        studentCourses
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};

//COURSES
export const requestStudentCourses = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await studentCourseAPI.getAllStudentCourses();
        dispatch(setStudentCourses(response.data));
        dispatch(setIsFetching(false));
    };
};

export const createStudentCourse = (studentCourse) => {
    return async (dispatch) => {
        try {
            await studentCourseAPI.postStudentCourse(studentCourse);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const updateStudentCourse = (studentCourse, courseId) => {
    return async (dispatch) => {
        try {
            await studentCourseAPI.putStudentCourse(studentCourse, courseId);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const deleteStudentCourse = (courseId) => {
    return async (dispatch) => {
        await studentCourseAPI.deleteCourse(courseId);
    }
};

//GROUPS
export const requestStudentGroupsByCourseId = (courseId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await studentGroupAPI.getStudentGroupsByCourseId(courseId);
            const responseWithCourseId = {groups: response.data, courseId};
            dispatch(setStudentGroups(responseWithCourseId));
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
        dispatch(setIsFetching(false));
    };
};

export const createStudentGroup = (studentGroup) => {
    return async (dispatch) => {
        try {
            await studentGroupAPI.postStudentGroup(studentGroup);
            dispatch(requestStudentGroupsByCourseId(studentGroup.courseId))
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const updateStudentGroup = (studentGroup, publicId) => {
    return async (dispatch) => {
        try {
            await studentGroupAPI.putStudentGroup(studentGroup, publicId);
            dispatch(requestStudentGroupsByCourseId(studentGroup.courseId))
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const deleteStudentGroup = (publicId, courseId) => {
    return async (dispatch) => {
        try {
            await studentGroupAPI.deleteStudentGroup(publicId);
            dispatch(requestStudentGroupsByCourseId(courseId))
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

//SUBGROUPS
export const createStudentSubgroup = (subgroup, courseId) => {
    return async (dispatch) => {
        try {
            await studentSubgroupAPI.postStudentSubgroup(subgroup);
            dispatch(requestStudentGroupsByCourseId(courseId));
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const updateStudentSubgroup = (subgroup, publicId) => {
    return async (dispatch) => {
        try {
            await studentSubgroupAPI.putStudentSubgroup(subgroup, publicId);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const deleteStudentSubgroup = (subgroupId) => {
    return async (dispatch) => {
        try {
            await studentSubgroupAPI.deleteStudentSubgroup(subgroupId);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export default studentGroupReducer;