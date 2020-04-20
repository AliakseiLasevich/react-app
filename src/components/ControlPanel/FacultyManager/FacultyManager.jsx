import React from "react";
import style from "./FacultyManager.module.css";
import {NavLink, Route} from "react-router-dom";
import AddFaculty from "../AddFaculty/AddFaculty";
import AllFaculties from "../AllFaculties/AllFaculties";

const FacultyManager = (props) => {


    return (

        <div className={style.FacultyManager}>

            Управление факультетами.
            <li><NavLink activeClassName={style.active} to="/facultyManager/addFaculty">Добавить факультет</NavLink>
            </li>
            <li><NavLink activeClassName={style.active} to="/facultyManager/allFaculties">Просмотреть все
                факультеты</NavLink></li>

            {/*TODO  Добавить подменю. Разобраться с вложенным роутингом*/}

            <Route path="/facultyManager/addFaculty" component={AddFaculty}/>
            <Route path="/facultyManager/allFaculties" render={() => <AllFaculties state={props.state}/>}/>

        </div>
    )
}

export default FacultyManager;