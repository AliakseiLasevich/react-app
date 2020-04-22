let store ={
    _state : {
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
    getState(){
        debugger
      return this._state;
    },
    _callSubscriber() {
    },
    addFaculty (facultyName) {
        let faculty = {name: facultyName};
        this._state.allFaculties.push(faculty);
        this._callSubscriber(this._state);
    },
    redrawTextInput  (facultyText) {
        debugger
        this._state.inputTextField = facultyText;
        this._callSubscriber(this._state);
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    }
};

export default store;