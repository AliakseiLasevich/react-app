import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {getCathedrasWithFaculties} from "../../../../redux/CathedraReducer";
import {useForm} from "react-hook-form";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {createTeacher, updateTeacher} from "../../../../redux/TeacherReducer";

const BuildingsForm = (props) => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const [cathedraId, setCathedraId] = useState(props.teacher?.cathedra?.publicId || {});

    const cathedras = useSelector(state => state.cathedraReducer.allCathedras);

    useEffect(() => {
        dispatch(getCathedrasWithFaculties());
    }, [dispatch]);

    const handleClose = () => {
        // props.setTeacherToEdit({});
        // props.setEditMode(false);
    };

    const onSumbit = ({cathedraId, name}) => {
        // let teacher = {
        //     name,
        //     cathedraId
        // };
        // if (props.teacher.publicId) {
        //     dispatch(updateTeacher(teacher, props.teacher.publicId))
        // } else {
        //     dispatch(createTeacher(teacher))
        // }
        // props.setTeacherToEdit({});
        // props.setEditMode(false);
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <form onSubmit={handleSubmit(onSumbit)}>

                    {/*<label htmlFor="name">Имя преподавателя</label>*/}
                    {/*<input type="text" name="name" defaultValue={props.teacher.name || ""}*/}
                    {/*       ref={register({required: "Введите имя преподавателя"})} className="d-block"/>*/}
                    {/*<div className="text-danger">  {errors.name && errors.name.message} </div>*/}

                    {/*<label htmlFor="cathedra">Кафедра</label>*/}
                    {/*<select className="form-control" name="cathedraId" ref={register({required: "Выберите кафедру"})}*/}
                    {/*        value={cathedraId} onChange={e => setCathedraId(e.target.value)}>*/}
                    {/*    <option></option>*/}
                    {/*    {cathedras.map(cathedra => <option value={cathedra.publicId}>{cathedra.name}</option>)}*/}
                    {/*</select>*/}
                    {/*<div className="text-danger">  {errors.cathedraId && errors.cathedraId.message} </div>*/}

                    <DialogActions>
                        <button className="btn" onClick={handleClose}>Отмена</button>
                        <button className="btn" onClick={handleSubmit}>Сохранить</button>
                    </DialogActions>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BuildingsForm;