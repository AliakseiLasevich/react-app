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
        inputTextField: ""
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
        if (action.type === "ADD-FACULTY") {
            let faculty = {name: action.facultyName};
            this._state.allFaculties.push(faculty);
            this._callSubscriber(this._state);
        } else if (action.type === "REDRAW-TEXT-INPUT") {
            this._state.inputTextField = action.facultyText;
            this._callSubscriber(this._state);
        }
    }
};

export default store;
window.store = store;