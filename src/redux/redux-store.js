import {applyMiddleware, combineReducers, createStore} from "redux";
import cathedraReducer from "./CathedraReducer";
import facultyReducer from "./FacultyReducer";
import teacherReducer from "./TeacherReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
    cathedraReducer: cathedraReducer,
    facultyReducer: facultyReducer,
    teacherReducer: teacherReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

window.store = store;
