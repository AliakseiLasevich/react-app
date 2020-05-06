import style from "./TeacherManager.module.css"
import React from "react";
import AddTeacherContainer from "./AddTeacher/AddTeacherContainer";
import AllTeachers from "./AllTeachers/AllTeachersContainer";

const TeacherManager = (props) => {

    return (
        <div className={style.teacherManager}>
            <AllTeachers/>
            <AddTeacherContainer/>
        </div>
    )
}

export default TeacherManager;