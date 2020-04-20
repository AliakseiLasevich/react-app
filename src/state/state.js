import {rerenderEntireTree} from "../render";

let state = {
    allFaculties: [
        {name: "Агрономический"},
        {name: "Защиты растений"},
        {name: "Ветеринарной медицины"},
        {name: "Биотехнологический"},
        {name: "Инженерно-технологический"},
        {name: "Экономический факультет"},
        {name: "Бухгалтерского учёта"},
    ]

};

export let addFaculty = (facultyName) => {
    let faculty = {name: facultyName};
    state.allFaculties.push(faculty);
    rerenderEntireTree(state);
};

export default state;