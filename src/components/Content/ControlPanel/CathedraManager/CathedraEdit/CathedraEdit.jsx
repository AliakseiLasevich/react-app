import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {putCathedra} from "../../../../../redux/CathedraReducer";
import {getFaculties} from "../../../../../redux/FacultyReducer";
import style from "./CathedraEdit.module.css";

const CathedraEdit = (props) => {

    const [cathedraTempName, setCathedraTempName] = useState(props.name);

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let cathedra = {name: data.name, id: props.id, active: props.active, facultyId: parseInt(data.facultyId)};
        dispatch(putCathedra(cathedra));
        props.setEditMode(false);
    };

    const changeInputValue = (event) => {
        setCathedraTempName(event.target.value);
    };

    const toggleActiveStatus = () => {
        let cathedra = {
            id: props.id,
            name: props.name,
            active: !props.active
        };
        dispatch(putCathedra(cathedra));
        props.setEditMode(false);
    };

    const faculties = useSelector(state => state.facultyReducer.allFaculties);

    const facultiesOptions = faculties.map(faculty => {
            // return <option value={faculty.id} selected={faculty.id===props.facultyId && "selected"}  key={faculty.id}> {faculty.name} </option>
        debugger
            return <option value={faculty.id}  key={faculty.id}> {faculty.name} </option>
        }
    );




return (<form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <div>{props.id}.

                <input className={style.input} type="text" name="name" value={cathedraTempName}
                       onChange={changeInputValue} ref={register({required: "Введите название кафедры"})}/>
                <div className={style.errorMessage}>  {errors.name && <span>{errors.name.message}</span>}</div>
                <select name="facultyId" ref={register({required: "Выберете факультет"})} defaultValue={{name: props.facultyName}}>
                    {facultiesOptions}
                </select>
            </div>

            <div>
                <input type="submit" value="Сохранить"/>
                <input type="button" value="Отмена" onClick={() => props.setEditMode(false)}/>
                <input type="button" value="изменить статус" onClick={() => toggleActiveStatus()}/>
            </div>
        </div>
    </form>
)
}
;

export default CathedraEdit;