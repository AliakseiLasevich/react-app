import {combineReducers, createStore} from "redux";
import cathedraReducer from "./CathedraReducer";
import facultyReducer from "./FacultyReducer";
import teacherReducer from "./TeacherReducer";

let reducers = combineReducers({
    cathedraReducer: cathedraReducer,
    facultyReducer: facultyReducer,
    teacherReducer: teacherReducer
});

let store = createStore(reducers);

export default store;