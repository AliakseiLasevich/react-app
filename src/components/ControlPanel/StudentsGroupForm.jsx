import React from 'react';
import {useForm} from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useDispatch} from "react-redux";
import {createStudentGroup, updateStudentGroup} from "../../redux/StudentsReducer";

const StudentsGroupForm = ({groupToEdit, setGroupToEdit, studentCourse}) => {

    const {register, handleSubmit, errors} = useForm({});
    const dispatch = useDispatch();

    const onSubmit = (studentGroup) => {
        studentGroup.courseId = studentCourse.publicId;

        if (groupToEdit.publicId != undefined) {
            dispatch(updateStudentGroup(studentGroup, groupToEdit.publicId))
        } else {
            dispatch(createStudentGroup(studentGroup));
        }
        setGroupToEdit(null);
    };

    const handleClose = () => {
        setGroupToEdit(null);
    };

    return (
        <Dialog open={true}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth={false}>
            <DialogContent>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="justify-content-center m-2 text-center">
                        <label htmlFor="number">Номер группы</label>
                        <div>
                            <input name="number"
                                   placeholder={"Введите Номер группы"}
                                   ref={register({required: "Номер группы"})}
                                   defaultValue={groupToEdit.number}
                            />
                        </div>
                    </div>
                    <button className="btn btn-secondary mx-2" onClick={() => handleClose()}>Отмена</button>
                    <button className="btn btn-secondary mx-2">Сохранить</button>
                </form>
            </DialogContent>
        </Dialog>

    );
};

export default StudentsGroupForm;