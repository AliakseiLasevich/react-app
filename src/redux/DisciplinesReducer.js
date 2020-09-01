import {disciplinesAPI} from "../api/api";

const SET_DISCIPLINES = "SET_DISCIPLINES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    allDisciplines: [],
    isFetching: true
};

const disciplinesReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_DISCIPLINES:
            return {
                ...state,
                allDisciplines: action.disciplines
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };

        default:
            return state;
    }
};

export const setDisciplines = (disciplines) => {
    return {
        type: SET_DISCIPLINES,
        disciplines: disciplines
    }
};
export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};
export const requestDisciplines = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await disciplinesAPI.getDisciplines();
        dispatch(setDisciplines(response.data));
        dispatch(setIsFetching(false));
    };
};
export const createDiscipline = (discipline) => {
    return async (dispatch) => {
        await disciplinesAPI.postDiscipline(discipline);
        dispatch(requestDisciplines());
    };
};
export const updateDiscipline = (discipline, disciplineId) => {
    return async (dispatch) => {
        await disciplinesAPI.putDiscipline(discipline, disciplineId)
        dispatch(requestDisciplines());
    };
};
export const deleteDiscipline = (disciplineId) => {
    return async (dispatch) => {
        await disciplinesAPI.deleteDiscipline(disciplineId);
        dispatch(requestDisciplines());
    };
};


export default disciplinesReducer;