import style from "./TeacherManager.module.css"
import React, {useState} from "react";
import AllTeachers from "./AllTeachers";
import AddTeacher from "./AddTeacher";
import plus_green from "../../../../assets/img/plus_green.png";
import minus_red from "../../../../assets/img/minus_red.png";

const TeacherManager = (props) => {

    const [addTeacherMode, setAddTeacherMode] = useState(false);

    const toggleEditMode = () => {
        setAddTeacherMode(!addTeacherMode)
    };

    return (

        <div className={style.teacherManager}>
            <div onClick={toggleEditMode} className={style.addTeacherButton}>
                {!addTeacherMode && <span><img src={plus_green} alt="+"/>Добавить Преподавателя</span>}
                {addTeacherMode && <span><img src={minus_red} alt="-"/>Отмена</span>}
            </div>
            {addTeacherMode && <AddTeacher/>}

            <AllTeachers/>
        </div>


    )
}

export default TeacherManager;