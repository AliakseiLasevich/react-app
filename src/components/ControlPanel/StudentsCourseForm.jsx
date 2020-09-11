import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {requestSpecialties} from "../../redux/SpecialtyReducer";
import {createStudentCourse, updateStudentCourse} from "../../redux/StudentsReducer";

const StudentsCourseForm = (props) => {

    const dispatch = useDispatch();
    const specialties = useSelector(state => state.specialtyReducer.allSpecialties);
    const [specialty, setSpecialty] = useState(props.studentCourseToEdit?.specialty?.publicId || {});

    useEffect(() => {
        dispatch(requestSpecialties())

    }, [dispatch]);

    const handleClose = () => {
        props.setStudentCourseToEdit(null);
    };

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        if (props.studentCourseToEdit.publicId != undefined) {
            dispatch(updateStudentCourse(data, props.studentCourseToEdit.publicId))
        } else {
            dispatch(createStudentCourse(data));
        }
        props.setStudentCourseToEdit(null);
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={false}>
            <DialogContent style={{minWidth: "70vh"}}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-row m-3">
                        <div className="col">
                            <label htmlFor="specialtyId">Специальность:</label>
                            <select className="form-control col" name="specialtyId"
                                    ref={register({required: "Выберите специальность"})}
                                    value={specialty} onChange={e => setSpecialty(e.target.value)}>
                                <option></option>
                                {specialties.map(specialty => <option key={specialty.publicId}
                                                                      value={specialty.publicId}>{specialty.name}</option>)}
                            </select>
                            <div className="text-danger">  {errors.specialtyId && errors.specialtyId.message} </div>
                        </div>

                        <div className="col-3">
                            <label htmlFor="courseNumber">Курс:</label>
                            <select className="form-control col" name="courseNumber"
                                    ref={register({required: "Выберите курс"})}
                                    defaultValue={props.studentCourseToEdit.courseNumber}>
                                <option></option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                            <div className="text-danger">  {errors.courseNumber && errors.courseNumber.message} </div>
                        </div>

                    </div>

                    <DialogActions>
                        <button className="btn" onClick={handleClose}>Отмена</button>
                        <button className="btn" onClick={handleSubmit}>Сохранить</button>
                    </DialogActions>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default StudentsCourseForm;