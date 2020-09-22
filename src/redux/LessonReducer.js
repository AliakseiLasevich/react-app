import {lessonsAPI} from "../api/api";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_LESSONS = "SET_LESSONS";

let initialState = {
    lessons: [],
    isFetching: true
};

export const lessonReducer = (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case SET_LESSONS:
            return {
                ...state,
                lessons: action.lessons
            };

        default:
            return state;
    }
};


export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};

const setLessons = (lessons) => {
    return {
        type: SET_LESSONS,
        lessons: lessons
    }
};

export const requestLessonsByCourseAndDateRange = (courseId, firstDate, lastDate) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await lessonsAPI.getLessonsByCourseAndDateRange(courseId, firstDate, lastDate);
        dispatch(setLessons(response.data));
        dispatch(setIsFetching(false));
    }
};


export default lessonReducer;