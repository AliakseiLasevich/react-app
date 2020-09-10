import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useDispatch} from "react-redux";
import {createStudentGroup} from "../../../redux/StudentsReducer";

const StudentsGroupForm = (props) => {

    const {register, handleSubmit, errors} = useForm({});
    const dispatch = useDispatch();

    const onSubmit = (studentGroup) => {
        studentGroup.courseId = props.course.publicId;
        dispatch(createStudentGroup(studentGroup));
    };
    const handleClose = () => {
        props.setEditMode(false);
    };

    return (
        <Dialog open={true}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth={false}>
            <DialogContent>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="justify-content-center">
                        <label htmlFor="number">Номер группы</label>
                        <div>
                            <input name="number"
                                   placeholder={"Введите Номер группы"}
                                   ref={register({required: "Номер группы"})}/>
                        </div>
                    </div>
                    <button className="btn btn-secondary mx-2">Сохранить</button>
                </form>
            </DialogContent>
        </Dialog>

    );
};

export default StudentsGroupForm;