import style from "./TeacherManager.module.css"
import React from "react";
import AddTeacherContainer from "./AddTeacher/AddTeacherContainer";
import TeachersWithHooks from "./AllTeachers/AllTeachersContainer";

const TeacherManager = (props) => {

    return (
        <div className={style.teacherManager}>
            <TeachersWithHooks/>
            <AddTeacherContainer/>
        </div>
    )
}

export default TeacherManager;