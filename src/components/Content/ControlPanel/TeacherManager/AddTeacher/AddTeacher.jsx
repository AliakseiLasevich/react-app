import React from "react";
import style from "./AddTeacher.module.css";

const AddTeacher = (props) => {

    let updateNameInputField = (event) => {
        let name = event.target.value;
        debugger
        props.updateNameInputField(name);
    };


    return <div className={style.AddTeacher}>
        <input type="text" onChange={updateNameInputField} placeholder="Имя" value={props.nameInputField}/>
        <input type="button" value="Добавить преподавателя" onClick={props.addTeacher}/>
    </div>
}

export default AddTeacher;