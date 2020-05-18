import React from "react";
import style from "./AddCathedra.module.css";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {postCathedra} from "../../../../redux/CathedraReducer";

const AddCathedra = (props) => {

    const {register, handleSubmit, errors} = useForm();

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let cathedra = {name: data.name, facultyId: parseInt(data.facultyId)}
        dispatch(postCathedra(cathedra));
    };

    const faculties = useSelector(state=> state.facultyReducer.allFaculties);

    const facultiesOptions = faculties.map(faculty => <option value={faculty.id} key={faculty.id}>{faculty.name}</option>);

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.AddCathedra}>
            <div>
                <div>Введите название кафедры</div>
                <input type="text" placeholder="Кафедра" name="name"
                       ref={register({required: "Введите название кафедры"})}/>
                <div>  {errors.name && <span className={style.errorMessage}>{errors.name.message}</span>}</div>

                Факультет:
                <div>
                    <select name="facultyId"ref={register({required: "Выберете факультет"})}>
                        [<option></option>, ...{facultiesOptions}]
                    </select>
                    <div>  {errors.facultyId && <span className={style.errorMessage}>{errors.facultyId.message}</span>}</div>
                </div>

            </div>
            <input type="submit"/>
        </div>
    </form>
}

export default AddCathedra;

