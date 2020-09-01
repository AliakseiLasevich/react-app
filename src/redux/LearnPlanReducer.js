import {learnPlanAPI} from "../api/api";


let initialState = {};

export const learnPlanReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
};

export const createLearnPlan = (learnPlan) => {
    return async (dispatch) => {
        const response = await learnPlanAPI.postLearnPlan(learnPlan);
        console.log(response);
    }
};

export default learnPlanReducer;