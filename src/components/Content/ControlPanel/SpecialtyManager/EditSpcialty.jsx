import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {putSpecialty} from "../../../../redux/SpecialtyReducer";
import {getFaculties} from "../../../../redux/FacultyReducer";

const EditSpecialty = (props) => {
    debugger
        const {register, handleSubmit, errors} = useForm();
        const dispatch = useDispatch();

        const onSubmit = (data) => {

            let specialty = {
                name: data.name,
                id: props.id,
                code: data.code,
                active: props.active,
                facultyId: +data.facultyId
            };

            dispatch(putSpecialty(specialty));
            props.setEditMode(false);
        };

        useEffect(() => {
            dispatch(getFaculties());
        }, []);

        const faculties = useSelector(state => state.facultyReducer.allFaculties);

        const facultiesOptions = faculties.map(faculty => {
                return <option value={faculty.id} key={faculty.id}> {faculty.name} </option>
            }
        );

        return (<form onSubmit={handleSubmit(onSubmit)}>
                <div>

                    <div>
                        {props.id}.

                        Название:
                        <input type="text" name="name" defaultValue={props.name}
                               ref={register({required: "Введите специальность"})}/>
                        <div>  {errors.name && <span>{errors.name.message}</span>}</div>

                        Код:
                        <input type="text" name="code" defaultValue={props.code}
                               ref={register({required: "Введите код"})}/>
                        <div>  {errors.code && <span>{errors.code.message}</span>}</div>

                        <select name="facultyId" ref={register({required: "Выберете факультет"})}
                                defaultValue={props.facultyId}>
                            {facultiesOptions}
                        </select>

                    </div>

                    <div>
                        <input type="submit" value="Сохранить"/>
                        <input type="button" value="Отмена" onClick={() => props.setEditMode(false)}/>
                    </div>
                </div>
            </form>
        )
    }
;

export default EditSpecialty;