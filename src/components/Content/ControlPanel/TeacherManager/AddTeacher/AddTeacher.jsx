import React from "react";
import style from "./AddTeacher.module.css";
import {Field, reduxForm} from "redux-form";

const AddTeacherForm = (props) => {

debugger

    // let updateNameInputField = (event) => {
    //     let name = event.target.value;
    //     props.updateNameInputField(name);
    // };


    return <form onSubmit={props.handleSubmit}>
        <div className={style.AddTeacher}>
            <Field placeholder="Имя" component={"input"} name="name"/>
            <Field placeholder="Кафедра" component={"input"} name="cathedra"/>
            <button>Add teacher</button>


        </div>
    </form>
}

const AddTeacher = reduxForm({form: "teacherForm"})(AddTeacherForm);

export default AddTeacher;