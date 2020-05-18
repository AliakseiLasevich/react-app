import {buildingAPI, cabinetAPI} from "../api/api";

const SET_CABINETS = "SET_CABINETS";
const SET_BUILDINGS = "SET_BUILDINGS";
const TOGGLE_ISFETCHING = "TOGGLE_ISFETCHING";

let initialState = {

    allBuildings: [],
    allCabinets: [],
    isFetching: true
};

const cabinetsBuildingsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CABINETS:
            return {
                ...state,
                allCabinets: action.cabinets
            };

        case SET_BUILDINGS:
            return {
                ...state,
                allBuildings: action.buildings
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

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_ISFETCHING,
        isFetching: isFetching
    }
};

export const setCabinets = (cabinets) => {
    return {
        type: SET_CABINETS,
        cabinets
    }
};

export const setBuildings = (buildings) => {
    return {
        type: SET_BUILDINGS,
        buildings
    }
};

export const getBuildings = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        buildingAPI.getBuildings()
            .then(response =>
                dispatch(setBuildings(response.data)));
        dispatch(setIsFetching(false));
    }
};

export const getCabinetsByBuildingId = (buildingId) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        cabinetAPI.getCabinetsByBuildingId(buildingId)
            .then(response => dispatch(setCabinets(response.data)));
        dispatch(setIsFetching(false));
    }
};

export default cabinetsBuildingsReducer;