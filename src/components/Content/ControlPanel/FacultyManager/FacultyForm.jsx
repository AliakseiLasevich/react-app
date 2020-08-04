import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const FacultyForm = (props) => {
    const [value, setValue] = React.useState('Controlled');

    const handleClickOpen = () => {
        props.setEditMode(false);
    };

    const handleClose = () => {
        props.setFacultyToEdit({});
        props.setEditMode(false);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        props.setEditMode(false);
    };

    return (
        <Dialog open={props.editMode} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle
                id="form-dialog-title">{props.faculty.name ? "Редактирование" : "Добавить факультет"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Название факультета"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    defaultValue={props.faculty.name}
                />
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

export default FacultyForm;