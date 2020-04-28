import React from "react";
import style from "./FacultyManager.module.css";
import AllFacultiesContainer from "./AllFaculties/AllFacultiesContainer";
import AddFacultyContainer from "./AddFaculty/AddFacultyContainer";
import {Route} from "react-router-dom";

const FacultyManager = (props) => {
    return (
        <div className={style.FacultyManager}>

            <Route path="/controlPanel/facultyManager/:facultyUrl?"
                   render={() => <AllFacultiesContainer/>}/>

            <AddFacultyContainer/>
        </div>
    )
}

export default FacultyManager;