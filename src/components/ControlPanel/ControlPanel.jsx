import React from "react";
import style from "./ControlPanel.module.css";
import {NavLink, Route} from "react-router-dom"
import FacultyManager from "./FacultyManager/FacultyManager";
import CathedraManager from "./CathedraManager/CathedraManager";
import TeacherManager from "./TeacherManager/TeacherManager";

const ControlPanel = (props) => {
    return (
        <div className={style.controlPanel}>
            <ul>
                <li><NavLink activeClassName={style.active} to="/facultyManager">Факультеты</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/cathedraManager">Кафедры</NavLink></li>
                <li><NavLink activeClassName={style.active} to="/teacherManager">Преподаватели</NavLink></li>
            </ul>

            <Route path="/facultyManager" render={() => <FacultyManager/>}/>

            <Route path="/cathedraManager" render={() => <CathedraManager/>}/>

            <Route path="/teacherManager" render={() => <TeacherManager/>}/>

        </div>
    )
}

export default ControlPanel;