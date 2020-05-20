import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import style from "./TeacherEdit.module.css";
import {putTeacher} from "../../../../redux/TeacherReducer";

const TeacherEdit = (props) => {

        const {register, handleSubmit, errors} = useForm();
        const dispatch = useDispatch();

        const onSubmit = (data) => {
            let teacher = {name: data.name, id: props.id, active: props.active, cathedraId: parseInt(data.cathedraId)};
            dispatch(putTeacher(teacher));
            props.setEditMode(false);
        };

        const toggleActiveStatus = () => {
            let teacher = {
                id: props.id,
                name: props.name,
                active: !props.active,
                cathedraId: props.cathedraId
            };
            dispatch(putTeacher(teacher));
            props.setEditMode(false);
        };

        const cathedras = useSelector(state => state.cathedraReducer.allCathedras);

        const cathedraOptions = cathedras.map(cathedra => {
                return <option value={cathedra.id} key={cathedra.id}> {cathedra.name} </option>
            }
        );

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        {props.id}.

                        <input className={style.input} type="text" name="name" defaultValue={props.name}
                               ref={register({required: "Введите имя преподавателя"})}/>
                        <div className={style.errorMessage}>  {errors.name && <span>{errors.name.message}</span>}</div>

                        <select name="cathedraId" ref={register({required: "Выберете кафедру"})}
                                defaultValue={props.cathedraId}>
                            {cathedraOptions}
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

export default TeacherEdit;