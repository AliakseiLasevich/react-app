import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {postCabinet} from "../../../../redux/CabinetsBuildingsReducer";

const AddCabinet = (props) => {

    const {register, handleSubmit, errors} = useForm();

    const dispatch = useDispatch();

    const onSubmit = (data) => {

        let newCabinet = {
            buildingId: props.buildingId,
            number: data.number,
            maxStudents: data.maxStudents,
            type: data.type};

        dispatch(postCabinet(newCabinet));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <div>Номер кабинета:
                        <input type="text" placeholder="Номер кабинета" name="number"
                               ref={register({required: "Номер кабинета"})}/></div>
                    <div>  {errors.number && <span>{errors.number.message}</span>}</div>

                    <div>Количество мест:
                        <input type="text" placeholder="Количество мест" name="maxStudents"
                               ref={register({required: "Введите количество мест"})}/></div>
                    <div>  {errors.maxStudents &&
                    <span>{errors.maxStudents.message}</span>}</div>

                    <div>
                        <input type="radio" name="type" required={true} value="l" ref={register}/>Лекционный
                        <input type="radio" name="type" required={true} value="p" ref={register}/>Практический
                    </div>


                </div>
                <input type="submit"/>
            </div>
        </form>
    )
};

export default AddCabinet;