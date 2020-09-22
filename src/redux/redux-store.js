import {applyMiddleware, createStore, compose} from "redux";
import { combineReducers } from 'redux-immer';
import cathedraReducer from "./CathedraReducer";
import facultyReducer from "./FacultyReducer";
import teacherReducer from "./TeacherReducer";
import thunkMiddleware from "redux-thunk";
import cabinetsReducer from "./CabinetsReducer";
import specialtyReducer from "./SpecialtyReducer";
import studentsReducer from "./StudentsReducer";
import buildingsReducer from "./BuildingsReducer";
import learnPlanReducer from "./LearnPlanReducer";
import disciplinesReducer from "./DisciplinesReducer";
import messageReducer from "./MessageReducer";
import deleteReducer from "./DeleteReducer";
import produce from 'immer';
import lessonReducer from "./LessonReducer";

let reducers = {
    cathedraReducer: cathedraReducer,
    facultyReducer: facultyReducer,
    teacherReducer: teacherReducer,
    buildingsReducer: buildingsReducer,
    cabinetsReducer: cabinetsReducer,
    specialtyReducer: specialtyReducer,
    studentsReducer: studentsReducer,
    learnPlanReducer: learnPlanReducer,
    disciplinesReducer: disciplinesReducer,
    messageReducer: messageReducer,
    deleteReducer: deleteReducer,
    lessonReducer: lessonReducer
};

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export const store = createStore(
    combineReducers(produce, reducers),applyMiddleware(thunkMiddleware)
);

window.store = store;
export default store;