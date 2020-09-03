import {cathedraAPI} from "../api/api";

const SET_CATHEDRAS = "SET_CATHEDRAS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    allCathedras: [],
    isFetching: true
};

const cathedraReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CATHEDRAS:
            return {
                ...state,
                allCathedras: action.allCathedras
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        default:
            return state;
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
        type: TOGGLE_IS_FETCHING,
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

export const createCathedra = (cathedra) => {
    return (dispatch) => {
        cathedraAPI.postCathedra(cathedra).then(response => {
            dispatch(getCathedrasWithFaculties());
        })
    }
};

export const updateCathedra = (cathedra, cathedraId) => {
    return (dispatch) => {
        cathedraAPI.putCathedra(cathedra, cathedraId).then(response => {
            dispatch(getCathedrasWithFaculties());
        })
    }
};

export const deleteCathedra = (cathedraId)=>{
    return dispatch => {
        cathedraAPI.deleteCathedra(cathedraId).then(response =>{
            dispatch(getCathedrasWithFaculties())
        })
    }
}
export default cathedraReducer;