import React from "react";
import style from "./AddFaculty.module.css";
import {useForm} from "react-hook-form";

const AddFaculty = (props) => {

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.AddTeacher}>
                <div>
                    <div>Введите название факультета</div>
                    <input type="text" placeholder="Факультет" name="name"
                           ref={register({required: "Введите название факультета"})}/>
                    {errors.name && <span className={style.errorMessage}>{errors.name.message}</span>}
                </div>
                <input type="submit"/>
            </div>
        </form>
            )
};

export default AddFaculty;

