import React from "react";
import style from "./ControlPanel.module.css";
import {NavLink, Route} from "react-router-dom"
import FacultyManager from "./FacultyManager/FacultyManager";
import AddCathedra from "./AddCathedra/AddCathedra";
import AddTeacher from "./AddTeacher/AddTeacher";

const ControlPanel = (props) => {
    return (
        <div className={style.controlPanel}>
            <ul>
                <li><NavLink activeClassName={style.active} to="/facultyManager">Управление факультетами</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/addCathedra">Добавить кафедру</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/addTeacher">Добавить Преподавателя</NavLink></li>
            </ul>
            <Route path="/facultyManager" render={() => <FacultyManager
                state={props.state}
                addFaculty={props.addFaculty}
                redrawTextInput={props.redrawTextInput}/>}/>
            <Route path="/addCathedra" component={AddCathedra}/>
            <Route path="/addTeacher" component={AddTeacher}/>
        </div>
    )
}

export default ControlPanel;