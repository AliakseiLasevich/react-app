import React from "react";
import style from "./ControlPanel.module.css";
import AddFaculty from "./AddFaculty/AddFaculty";
import AddCathedra from "./AddCathedra/AddCathedra";
import {NavLink, Route} from "react-router-dom"
import AddTeacher from "./AddTeacher/AddTeacher";

const ControlPanel = (props) => {
    return <div className={style.controlPanel}>
        <ul>
            <li><NavLink activeClassName={style.active} to="/addFaculty">Добавить факультет</NavLink></li>
            <li><NavLink activeClassName={style.active} to="/addCathedra">Добавить кафедру</NavLink></li>
            <li><NavLink activeClassName={style.active} to="/addTeacher">Добавить Преподавателя</NavLink></li>
        </ul>
        <Route path="/addFaculty" component={AddFaculty}/>
        <Route path="/addCathedra" component={AddCathedra}/>
        <Route path="/addTeacher" component={AddTeacher}/>

    </div>
}

export default ControlPanel;