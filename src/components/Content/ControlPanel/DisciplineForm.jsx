import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {useDispatch} from "react-redux";
import {createDiscipline, updateDiscipline} from "../../../redux/DisciplinesReducer";


const DisciplineForm = (props) => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('Controlled');

    const handleClose = () => {
        props.setDisciplineToEdit({});
        props.setEditMode(false);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = () => {
        let discipline = {
            name: value
        };
        if (props.discipline.publicId) {
            dispatch(updateDiscipline(discipline, props.discipline.publicId))
        } else {
            dispatch(createDiscipline(discipline))
        }
        props.setDisciplineToEdit({});
        props.setEditMode(false);
    };

    return (
        <Dialog open={props.editMode} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle
                id="form-dialog-title">{props.discipline.name ? "Редактирование" : "Добавить дисциплину"}</DialogTitle>
            <DialogContent>
                <TextField autoFocus
                           margin="dense"
                           id="name"
                           label="Название дисциплины"
                           type="text"
                           fullWidth
                           onChange={handleChange}
                           defaultValue={props.discipline.name}/>
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

export default DisciplineForm;