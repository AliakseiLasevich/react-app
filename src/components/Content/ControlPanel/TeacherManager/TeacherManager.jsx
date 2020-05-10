import style from "./TeacherManager.module.css"
import React from "react";
import AddTeacherContainer from "./AddTeacher/AddTeacherContainer";
import AllTeachers from "./AllTeachers/AllTeachers";

const TeacherManager = (props) => {

    return (
        <div className={style.teacherManager}>
            <AddTeacherContainer/>

            <AllTeachers/>

        </div>
    )
}

export default TeacherManager;