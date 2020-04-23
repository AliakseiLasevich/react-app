import addCathedraReducer from "./addCathedraReducer";

const ADD_FACULTY = "ADD-FACULTY";
const FACULTY_UPDATE_TEXT_FIELD = "FACULTY-UPDATE-TEXT-FIELD";

export const addFacultyReducer = (state, action) => {
    switch (action.type) {

        case  ADD_FACULTY:
            let faculty = {name: action.facultyName};
            state.facultyInputTextField = "";
            state.allFaculties.push(faculty);
            return state;

        case FACULTY_UPDATE_TEXT_FIELD:
            state.facultyInputTextField = action.inputText;
            return state;
        default:
            return state;
    }
}

export default addFacultyReducer;