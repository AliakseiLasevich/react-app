import React from "react";
import style from "./FacultyManager.module.css";
import AddFaculty from "./AddFaculty/AddFaculty";
import AllFaculties from "./AllFaculties/AllFaculties";
import AllFacultiesContainer from "./AllFaculties/AllFacultiesContainer";
import AddFacultyContainer from "./AddFaculty/AddFacultyContainer";

const FacultyManager = (props) => {
    return (
        <div className={style.FacultyManager}>
            <AllFacultiesContainer/>
            <AddFacultyContainer/>

        </div>
    )
}

export default FacultyManager;