import React from "react";
import style from "./AddTeacher.module.css";
import {useForm} from "react-hook-form";

const AddTeacher = (props) => {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        debugger
        console.log(data);
    };
    debugger
    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.AddTeacher}>
            <div>
                <input type="text" placeholder="Имя" name="name" ref={register({required: "Введите имя преподавателя"})}/>
                {errors.name && <span className={style.errorMessage}>{errors.name.message}</span>}
            </div>
            <div>
                <input type="select" name="cathedra" ref={register({required: "Выберите кафедру"})}/>
                {errors.cathedra && <span className={style.errorMessage}>{errors.cathedra.message}</span>}
            </div>
            <input type="submit"/>

        </div>
    </form>
};

export default AddTeacher;