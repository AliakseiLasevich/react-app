import addCathedraReducer from "./addCathedraReducer";

const ADD_FACULTY = "ADD-FACULTY";
const FACULTY_UPDATE_TEXT_FIELD = "FACULTY-UPDATE-TEXT-FIELD";

export const addFacultyReducer = (state, action) => {
    if (action.type === ADD_FACULTY) {
        let faculty = {name: action.facultyName};
        state.facultyInputTextField = "";
        state.allFaculties.push(faculty);
    } else if (action.type === FACULTY_UPDATE_TEXT_FIELD) {
        state.facultyInputTextField = action.inputText;
    }

    return state;
}

export default addFacultyReducer;