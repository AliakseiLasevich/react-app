import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {updateFaculty} from "../../../../../redux/FacultyReducer";

const FacultyEdit = (props) => {

    const [facultyTempName, setFacultyTempName] = useState(props.name);

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = ({name}) => {
        let faculty = {name, id: props.id, active: props.active};
        dispatch(updateFaculty(faculty));
        props.setEditMode(false);
    };

    const changeInputValue = (event) => {
        setFacultyTempName(event.target.value);
    };

    const toggleActiveStatus = () => {
        let faculty = {
            id: props.id,
            name: props.name,
            active: !props.active
        };
        dispatch(updateFaculty(faculty));
        props.setEditMode(false);
    };


    return (<form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {props.id}.
                <input type="text" name="name" value={facultyTempName}
                       onChange={changeInputValue} ref={register({required: "Введите название факультета"})}/>
                <div>  {errors.name && <span>{errors.name.message}</span>}</div>
                <div>
                    <input type="submit" value="Сохранить"/>
                    <input type="button" value="Отмена" onClick={() => props.setEditMode(false)}/>
                    <input type="button" value="изменить статус" onClick={() => toggleActiveStatus()}/>
                </div>
            </div>
        </form>
    )
};

export default FacultyEdit;