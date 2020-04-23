const ADD_CATHEDRA = "ADD-CATHEDRA";
const CATHEDRA_UPDATE_TEXT_FIELD = "CATHEDRA-UPDATE-TEXT-FIELD";

const addCathedraReducer = (state, action) => {

    if (action.type === CATHEDRA_UPDATE_TEXT_FIELD) {
        state.cathedraInputTextField = action.inputText;
    } else if (action.type === ADD_CATHEDRA) {
        let cathedra = {name: action.cathedraName};
        state.cathedraInputTextField = "";
        state.allCathedras.push(cathedra);
    }
    return state;
}

export default addCathedraReducer;