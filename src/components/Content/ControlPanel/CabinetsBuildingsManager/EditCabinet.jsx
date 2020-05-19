import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import style from "../CathedraManager/CathedraEdit.module.css";
import {putCabinet} from "../../../../redux/CabinetsBuildingsReducer";

const EditCabinet = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let cabinet = {
            id: props.id,
            number: +data.number,
            maxStudents: +data.maxStudents,
            type: data.type,
            buildingId: props.buildingId,
            active: data.active
        };
        dispatch(putCabinet(cabinet));
        props.setEditMode(false);
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

            <div>Тип кабинета:


                <input type="radio" name="type" value="l" defaultChecked={props.type===`l`} ref={register}/>
                <label htmlFor="lecture">Лекционный</label>
                <input type="radio" name="type" value="p" defaultChecked={props.type ===`p`} ref={register}/>
                <label htmlFor="lecture">Практический</label>

                <input type="checkbox" name="active" defaultChecked={props.active} ref={register}/>
                <label htmlFor="active">active</label>

                <div>
                    <input type="submit" value="Сохранить"/>
                    <button onClick={() => props.setEditMode(false)}>Отмена</button>
                </div>
            </div>
        </form>
    )
};

export default EditCabinet;