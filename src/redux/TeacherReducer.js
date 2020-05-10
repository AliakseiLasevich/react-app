import {teacherAPI} from "../api/api";
import {setIsFetching} from "./CathedraReducer";

const ADD_TEACHER = "ADD_TEACHER";
const SET_TEACHERS = "SET_TEACHERS";

const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";


let initialState = {
    allTeachers: [
        {name: "",
        id: 0,
        cathedra: "a"}
        ],

    isFetching: true
};

export const teacherReducer = (state = initialState, action) => {

    switch (action.type) {

        case  ADD_TEACHER:
            let newTeacher = {
                name: state.inputField.name,
                lastName: state.inputField.lastName,
                cathedra: state.inputField.cathedra
            };

            return {
                ...state,
                allTeachers: [...state.allTeachers, newTeacher],
                inputField: {name: "", lastName: "", cathedra: ""}
            };


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

export const addTeacherActionCreator = () => {
    return {
        type: ADD_TEACHER
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
        dispatch(setIsFetching(true));
        teacherAPI.getTeachers().then(response => {
            dispatch(setTeachers(response.data));
            dispatch(setIsFetching(false));
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

export default teacherReducer;