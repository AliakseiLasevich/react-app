import addFacultyReducer from "./addFacultyReducer";
import addCathedraReducer from "./addCathedraReducer";

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





export default store;
window.store = store;
