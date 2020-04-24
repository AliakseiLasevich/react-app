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
            let stateCopy = {...state};
            stateCopy.cathedraInputTextField = state.cathedraInputTextField;
            stateCopy.allCathedras = [...state.allCathedras];
            stateCopy.allCathedras.push(newCathedra)
            stateCopy.cathedraInputTextField = "";
            return stateCopy;

        case CATHEDRA_UPDATE_TEXT_FIELD:
            let stateCopy2 = {...state};
            stateCopy2.cathedraInputTextField = action.inputText;
            return stateCopy2;

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