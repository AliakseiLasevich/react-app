import React from 'react';
import {useForm} from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useDispatch} from "react-redux";
import {createStudentSubgroup} from "../../redux/StudentsReducer";

const StudentsSubgroupForm = (props) => {
    const {register, handleSubmit, errors} = useForm({});
    const dispatch = useDispatch();
    const handleClose = () => {
        props.setEditMode(false);
    };

    const onSubmit = (subgroup) => {
        subgroup.studentGroupId = props.studentGroup.publicId;
        dispatch(createStudentSubgroup(subgroup, props.studentCourse.publicId));
        props.setEditMode(false);
    };

    return (
        <Dialog open={true}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth={false}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Группа:</label>
                    <input className="form-control" name="name"
                           placeholder={"Введите название группы"}
                           ref={register({required: "Введите название группы"})}/>
                    <div className="text-danger">  {errors.name && errors.name.message} </div>

                    <input className="form-control" name="studentsCount"
                           placeholder={"Введите кол-во студентов"}
                           ref={register({required: "Введите кол-во студентов"})}/>
                    <div className="text-danger">  {errors.studentsCount && errors.studentsCount.message} </div>

                    <button className="btn btn-info" type={"submit"}>Сохранить</button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StudentsSubgroupForm;