import {learnPlanAPI} from "../api/api";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_ALL_LEARN_PLANS = "SET_ALL_LEARN_PLANS";
const SET_LEARN_PLAN = "SET_LEARN_PLAN";

let initialState = {
    allLearnPlans: [],
    learnPlan: {
        startDate: "",
        endDate: "2020-09-20",
        publicId: "",
        courseNumber: 0,
        faculty: {
            publicId: "",
            name: ""
        },
        specialty: {
            publicId: "",
            name: "",
            code: "",
            faculty: {
                publicId: "",
                name: ""
            }
        },
        disciplinePlan: [
            {
                id: 0,
                publicId: "",
                courseProject: 0,
                courseWork: 0,
                exam: 0,
                flow: "",
                hoursCabinet: 0,
                hoursKSRL: 0,
                hoursKSRLR: 0,
                hoursKSRP: 0,
                hoursKSRVS: 0,
                hoursLaboratory: 0,
                hoursLecture: 0,
                hoursPracticalSeminary: 0,
                hoursSummary: 0,
                summary: 0,
                test: 0,
                testCount: 0,
                discipline: {
                    id: 0,
                    publicId: "",
                    name: "",
                    active: true
                },
                lessons: {
                    "2000-01-01": {
                        id: 0,
                        lecture: 0,
                        practical: 0
                    }
                }
            }
        ]
    },
    isFetching: true
};

export const learnPlanReducer = (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case SET_ALL_LEARN_PLANS:
            return {
                ...state,
                allLearnPlans: action.allLearnPlans
            };

        case SET_LEARN_PLAN:
            return {
                ...state,
                learnPlan: action.learnPlan
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

const setAllLearnPlans = (allLearnPlans) => {
    return {
        type: SET_ALL_LEARN_PLANS,
        allLearnPlans: allLearnPlans
    }
};
const setLearnPlan = (learnPlan) => {
    return {
        type: SET_LEARN_PLAN,
        learnPlan: learnPlan
    }
}

export const requestAllLearnPlans = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await learnPlanAPI.getAllLearnPlans();
        dispatch(setAllLearnPlans(response.data));
        dispatch(setIsFetching(false));
    }
};

export const requestLearnPlanById = (publicId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await learnPlanAPI.getLearnPlanById(publicId);
        dispatch(setLearnPlan(response.data));
        dispatch(setIsFetching(false));
    }
};

export const createLearnPlan = (learnPlan) => {
    return async (dispatch) => {
        const response = await learnPlanAPI.postLearnPlan(learnPlan);
        console.log(response);
    }
};

export const deleteLearnPlan = (learnPlanId) => {
    return async (dispatch) => {
        await learnPlanAPI.deleteLearnPlan(learnPlanId);
        dispatch(requestAllLearnPlans())
    }
};

export const requestLearnPlansThatDateInclude = (date) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await learnPlanAPI.requestLearnPlansWithDateInclude(date);
        dispatch(setAllLearnPlans(response.data));
        dispatch(setIsFetching(false));
    }
};

export const requestLearnPlansByDateAndCourse = (date, courseId) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await learnPlanAPI.requestLearnPlanByDateAndStudentCourse(date, courseId);
        dispatch(setAllLearnPlans(response.data));
        dispatch(setIsFetching(false));
    }
};

export const resetLearnPlans = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setAllLearnPlans([]));
        dispatch(setIsFetching(false));
    }
};


export default learnPlanReducer;