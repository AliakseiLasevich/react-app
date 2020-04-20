let rerenderEntireTree = () => {
    console.log("state changed");
}

let state = {
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

};

export let addFaculty = (facultyName) => {
    let faculty = {name: facultyName};
    state.allFaculties.push(faculty);
    rerenderEntireTree(state);
};

export let redrawTextInput = (facultyText) => {
    state.inputTextField = facultyText;
    rerenderEntireTree(state);
};

export let subscribe = (observer) => {
    rerenderEntireTree = observer;
}

export default state;