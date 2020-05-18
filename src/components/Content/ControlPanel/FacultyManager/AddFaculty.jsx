import React from "react";
import style from "./AddFaculty.module.css";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addFacultyToDatabase} from "../../../../redux/FacultyReducer";

const AddFaculty = (props) => {

    const {register, handleSubmit, errors} = useForm();

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(addFacultyToDatabase(data.name));
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>

            <div className={style.addFaculty}>
                <div>
                    <div>Введите название факультета</div>
                    <input type="text" placeholder="Факультет" name="name"
                           ref={register({required: "Введите название факультета"})}/>
                    <div>  {errors.name && <span className={style.errorMessage}>{errors.name.message}</span>}</div>
                </div>
                <input type="submit"/>
            </div>
        </form>
    )
};

export default AddFaculty;

