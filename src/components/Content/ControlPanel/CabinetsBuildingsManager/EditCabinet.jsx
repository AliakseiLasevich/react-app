import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {putCathedra} from "../../../../redux/CathedraReducer";
import style from "../CathedraManager/CathedraEdit.module.css";

const EditCabinet = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        // let cathedra = {name: data.name, id: props.id, active: props.active, facultyId: parseInt(data.facultyId)};
        // dispatch(putCathedra(cathedra));
        // props.setEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            Кабинет №:
            <input type="text" name="number" defaultValue={props.number}
                   ref={register({required: "Введите номер кабинета"})}/>
            <div className={style.errorMessage}>  {errors.number && <span>{errors.number.message}</span>}</div>
            Вместимость:
            <input type="text" name="maxStudents" defaultValue={props.maxStudents}
                   ref={register({required: "Введите количество мест"})}/>
            <div className={style.errorMessage}>  {errors.maxStudents &&
            <span>{errors.maxStudents.message}</span>}</div>
            Тип кабинета:
            <input type="checkbox" name="lecture"/>Лекционный
            <input type="checkbox" name="lecture"/>Практический
            <input type="submit" value="Сохранить"/>
        </form>
    )
};

export default EditCabinet;