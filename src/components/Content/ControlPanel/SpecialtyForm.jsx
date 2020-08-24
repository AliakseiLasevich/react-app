import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import {createSpecialty, updateSpecialty} from "../../../redux/SpecialtyReducer";
import {requestFaculties} from "../../../redux/FacultyReducer";

const SpecialtyForm = (props) => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const faculties = useSelector(state => state.facultyReducer.allFaculties);
    const [faculty, setFaculty] = useState(props.specialty?.faculty?.publicId || {});

    useEffect(() => {
        dispatch(requestFaculties())
    }, [dispatch]);

    const handleClose = () => {
        props.setSpecialtyToEdit({});
        props.setEditMode(false);
    };

    const onSubmit = (specialty) => {

        if (props.specialty.name) {
            dispatch(updateSpecialty(specialty, props.specialty.publicId))
        } else {
            dispatch(createSpecialty(specialty))
        }
        props.setSpecialtyToEdit({});
        props.setEditMode(false);
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="name">Название специальности</label>
                    <input type="text" name="name" defaultValue={props.specialty.name || ""}
                           ref={register({required: "Введите название специальности"})} className="d-block"/>
                    <div className="text-danger">  {errors.name && errors.name.message} </div>

                    <label htmlFor="code">Код специальности</label>
                    <input type="text" name="code" defaultValue={props.specialty.code || ""}
                           ref={register({required: "Введите код специальности"})} className="d-block"/>
                    <div className="text-danger">  {errors.code && errors.code.message} </div>


                    <label htmlFor="facultyId">Факультет</label>
                    <select className="form-control" name="facultyId" ref={register({required: "Выберите факультет"})}
                            value={faculty} onChange={e => setFaculty(e.target.value)}>
                        <option></option>
                        {faculties.map(faculty => <option key={faculty.publicId} value={faculty.publicId}>{faculty.name}</option>)}
                    </select>
                    <div className="text-danger">  {errors.facultyId && errors.facultyId.message} </div>

                    <DialogActions>
                        <button className="btn" onClick={handleClose}>Отмена</button>
                        <button className="btn" onClick={handleSubmit}>Сохранить</button>
                    </DialogActions>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SpecialtyForm;