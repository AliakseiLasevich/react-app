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

// TODO setIsFetching() from another reducer?
export const loadTeachers = () => {
    return (dispatch) => {
        // dispatch(setIsFetching(true));
        teacherAPI.getTeachers().then(response => {
            dispatch(setTeachers(response.data));
            // dispatch(setIsFetching(false));
        });
    };
};
export const postTeacher = (teacher) => {
    return (dispatch) => {
        teacherAPI.postTeacher(teacher).then(response => {
            console.log(response);
            dispatch(loadTeachers());
        })
    }
};

export const putTeacher = (teacher) => {
    return (dispatch) => {
        teacherAPI.putTeacher(teacher).then(response => {
            console.log(response);
            dispatch(loadTeachers());
        })
    }
}

export default teacherReducer;