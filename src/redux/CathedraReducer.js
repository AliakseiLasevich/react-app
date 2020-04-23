const ADD_CATHEDRA = "ADD-CATHEDRA";
const CATHEDRA_UPDATE_TEXT_FIELD = "CATHEDRA-UPDATE-TEXT-FIELD";

let initialState = {
    cathedraInputTextField: "",
    allCathedras: [
        {name: "Агрохимии"}
    ]
}

const cathedraReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATHEDRA:
            let cathedra = {name: action.cathedraName};
            state.cathedraInputTextField = "";
            state.allCathedras.push(cathedra);
            return state;
        case CATHEDRA_UPDATE_TEXT_FIELD:
            state.cathedraInputTextField = action.inputText;
            return state;
        default:
            return state;
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

export default cathedraReducer;