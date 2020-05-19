import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getFaculties} from "../../../../redux/FacultyReducer";
import {postSpecialty} from "../../../../redux/SpecialtyReducer";

const AddSpecialty = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {

        let specialty = {
            name: data.name,
            facultyId: +data.facultyId,
            code: data.code
        };
        dispatch(postSpecialty(specialty))
    };

    useEffect(() => {
        dispatch(getFaculties());
    }, []);

    const faculties = useSelector(state => state.facultyReducer.allFaculties)

    const facultiesOptions = faculties.map(faculty => <option value={faculty.id}
                                                              key={faculty.id}>{faculty.name}</option>);

    return <form onSubmit={handleSubmit(onSubmit)}>

        <div>
            <div>
                <div>Название специальности</div>
                <input type="text" placeholder="Специальность" name="name"
                       ref={register({required: "Введите название специальности"})}/>
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div>
                <div>Код специальности</div>
                <input type="text" placeholder="Код" name="code"
                       ref={register({required: "Введите код специальности"})}/>
                {errors.code && <span>{errors.code.message}</span>}
            </div>

            <div>
                <div>Выберете факультет</div>
                <select name="facultyId" ref={register({required: "Выберите факультет"})} defaultValue={props.facultyId}>
                    {facultiesOptions}
                </select>
                {errors.facultyId && <span>{errors.facultyId.message}</span>}


            </div>
            <input type="submit"/>

        </div>
    </form>
};

export default AddSpecialty;