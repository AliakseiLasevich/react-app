import React from "react";
import style from "./ControlPanel.module.css";
import AddFaculty from "./AddFaculty/AddFaculty";
import AddCathedra from "./AddCathedra/AddCathedra";
import {Route} from "react-router-dom"

const ControlPanel = (props) => {
    return <div className={style.controlPanel}>
        <ul>
            <li><a href="/addFaculty">Добавить факультет</a></li>
            <li><a href="/addCathedra">Добавить кафедру</a></li>
        </ul>
        <Route path="/addFaculty" component={AddFaculty}/>
        <Route path="/addCathedra" component={AddCathedra}/>

    </div>
}

export default ControlPanel;