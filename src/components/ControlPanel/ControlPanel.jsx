import React from "react";
import style from "./ControlPanel.module.css";
import {NavLink, Route} from "react-router-dom"
import FacultyManager from "./FacultyManager/FacultyManager";
import AddTeacher from "./TeacherManager/AddTeacher/AddTeacher";
import CathedraManager from "./CathedraManager/CathedraManager";

const ControlPanel = (props) => {
    return (
        <div className={style.controlPanel}>
            <ul>
                <li><NavLink activeClassName={style.active} to="/facultyManager">Управление факультетами</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/cathedraManager">Управление кафедрами</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/addTeacher">Добавить Преподавателя</NavLink></li>
            </ul>

            <Route path="/facultyManager" render={() => <FacultyManager/>}/>

            <Route path="/cathedraManager" render={() => <CathedraManager/>}/>

            <Route path="/addTeacher" render={() => <AddTeacher/>}/>


        </div>
    )
}

export default ControlPanel;