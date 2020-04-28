const ADD_CATHEDRA = "ADD-CATHEDRA";
const SET_CATHEDRAS = "SET_CATHEDRAS";
const CATHEDRA_UPDATE_TEXT_FIELD = "CATHEDRA-UPDATE-TEXT-FIELD";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";

let initialState = {
    cathedraInputTextField: "",
    allCathedras: [],
    isFetching: true
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

        case SET_CATHEDRAS:
            return {
                ...state,
                allCathedras: action.allCathedras
            };

        case TOGGLE_ISFETCHING:
            return {
                ...state,
                isFetching: action.isFetching
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

export const setCathedras = (allCathedras) => {
    return{
        type: SET_CATHEDRAS,
        allCathedras: allCathedras
    }
};

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_ISFETCHING,
        isFetching: isFetching
    }
};

export default cathedraReducer;