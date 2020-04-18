import React from "react";
import style from "./AddTeacher.module.css";

const AddTeacher = (props) => {
    return <div className={style.AddTeacher}>
        Добавить Преподавателя.
        <input/>
        <input type="button" value="+Препод"/>
    </div>
}

export default AddTeacher;