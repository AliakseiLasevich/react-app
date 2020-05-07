import React, {useState} from "react";
import style from "./FacultyManager.module.css";
import {Route} from "react-router-dom";
import plus_green from "../../../../assets/img/plus_green.png";
import minus_red from "../../../../assets/img/minus_red.png";
import AllFaculties from "./AllFaculties/AllFaculties";
import AddFaculty from "./AddFaculty/AddFaculty";

const FacultyManager = (props) => {

    const [addFacultyMode, setAddFacultyMode] = useState(false);

    const toggleEditMode = () => {
        setAddFacultyMode(!addFacultyMode)
    };

    return (
        <div className={style.FacultyManager}>

            <div onClick={toggleEditMode} className={style.addFacultyButton}>
                {!addFacultyMode && <span><img src={plus_green} alt="+"/>Добавить факультет</span>}
                {addFacultyMode && <span><img src={minus_red} alt="-"/>Отмена</span>}
            </div>
                {addFacultyMode && <AddFaculty/>}

            <Route path="/controlPanel/facultyManager/"
                   render={() => <AllFaculties/>}/>

        </div>
    )
};

export default FacultyManager;