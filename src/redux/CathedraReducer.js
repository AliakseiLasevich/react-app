const ADD_CATHEDRA = "ADD-CATHEDRA";
const CATHEDRA_UPDATE_TEXT_FIELD = "CATHEDRA-UPDATE-TEXT-FIELD";

let initialState = {
    cathedraInputTextField: "",
    allCathedras: [
        {name: "Агрохимии"},
        {name: "Экономики"}

    ]
}

const cathedraReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_CATHEDRA:
            let newCathedra = {name: state.cathedraInputTextField};
            return {
                ...state,
                allCathedras: [...state.allCathedras, newCathedra],
                cathedraInputTextField: ""
            };

        case CATHEDRA_UPDATE_TEXT_FIELD:
            return {
                ...state,
                cathedraInputTextField: action.inputText
            };

        default:
            return state;
    }
};

export const AddCathedraActionCreator = () => {
    return {
        type: ADD_CATHEDRA
    }
};

export const CathedraTextUpdateActionCreator = (text) => {
    return {
        type: CATHEDRA_UPDATE_TEXT_FIELD,
        inputText: text
    }
};

export default cathedraReducer;