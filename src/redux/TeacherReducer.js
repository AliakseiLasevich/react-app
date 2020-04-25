const ADD_TEACHER = "ADD_TEACHER";
const TEACHER_NAME_TEXT_FIELD = "TEACHER_NAME_TEXT_FIELD";
const TEACHER_LASTNAME_TEXT_FIELD = "TEACHER_LASTNAME_TEXT_FIELD";
const TEACHER_CATHEDRA_TEXT_FIELD = "TEACHER_CATHEDRA_TEXT_FIELD";

let initialState = {
    allTeachers: [
        {id: 1, name: "Иван", lastName: "Иванов", cathedra: "Экономики"},
        {id: 2, name: "Пётр", lastName: "Петров", cathedra: "Растениеводства"},
        {id: 3, name: "Мария", lastName: "Сидорова", cathedra: "Информатики"},


    ],
    inputField: {
        name: "",
        lastName: "",
        cathedra: ""
    }
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

        // case TEACHER_LASTNAME_TEXT_FIELD:
        //     return {
        //         ...state,
        //         inputField: {
        //             lastName: action.lastName,
        //         }
        //     };
        //
        // case TEACHER_CATHEDRA_TEXT_FIELD:
        //     return {
        //         ...state,
        //         inputField: {
        //             cathedra: action.cathedra,
        //         }
        //     };

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

// export const updateLastNameInputField = (lastName) => {
//     return {
//         type: TEACHER_LASTNAME_TEXT_FIELD,
//         lastName: lastName
//     }
// };
//
// export const updateCathedraInputField = (cathedra) => {
//     return {
//         type: TEACHER_CATHEDRA_TEXT_FIELD,
//         cathedra: cathedra
//     }
// };

export default teacherReducer;