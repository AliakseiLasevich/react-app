import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {updateFaculty} from "../../../../../redux/FacultyReducer";

const FacultyEdit = (props) => {

    const [facultyTempName, setfacultyTempName] = useState(props.name);

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = ({name}) => {
        let faculty = {name, id: props.id}
        dispatch(updateFaculty(faculty));
    };

    const changeInputValue = (event) => {
        setfacultyTempName(event.target.value);
    }


    return (<form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {props.id}.
                <input type="text" name="name" value={facultyTempName}
                       onChange={changeInputValue} ref={register({required: "Введите название факультета"})}/>
                <div>  {errors.name && <span>{errors.name.message}</span>}</div>
                <input type="hidden" name="id" value={props.id}/>
                <div>
                    <input type="submit" value="Сохранить"/>
                    <input type="button" value="Отмена" onClick={() => props.setEditMode(false)}/>
                </div>
            </div>
        </form>
    )
};

export default FacultyEdit;