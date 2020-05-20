import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {postStudentGroup} from "../../../../redux/StudentGroupsReducer";
import {getSpecialties} from "../../../../redux/SpecialtyReducer";

const AddStudentGroup = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let studentGroup = {course: data.course, number: data.number, specialtyId: data.specialtyId};
        dispatch(postStudentGroup(studentGroup));
    };

    useEffect(()=>{
        dispatch(getSpecialties())
    },[]);

    const specialties = useSelector(state=> state.specialtyReducer.allSpecialties);

    const specialtiesOptions = specialties.map(specialty => <option value={specialty.id} key={specialty.id}>{specialty.name}, код {specialty.code}</option>);

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <div>
                <div>Курс</div>
                <input type="text" placeholder="Номер курса" name="course"
                       ref={register({required: "Введите номер курса"})}/>
                {errors.course && <span>{errors.course.message}</span>}
            </div>

            <div>
                <div>Номер группы</div>
                <input type="text" placeholder="Номер группы" name="number"
                       ref={register({required: "Введите номер группы"})}/>
                {errors.number && <span>{errors.number.message}</span>}
            </div>

            <div>
                <div>Выберете специальность</div>
                <select name="specialtyId" ref={register({required: "Выберите специальность"})}>
                    {specialtiesOptions}
                </select>
                {errors.specialtyId && <span>{errors.specialtyId.message}</span>}
            </div>

            <input type="submit"/>

        </div>
    </form>
};

export default AddStudentGroup;