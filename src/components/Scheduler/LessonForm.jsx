import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

const LessonForm = () => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const handleClose = () => {
    };

    const onSubmit = (specialty) => {
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogActions>
                        <button className="btn" onClick={handleClose}>Отмена</button>
                        <button className="btn" onClick={handleSubmit}>Сохранить</button>
                    </DialogActions>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LessonForm;