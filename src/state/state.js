const ADD_FACULTY = "ADD-FACULTY";
const ADD_CATHEDRA = "ADD-CATHEDRA";
const FACULTY_UPDATE_TEXT_FIELD = "FACULTY-UPDATE-TEXT-FIELD";
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
        if (action.type === ADD_FACULTY) {
            let faculty = {name: action.facultyName};
            this._state.facultyInputTextField = "";
            this._state.allFaculties.push(faculty);
            this._callSubscriber(this._state);
        } else if (action.type === FACULTY_UPDATE_TEXT_FIELD) {
            this._state.facultyInputTextField = action.inputText;
            this._callSubscriber(this._state);
        } else if (action.type === CATHEDRA_UPDATE_TEXT_FIELD) {
            this._state.cathedraInputTextField = action.inputText;
            this._callSubscriber(this._state);
        } else if (action.type === ADD_CATHEDRA) {
            let cathedra = {name: action.cathedraName};
            this._state.cathedraInputTextField = "";
            this._state.allCathedras.push(cathedra);
            this._callSubscriber(this._state);
        }
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
