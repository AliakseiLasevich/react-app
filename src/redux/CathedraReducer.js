import {cathedraAPI, facultyAPI} from "../api/api";

const ADD_CATHEDRA = "ADD-CATHEDRA";
const SET_CATHEDRAS = "SET_CATHEDRAS";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";

let initialState = {
    allCathedras: [],
    isFetching: true
};

const cathedraReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_CATHEDRA:
            let newCathedra = {name: state.cathedraInputTextField};
            return {
                ...state,
                allCathedras: [...state.allCathedras, newCathedra],
                cathedraInputTextField: ""
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

export const setCathedras = (allCathedras) => {
    return {
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

export const getCathedrasWithFaculties = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        cathedraAPI.getCathedrasWithFaculties().then(response => {
            dispatch(setCathedras(response.data));
            dispatch(setIsFetching(false));
        });
    };
};

export const postCathedra = (cathedra) => {
    return (dispatch) => {
        cathedraAPI.postCathedra(cathedra).then(response => {
            console.log(response);
            dispatch(getCathedrasWithFaculties());
        })
    }
};

export const putCathedra = (cathedra) => {
    return (dispatch) => {
        cathedraAPI.putCathedra(cathedra).then(response => {
            console.log(response);
            dispatch(getCathedrasWithFaculties());
        })
    }
}
export default cathedraReducer;