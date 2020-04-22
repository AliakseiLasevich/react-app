import React from "react";
import style from "./FacultyManager.module.css";
import AddFaculty from "../AddFaculty/AddFaculty";
import AllFaculties from "../AllFaculties/AllFaculties";

const FacultyManager = (props) => {


    return (

        <div className={style.FacultyManager}>

            <AllFaculties state={props.state}/>
            <AddFaculty state={props.state}
                        dispatch={props.dispatch}
            />

        </div>
    )
}

export default FacultyManager;