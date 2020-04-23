import addFacultyReducer from "./addFacultyReducer";
import addCathedraReducer from "./addCathedraReducer";

const ADD_FACULTY = "ADD-FACULTY";
const FACULTY_UPDATE_TEXT_FIELD = "FACULTY-UPDATE-TEXT-FIELD";
const ADD_CATHEDRA = "ADD-CATHEDRA";
const CATHEDRA_UPDATE_TEXT_FIELD = "CATHEDRA-UPDATE-TEXT-FIELD";

let store = {
    _state: {
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
        cathedraInputTextField: "",
        allCathedras: [
            {name: "Агрохимии"}
        ],

    },
    _callSubscriber() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state = addFacultyReducer(this._state, action);
        this._state = addCathedraReducer(this._state, action);
        this._callSubscriber(this._state);
    }
};

export const AddCathedraActionCreator = (text) => {
    return {
        type: ADD_CATHEDRA,
        cathedraName: text
    }
};

export const CathedraTextUpdateActionCreator = (text) => {
    return {
        type: CATHEDRA_UPDATE_TEXT_FIELD,
        inputText: text
    }
};

export const addFacultyActionCreator = (text) => {
    return {
        type: ADD_FACULTY,
        facultyName: text
    }
};

export const FacultyTextUpdateActionCreator = (text) => {
    return {
        type: FACULTY_UPDATE_TEXT_FIELD,
        inputText: text
    }
};

export default store;
window.store = store;
