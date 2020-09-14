import {studentCourseAPI, studentGroupAPI, studentSubgroupAPI} from "../api/api";
import {setMessage} from "./MessageReducer";

const SET_STUDENT_GROUPS = "SET_STUDENT_GROUPS";
const SET_STUDENT_COURSES = "SET_STUDENT_COURSES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";


let initialState = {
    allStudentCourses: [],
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
                allStudentCourses: action.allStudentCourses
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

export const deleteStudentCourse = (courseId) => {
    return async (dispatch) => {
        await studentCourseAPI.deleteCourse(courseId);
        dispatch(requestStudentCourses());
    }
};

//GROUPS

// export const requestStudentGroups = () => {
//     return async (dispatch) => {
//         dispatch(setIsFetching(true));
//         const response = await studentGroupAPI.getStudentGroups();
//         dispatch(setStudentGroups(response.data));
//         dispatch(setIsFetching(false));
//     };
// };

export const requestStudentGroupsByCourseId = (courseId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        // try {
        const response = await studentGroupAPI.getStudentGroupsByCourseId(courseId);
        const embedded = {groups: response.data, courseId};
        dispatch(setStudentGroups(embedded));

        // } catch (err) {
        //     dispatch(setMessage(err.response.data.message))
        // }
        dispatch(setIsFetching(false));

    };
};

export const createStudentGroup = (studentGroup) => {
    return async (dispatch) => {
        try {
            await studentGroupAPI.postStudentGroup(studentGroup);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const updateStudentGroup = (studentGroup, publicId) => {
    return async (dispatch) => {
        try {
            await studentGroupAPI.putStudentGroup(studentGroup, publicId);
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
    }
};

export const deleteStudentGroup = (publicId) => {
    return async (dispatch) => {
        try {
            await studentGroupAPI.deleteStudentGroup(publicId);
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
        } catch (err) {
            dispatch(setMessage(err.response.data.message))
        }
        dispatch(requestStudentCourses());
    }
};

export const updateStudentSubgroup = (subgroup, publicId) => {
    return async (dispatch) => {
        await studentSubgroupAPI.putStudentSubgroup(subgroup);
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