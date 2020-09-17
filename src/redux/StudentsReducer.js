import {studentCourseAPI, studentGroupAPI, studentSubgroupAPI} from "../api/api";
import {setMessage} from "./MessageReducer";

const SET_STUDENT_GROUPS = "SET_STUDENT_GROUPS";
const SET_STUDENT_SUBGROUPS = "SET_STUDENT_SUBGROUPS";
const SET_STUDENT_COURSES = "SET_STUDENT_COURSES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


let initialState = {
    studentCourses: [],
    studentGroups: [],
    studentSubgroups: [],
    isFetching: true,
};

export const studentGroupReducer = (state = initialState, action) => {

    switch (action.type) {

        case TOGGLE_IS_FETCHING:
            state.isFetching = action.isFetching;
            return state;

        case SET_STUDENT_COURSES:
            state.studentCourses = action.studentCourses;
            return state;

        case SET_STUDENT_GROUPS:
            state.studentGroups[action.courseId] = action.studentGroups;
            return state;

        case SET_STUDENT_SUBGROUPS:
            state.studentSubgroups = {...state.studentSubgroups}
            state.studentSubgroups[action.groupId] = action.studentSubgroups;
            return state;

        default:
            return state;
    }
};

export const setStudentGroups = (studentGroups, courseId) => {
    return {
        type: SET_STUDENT_GROUPS,
        studentGroups,
        courseId
    }
};

export const setStudentCourses = (studentCourses) => {
    return {
        type: SET_STUDENT_COURSES,
        studentCourses
    }
};

export const setStudentSubgroups = (studentSubgroups, groupId) => {
    return {
        type: SET_STUDENT_SUBGROUPS,
        studentSubgroups,
        groupId
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
            dispatch(requestStudentCourses());
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const updateStudentCourse = (studentCourse, courseId) => {
    return async (dispatch) => {
        try {
            await studentCourseAPI.putStudentCourse(studentCourse, courseId);
            dispatch(requestStudentCourses());
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const deleteStudentCourse = (courseId) => {
    return async (dispatch) => {
        await studentCourseAPI.deleteCourse(courseId);
        dispatch(requestStudentCourses());
    }
};

//GROUPS
export const requestStudentGroupsByCourseId = (courseId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await studentGroupAPI.getStudentGroupsByCourseId(courseId);
            dispatch(setStudentGroups(response.data, courseId));
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
export const createStudentSubgroup = (subgroup) => {
    return async (dispatch) => {
        try {
            await studentSubgroupAPI.postStudentSubgroup(subgroup);
            dispatch(requestStudentSubgroupsByGroupId(subgroup.studentGroupId))
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const updateStudentSubgroup = (subgroup, publicId) => {
    return async (dispatch) => {
        try {
            await studentSubgroupAPI.putStudentSubgroup(subgroup, publicId);
            dispatch(requestStudentSubgroupsByGroupId(subgroup.studentGroupId))
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const deleteStudentSubgroup = (subgroupId, studentGroupId) => {
    return async (dispatch) => {
        try {
            await studentSubgroupAPI.deleteStudentSubgroup(subgroupId);
            dispatch(requestStudentSubgroupsByGroupId(studentGroupId))
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const requestStudentSubgroupsByGroupId = (groupId) => {
    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true));
            const response = await studentSubgroupAPI.getStudentSubgroupByGroupId(groupId);
            dispatch(setStudentSubgroups(response.data, groupId));
            dispatch(setIsFetching(false));
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    };
};

export default studentGroupReducer;