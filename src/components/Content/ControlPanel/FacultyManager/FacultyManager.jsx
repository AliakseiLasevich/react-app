import React, {useState} from "react";
import style from "./FacultyManager.module.css";
import AllFacultiesContainer from "./AllFaculties/AllFacultiesContainer";
import AddFacultyContainer from "./AddFaculty/AddFacultyContainer";
import {Route} from "react-router-dom";
import plus_green from "../../../../assets/img/plus_green.png";
import minus_red from "../../../../assets/img/minus_red.png";

const FacultyManager = (props) => {

    const [addFacultyMode, setAddFacultyMode] = useState(false);

    const toggleEditMode = () => {
        setAddFacultyMode(!addFacultyMode)
    };

    return (
        <div className={style.FacultyManager}>

            <div onClick={toggleEditMode}>
                {!addFacultyMode && <span><img src={plus_green} alt="+"/>Добавить факультет</span>}
                {addFacultyMode && <span><img src={minus_red} alt="-"/>Отмена</span>}
            </div>

            <div className={style.AddFacultyContainer}>
                {addFacultyMode && <AddFacultyContainer/>}
            </div>

            <Route path="/controlPanel/facultyManager/:facultyUrl?"
                   render={() => <AllFacultiesContainer/>}/>

        </div>
    )
};

export default FacultyManager;