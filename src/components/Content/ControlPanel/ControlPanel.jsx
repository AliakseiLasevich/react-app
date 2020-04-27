import React from "react";
import style from "./ControlPanel.module.css";
import {NavLink, Route} from "react-router-dom"
import FacultyManager from "./FacultyManager/FacultyManager";
import CathedraManager from "./CathedraManager/CathedraManager";
import TeacherManager from "./TeacherManager/TeacherManager";

const ControlPanel = (props) => {
    return (
        <nav className={style.controlPanel}>
            <ul>
                <li><NavLink activeClassName={style.active} to="/controlPanel/facultyManager">Факультеты</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/controlPanel/cathedraManager">Кафедры</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/controlPanel/teacherManager">Преподаватели</NavLink></li>
            </ul>

            <Route path="/controlPanel/facultyManager" render={() => <FacultyManager/>}/>

            <Route path="/controlPanel/cathedraManager" render={() => <CathedraManager/>}/>

            <Route path="/controlPanel/teacherManager" render={() => <TeacherManager/>}/>

        </nav>
    )
}

export default ControlPanel;