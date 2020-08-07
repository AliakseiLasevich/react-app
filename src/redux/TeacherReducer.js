import {teacherAPI} from "../api/api";


const SET_TEACHERS = "SET_TEACHERS";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";


let initialState = {
    allTeachers: [
        {
            name: "",
            id: 0,
            cathedra: ""
        }
    ],

    isFetching: true
};

export const teacherReducer = (state = initialState, action) => {

    switch (action.type) {

        case TOGGLE_ISFETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case SET_TEACHERS:
            return {
                ...state,
                allTeachers: action.allTeachers
            };

        default:
            return state;
    }
};

export const setTeachers = (allTeachers) => {
    return {
        type: SET_TEACHERS,
        allTeachers
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_ISFETCHING,
        isFetching: isFetching
    }
};

export const requestAllTeachers = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        teacherAPI.getTeachers().then(response => {
            dispatch(setTeachers(response.data));
            dispatch(setIsFetching(false));
        });
    };
};
export const createTeacher = (teacher) => {
    return (dispatch) => {
        teacherAPI.postTeacher(teacher).then(response => {
            dispatch(requestAllTeachers());
        })
    }
};

export const updateTeacher = (teacher, teacherId) => {
    return (dispatch) => {
        teacherAPI.putTeacher(teacher, teacherId)
            .then(response => {
                dispatch(requestAllTeachers());
            })
    }
};

export const deleteTeacher = (teacher) => {
    return (dispatch) => {
        teacherAPI.deleteTeacher(teacher).then(response => {
            dispatch(requestAllTeachers());
        })
    }
};


export default teacherReducer;