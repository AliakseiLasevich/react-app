import {applyMiddleware, combineReducers, createStore} from "redux";
import cathedraReducer from "./CathedraReducer";
import facultyReducer from "./FacultyReducer";
import teacherReducer from "./TeacherReducer";
import thunkMiddleware from "redux-thunk";
import cabinetsBuildingsReducer from "./CabinetsBuildingsReducer";
import specialtyReducer from "./SpecialtyReducer";
import studentGroupReducer from "./StudentGroupsReducer";

let reducers = combineReducers({
    cathedraReducer: cathedraReducer,
    facultyReducer: facultyReducer,
    teacherReducer: teacherReducer,
    cabinetsBuildingsReducer: cabinetsBuildingsReducer,
    specialtyReducer: specialtyReducer,
    studentGroupReducer: studentGroupReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

window.store = store;
