import React from "react";
import style from "./AddTeacher.module.css";

const AddTeacher = (props) => {

    let updateNameInputField = (event) => {
        let name = event.target.value;
        debugger
        props.updateNameInputField(name);
    };

    let updateLastNameInputField = (event) => {
        let lastName = event.target.value;
        props.updateLastNameInputField(lastName);
    };

    let updateCathedraInputField = (event) => {
        let cathedra = event.target.value;
        props.updateCathedraInputField(cathedra);
    };

    return <div className={style.AddTeacher}>
        <input type="text" onChange={updateNameInputField} placeholder="Имя" value={props.nameInputField}/>
        <input type="text" onChange={updateLastNameInputField} placeholder="Фамилия"/>
        <input type="text" onChange={updateCathedraInputField} placeholder="Кафедра"/>
        <input type="button" value="Добавить преподавателя" onClick={props.addTeacher}/>
    </div>
}

export default AddTeacher;