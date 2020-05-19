import React from "react";
import style from "./ControlPanel.module.css";
import {NavLink, Route} from "react-router-dom"
import FacultyManager from "./FacultyManager/FacultyManager";
import CathedraManager from "./CathedraManager/CathedraManager";
import TeacherManager from "./TeacherManager/TeacherManager";
import StudentGroupManager from "./StudentGroupPanel/StudentGroupManager";
import CabinetsBuildingsManagerContainer from "./CabinetsBuildingsManager/CabinetsBuildingsManagerContainer";
import LearnPlan from "./LearnPlan/LearnPlan";
import SpecialtyManager from "./SpecialtyManager/SpecialtyManager";

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
            <NavLink className={style.control_panel_item} activeClassName={style.active}
                     to="/controlPanel/students">Студенческие
                группы</NavLink>

            <NavLink className={style.control_panel_item} activeClassName={style.active}
                     to="/controlPanel/learnPlan">Учебный план</NavLink>


            <Route path="/controlPanel/facultyManager/"
                   render={() => <FacultyManager/>}/>

            <Route path="/controlPanel/cathedraManager"
                   render={() => <CathedraManager/>}/>

            <Route path="/controlPanel/teacherManager"
                   render={() => <TeacherManager/>}/>

            <Route path="/controlPanel/cabinetsAndBuildings"
                   render={() => <CabinetsBuildingsManagerContainer/>}/>

            <Route path="/controlPanel/specialities"
                   render={() => <SpecialtyManager/>}/>

            <Route path="/controlPanel/students"
                   render={() => <StudentGroupManager/>}/>

            <Route path="/controlPanel/learnPlan"
                   render={() => <LearnPlan/>}/>

        </nav>
    )
}

export default ControlPanel;