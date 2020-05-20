import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {putStudentGroup} from "../../../../redux/StudentGroupsReducer";
import {getSpecialties} from "../../../../redux/SpecialtyReducer";

const EditStudentGroup = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let studentGroup = {
            id: props.id,
            course: data.course,
            specialtyId: data.specialtyId,
            number: data.number,
            active: data.active
        };

        dispatch(putStudentGroup(studentGroup));
        props.setEditMode(false);
    };

    useEffect(() => {
        dispatch(getSpecialties())
    }, []);

    const specialties = useSelector(state => state.specialtyReducer.allSpecialties);

    const specialtiesOptions = specialties.map(specialty => <option value={specialty.id}
                                                                    key={specialty.id}>{specialty.name},
        код {specialty.code}</option>);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    {props.id}.

                    Курс:
                    <input type="text" name="course" defaultValue={props.course}
                           ref={register({required: "Введите номер курса"})}/>
                    <div>  {errors.course && <span>{errors.course.message}</span>}</div>

                    Группа:
                    <input type="text" name="number" defaultValue={props.number}
                           ref={register({required: "Введите номер группы"})}/>
                    <div>  {errors.number && <span>{errors.number.message}</span>}</div>

                    Специальность:
                    <select name="specialtyId" ref={register({required: "Выберете специальность"})}
                            defaultValue={props.specialtyId}>
                        {specialtiesOptions}
                    </select>

                    Активный:
                    <input type="checkbox" name="active" defaultChecked={props.active} ref={register}/>


                </div>

                <div>
                    <input type="submit" value="Сохранить"/>
                    <input type="button" value="Отмена" onClick={() => props.setEditMode(false)}/>
                </div>
            </div>
        </form>
    )
};

export default EditStudentGroup;