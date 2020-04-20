import React from "react";
import style from "./FacultyManager.module.css";
import AddFaculty from "../AddFaculty/AddFaculty";
import AllFaculties from "../AllFaculties/AllFaculties";
import {redrawTextInput} from "../../../state/state";

const FacultyManager = (props) => {


    return (

        <div className={style.FacultyManager}>

            <AllFaculties state={props.state}/>
            <AddFaculty state={props.state}
                        addFaculty={props.addFaculty}
                        redrawTextInput={props.redrawTextInput}/>

        </div>
    )
}

export default FacultyManager;