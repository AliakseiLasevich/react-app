import {teacherAPI} from "../api/api";
import {setIsFetching} from "./CathedraReducer";

const ADD_TEACHER = "ADD_TEACHER";
const SET_TEACHERS = "SET_TEACHERS";
const TEACHER_NAME_TEXT_FIELD = "TEACHER_NAME_TEXT_FIELD";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";


let initialState = {
    allTeachers: [
        {name: "",
        id: 0,
        cathedra: "a"}
        ],

    inputField: {
        name: "",
        lastName: "",
        cathedra: ""
    },
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

        case TEACHER_NAME_TEXT_FIELD:
            return {
                ...state,
                inputField: {
                    name: action.name,
                }
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

export const updateNameInputField = (name) => {
    return {
        type: TEACHER_NAME_TEXT_FIELD,
        name: name
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


export default teacherReducer;