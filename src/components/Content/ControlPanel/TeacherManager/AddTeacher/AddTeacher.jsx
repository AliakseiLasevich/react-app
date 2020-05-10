import React from "react";
import style from "./AddTeacher.module.css";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

const AddTeacher = (props) => {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const cathedras = useSelector(state=> state.cathedraReducer.allCathedras)
    console.log(cathedras);
    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.AddTeacher}>
            <div>
                <div>Введите имя преподавателя</div>
                <input type="text" placeholder="Имя" name="name"
                       ref={register({required: "Введите имя преподавателя"})}/>

                {errors.name && <span className={style.errorMessage}>{errors.name.message}</span>}
            </div>
            <div>
                <div>Выберете кафедру</div>
                <select name="cathedra" ref={register({required: "Выберите кафедру"})}>
                    <option value=""></option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                </select>
                {errors.cathedra && <span className={style.errorMessage}>{errors.cathedra.message}</span>}
            </div>
            <input type="submit"/>

        </div>
    </form>
};

export default AddTeacher;