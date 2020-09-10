import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {useDispatch, useSelector} from "react-redux";
import {createCathedra, updateCathedra} from "../../redux/CathedraReducer";
import {requestFaculties} from "../../redux/FacultyReducer";
import {useForm} from "react-hook-form";

const CathedraForm = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const [facultyId, setFacultyId] = useState(props.cathedra?.faculty?.publicId || {});

    const faculties = useSelector(state => state.facultyReducer.allFaculties);

    useEffect(() => {
        dispatch(requestFaculties());
    }, [dispatch]);

    const handleClose = () => {
        props.setCathedraToEdit({});
        props.setEditMode(false);
    };

    const onSubmit = ({facultyId, name}) => {
        let cathedra = {
            name,
            facultyId
        };
        if (props.cathedra.publicId) {
            dispatch(updateCathedra(cathedra, props.cathedra.publicId))
        } else {
            dispatch(createCathedra(cathedra))
        }
        props.setCathedraToEdit({});
        props.setEditMode(false);
    };
    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="name">Название кафедры</label>
                    <input type="text" name="name" defaultValue={props.cathedra.name || ""}
                           ref={register({required: "Введите название кафедры"})} className="d-block"/>
                    <div className="text-danger">  {errors.name && errors.name.message} </div>

                    <label htmlFor="cathedra">Факультет</label>
                    <select className="form-control" name="facultyId" ref={register({required: "Выберите факультет"})}
                            value={facultyId} onChange={e => setFacultyId(e.target.value)}>
                        <option></option>
                        {faculties.map(faculty => <option value={faculty.publicId}>{faculty.name}</option>)}
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

export default CathedraForm;