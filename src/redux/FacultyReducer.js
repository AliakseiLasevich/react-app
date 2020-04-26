const ADD_FACULTY = "ADD-FACULTY";
const FACULTY_UPDATE_TEXT_FIELD = "FACULTY-UPDATE-TEXT-FIELD";
const SET_FACULTIES = "SET_FACULTIES";

let initialState = {
    allFaculties: [ ],
    facultyInputTextField: "",
};

export const facultyReducer = (state = initialState, action) => {
    switch (action.type) {

        case  ADD_FACULTY:
            let newFaculty = {name: state.facultyInputTextField};
            return {
                ...state,
                allFaculties: [...state.allFaculties, newFaculty],
                facultyInputTextField: ""
            };

        case FACULTY_UPDATE_TEXT_FIELD:
            return {
                ...state,
                facultyInputTextField: action.inputText
            };

        case SET_FACULTIES:
            return{
                ...state,
                allFaculties: action.faculties
            }

        default:
            return state;
    }
};

export const addFacultyActionCreator = () => {
    return {
        type: ADD_FACULTY
    }
};

export const FacultyTextUpdateActionCreator = (text) => {
    return {
        type: FACULTY_UPDATE_TEXT_FIELD,
        inputText: text
    }
};

export const setFaculties = (faculties) =>{
    return{
        type: SET_FACULTIES,
        faculties: faculties.data
    }
}

export default facultyReducer;