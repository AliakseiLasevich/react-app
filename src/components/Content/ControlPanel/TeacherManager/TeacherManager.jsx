import style from "./TeacherManager.module.css"
import React from "react";
import AddTeacherContainer from "./AddTeacher/AddTeacherContainer";
import AllTeachers from "./AllTeachers/AllTeachersContainer";


const TeacherManager = (props) => {
const onSubmit = (formData) => {
    console.log(formData)
    };
    return (
        <div className={style.teacherManager}>
            <AllTeachers/>
            <AddTeacherContainer onSubmit={onSubmit}/>
        </div>
    )
}

export default TeacherManager;