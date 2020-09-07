import {applyMiddleware, combineReducers, createStore, compose} from "redux";
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

let reducers = combineReducers({
    cathedraReducer: cathedraReducer,
    facultyReducer: facultyReducer,
    teacherReducer: teacherReducer,
    buildingsReducer: buildingsReducer,
    cabinetsReducer: cabinetsReducer,
    specialtyReducer: specialtyReducer,
    studentsReducer: studentsReducer,
    learnPlanReducer: learnPlanReducer,
    disciplinesReducer: disciplinesReducer

});

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.store = store;

export default store;

window.store = store;
