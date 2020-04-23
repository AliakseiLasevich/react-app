const ADD_CATHEDRA = "ADD-CATHEDRA";
const CATHEDRA_UPDATE_TEXT_FIELD = "CATHEDRA-UPDATE-TEXT-FIELD";

const addCathedraReducer = (state, action) => {
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

export default addCathedraReducer;