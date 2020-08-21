import {buildingAPI} from "../api/api";

const SET_BUILDINGS = "SET_BUILDINGS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    allBuildings: [],
    isFetching: true
};

const buildingsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_BUILDINGS:
            return {
                ...state,
                allBuildings: action.buildings
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

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    }
};

export const setBuildings = (buildings) => {
    return {
        type: SET_BUILDINGS,
        buildings
    }
};

export const requestBuildings = () => {
        return async (dispatch) => {
            dispatch(setIsFetching(true));
            const response = await buildingAPI.getBuildings();
            dispatch(setBuildings(response.data));
            dispatch(setIsFetching(false));
        }
    }
;

export const createBuilding = (building) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        await buildingAPI.postBuilding(building);
        dispatch(requestBuildings());
        dispatch(setIsFetching(false));
    }
};

export const updateBuilding = (building, buildingId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        await buildingAPI.putBuilding(building, buildingId)
        dispatch(requestBuildings());
        dispatch(setIsFetching(false));
    }
};

export const deleteBuilding = (buildingId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        await buildingAPI.deleteBuilding(buildingId);
        dispatch(requestBuildings());
        dispatch(setIsFetching(false));
    }
};


export default buildingsReducer;