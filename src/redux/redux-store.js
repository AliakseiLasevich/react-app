import {applyMiddleware, combineReducers, createStore, compose} from "redux";
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

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.store = store;

export default store;

window.store = store;
