import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {useDispatch, useSelector} from "react-redux";
import {createTeacher, updateTeacher} from "../../../../redux/TeacherReducer";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {getCathedrasWithFaculties} from "../../../../redux/CathedraReducer";

const TeacherForm = (props) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(props.teacher.name || "");
    const [cathedraId, setCathedraId] = useState(props.teacher?.cathedra?.publicId || {});

    const cathedras = useSelector(state => state.cathedraReducer.allCathedras);

    useEffect(() => {
        dispatch(getCathedrasWithFaculties());
    }, [dispatch]);

    const handleClose = () => {
        props.setTeacherToEdit({});
        props.setEditMode(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCathedraChange = (event) => {
        setCathedraId(event.target.value)
    };
console.log(props)

    const handleSubmit = () => {
        let teacher = {
            name: name,
            cathedraId
        };
        if (props.teacher.publicId) {
            dispatch(updateTeacher(teacher, props.teacher.publicId))
        } else {
            dispatch(createTeacher(teacher))
        }
        props.setTeacherToEdit({});
        props.setEditMode(false);
    };

    return (
        <Dialog open={props.editMode} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle
                id="form-dialog-title">{props.teacher.name ? "Редактирование" : "Добавить преподавателя"}</DialogTitle>
            <DialogContent>
                <TextField autoFocus
                           margin="dense"
                           id="name"
                           label="Имя преподавателя"
                           type="text"
                           fullWidth
                           onChange={handleNameChange}
                           defaultValue={props.teacher.name}/>

                <InputLabel htmlFor="cathedra">Кафедра</InputLabel>
                <Select native
                        value={props.teacher?.cathedra?.publicId}
                        onChange={handleCathedraChange}
                        inputProps={{
                            name: 'Кафедра',
                            id: 'cathedra',
                        }}
                        error={!cathedraId}>
                    <option aria-label="None" value=""/>
                    {cathedras.map(cathedra => <option value={cathedra.publicId}>{cathedra.name}</option>)}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TeacherForm;