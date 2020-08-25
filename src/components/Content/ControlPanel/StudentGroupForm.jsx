import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {createSpecialty, requestSpecialties, updateSpecialty} from "../../../redux/SpecialtyReducer";

const StudentGroupForm = (props) => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const specialties = useSelector(state => state.specialtyReducer.allSpecialties);
    const [specialty, setSpecialty] = useState(props.studentGroup?.specialtyId || {});

    useEffect(() => {
        dispatch(requestSpecialties())

    }, [dispatch]);

    const handleClose = () => {
        props.setStudentGroupToEdit({});
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

                    <label htmlFor="specialtyId">Специальность</label>
                    <select className="form-control" name="specialtyId" ref={register({required: "Выберите специальность"})}
                            value={specialty} onChange={e => setSpecialty(e.target.value)}>
                        <option></option>
                        {specialties.map(specialty => <option key={specialty.publicId} value={specialty.publicId}>{specialty.name}</option>)}
                    </select>
                    <div className="text-danger">  {errors.specialtyId && errors.specialtyId.message} </div>


                    {/*<label htmlFor="name">Название специальности</label>*/}
                    {/*<input type="text" name="name" defaultValue={props.specialty.name || ""}*/}
                    {/*       ref={register({required: "Введите название специальности"})} className="d-block"/>*/}
                    {/*<div className="text-danger">  {errors.name && errors.name.message} </div>*/}

                    {/*<label htmlFor="code">Код специальности</label>*/}
                    {/*<input type="text" name="code" defaultValue={props.specialty.code || ""}*/}
                    {/*       ref={register({required: "Введите код специальности"})} className="d-block"/>*/}
                    {/*<div className="text-danger">  {errors.code && errors.code.message} </div>*/}




                    <DialogActions>
                        <button className="btn" onClick={handleClose}>Отмена</button>
                        <button className="btn" onClick={handleSubmit}>Сохранить</button>
                    </DialogActions>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StudentGroupForm;