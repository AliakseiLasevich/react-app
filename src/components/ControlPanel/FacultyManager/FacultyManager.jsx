import React from "react";
import style from "./FacultyManager.module.css";
import {NavLink, Route} from "react-router-dom";
import AddFaculty from "../AddFaculty/AddFaculty";
import AllFaculties from "../AllFaculties/AllFaculties";
import Faculty from "../Faculty/Faculty";

const FacultyManager = (props) => {


    return (

        <div className={style.FacultyManager}>

            <AllFaculties state={props.state}/>
            <AddFaculty addFaculty={props.addFaculty}/>


            {/*Управление факультетами.*/}
            {/*<li><NavLink activeClassName={style.active} to="/facultyManager/addFaculty">Добавить факультет</NavLink>*/}
            {/*</li>*/}
            {/*<li><NavLink activeClassName={style.active} to="/facultyManager/allFaculties">Просмотреть все*/}
            {/*    факультеты</NavLink></li>*/}

            {/*<Route path="/facultyManager/addFaculty" render={() => <AddFaculty addFaculty={props.addFaculty}/>} />*/}
            {/*<Route path="/facultyManager/allFaculties" render={() => <AllFaculties state={props.state}/>}/>*/}

        </div>
    )
}

export default FacultyManager;