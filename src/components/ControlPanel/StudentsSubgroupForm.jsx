import React from 'react';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {createStudentSubgroup, updateStudentSubgroup} from "../../redux/StudentsReducer";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const StudentsSubgroupForm = ({studentGroup, subgroupToEdit, setSubgroupToEdit}) => {
    const {register, handleSubmit, errors} = useForm({});
    const dispatch = useDispatch();

    const onSubmit = (subgroup) => {
        if (subgroupToEdit.publicId) {
            subgroup.studentGroupId = studentGroup.publicId;
            dispatch(updateStudentSubgroup(subgroup, subgroupToEdit.publicId));
            setSubgroupToEdit(null)
        } else {
            subgroup.studentGroupId = studentGroup.publicId;
            dispatch(createStudentSubgroup(subgroup, studentGroup.publicId));
            setSubgroupToEdit(null)
        }
    };

    const deleteSubgroup = () => {
        // dispatch(deleteStudentSubgroup(subgroup.publicId))
    };

    const handleClose = () => {
        setSubgroupToEdit(null)
    };
    return (
        <Dialog open={true}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
        >
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="row justify-content-center text-center">
                    <label htmlFor="name" className="col-12">Название подгруппы:</label>
                    <input className="form-control col-7" name="name"
                           placeholder={"Введите название группы"}
                           ref={register({required: "Введите название группы"})}
                           defaultValue={subgroupToEdit?.name}/>
                    <div className="text-danger">  {errors.name && errors.name.message} </div>

                    <label htmlFor="studentsCount" className="col-12">Кол-во студентов:</label>
                    <input className="form-control col-7" name="studentsCount"
                           placeholder={"Введите кол-во студентов"}
                           ref={register({required: "Введите кол-во студентов"})}
                           defaultValue={subgroupToEdit?.studentsCount}/>
                    <div className="text-danger">  {errors.studentsCount && errors.studentsCount.message} </div>

                    <div className="col-12">
                        <button className="btn btn-info mt-2 mx-1" type={"submit"}
                                onClick={() => handleClose()}>Отмена
                        </button>
                        <button className="btn btn-info  mt-2 mx-1" type={"submit"}>Сохранить</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StudentsSubgroupForm;