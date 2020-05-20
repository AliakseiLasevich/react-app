import React from "react";
import style from "./AddTeacher.module.css";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {postTeacher} from "../../../../redux/TeacherReducer";

const AddTeacher = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {

        let teacher = {name: data.name, cathedraId: data.cathedraId}
        dispatch(postTeacher(teacher));
    };

    const cathedras = useSelector(state=> state.cathedraReducer.allCathedras)

    const cathedrasOptions = cathedras.map(cathedra => <option value={cathedra.id} key={cathedra.id}>{cathedra.name}</option>);

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
                <select name="cathedraId" ref={register({required: "Выберите кафедру"})} defaultValue={null}>
                   {cathedrasOptions}

                </select>
                {errors.cathedra && <span className={style.errorMessage}>{errors.cathedra.message}</span>}
            </div>
            <input type="submit"/>

        </div>
    </form>
};

export default AddTeacher;