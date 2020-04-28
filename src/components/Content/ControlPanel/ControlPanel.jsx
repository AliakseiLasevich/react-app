import React from "react";
import style from "./ControlPanel.module.css";
import {NavLink, Route} from "react-router-dom"
import FacultyManager from "./FacultyManager/FacultyManager";
import CathedraManager from "./CathedraManager/CathedraManager";
import TeacherManager from "./TeacherManager/TeacherManager";

const ControlPanel = (props) => {
    return (
        <nav className={style.controlPanel}>

            <NavLink className={style.control_panel_item} activeClassName={style.active}
                     to="/controlPanel/facultyManager">Факультеты</NavLink>

            <NavLink className={style.control_panel_item} activeClassName={style.active}
                     to="/controlPanel/cathedraManager">Кафедры</NavLink>
            <NavLink className={style.control_panel_item} activeClassName={style.active}
                     to="/controlPanel/teacherManager">Преподаватели</NavLink>
            <NavLink className={style.control_panel_item} activeClassName={style.active}
                     to="/controlPanel/cabinetsAndBuildings">Кабинеты и здания</NavLink>
            <NavLink className={style.control_panel_item} activeClassName={style.active}
                     to="/controlPanel/specialities">Специальности</NavLink>
            <NavLink className={style.control_panel_item} activeClassName={style.active} to="/controlPanel/students">Студенческие
                группы</NavLink>


            <Route path="/controlPanel/facultyManager/"
                   render={() => <FacultyManager/>}/>

            <Route path="/controlPanel/cathedraManager"
                   render={() => <CathedraManager/>}/>

            <Route path="/controlPanel/teacherManager"
                   render={() => <TeacherManager/>}/>

        </nav>
    )
}

export default ControlPanel;