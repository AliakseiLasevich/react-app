import style from "./TeacherManager.module.css"
import React from "react";
import AllTeacherContainer from "./AllTeachers/AllTeachersContainer";
import AddTeacherContainer from "./AddTeacher/AddTeacherContainer";

const TeacherManager = (props) => {

    return (
        <div className={style.teacherManager}>
            <AllTeacherContainer/>
            <AddTeacherContainer/>
        </div>
    )
}

export default TeacherManager;