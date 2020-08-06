import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {useDispatch, useSelector} from "react-redux";
import {createCathedra, updateCathedra} from "../../../../redux/CathedraReducer";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {getFaculties} from "../../../../redux/FacultyReducer";

const CathedraForm = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(props.cathedra.name || "");
    const [facultyId, setFacultyId] = useState(props.cathedra?.faculty?.publicId || {});

    useEffect(() => {
        dispatch(getFaculties())
    }, [dispatch, props.cathedra]);

    const faculties = useSelector(state => state.facultyReducer.allFaculties);

    const handleClose = () => {
        props.setCathedraToEdit({});
        props.setEditMode(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleFacultyChange = (event) => {
        setFacultyId(event.target.value)
    };

    const handleSubmit = () => {
        let cathedra = {
            name: name
        };
        if (props.cathedra.publicId) {
            dispatch(updateCathedra({...cathedra, facultyId}, props.cathedra.publicId))
        } else {
            dispatch(createCathedra(cathedra, facultyId))
        }
        props.setCathedraToEdit({});
        props.setEditMode(false);
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">

            <DialogTitle
                id="form-dialog-title">{props.cathedra.name ? "Редактирование" : "Добавить кафедру"}</DialogTitle>
            <DialogContent>
                <TextField autoFocus
                           margin="dense"
                           id="name"
                           label="Название кафедры"
                           type="text"
                           fullWidth
                           onChange={handleNameChange}
                           defaultValue={props.cathedra.name}
                           error={name.length === 0}/>

                <InputLabel htmlFor="faculty">Факультет</InputLabel>
                <Select native
                        value={facultyId}
                        onChange={handleFacultyChange}
                        inputProps={{
                            name: 'Факультет',
                            id: 'faculty',
                        }}
                        error={!facultyId}

                >
                    <option aria-label="None" value=""/>
                    {faculties.map(faculty => <option value={faculty.publicId}>{faculty.name}</option>)}
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

export default CathedraForm;