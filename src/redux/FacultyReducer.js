const ADD_FACULTY = "ADD-FACULTY";
const FACULTY_UPDATE_TEXT_FIELD = "FACULTY-UPDATE-TEXT-FIELD";

let initialState = {
    allFaculties: [
        {name: "Агрономический"},
        {name: "Защиты растений"},
        {name: "Ветеринарной медицины"},
        {name: "Биотехнологический"},
        {name: "Инженерно-технологический"},
        {name: "Экономический факультет"},
        {name: "Бухгалтерского учёта"},
    ],
    facultyInputTextField: "",

}

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

export default facultyReducer;