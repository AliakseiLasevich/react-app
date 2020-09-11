import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import {useDispatch, useSelector} from "react-redux";
import {resetIdToDelete, setIdToDelete} from "../../redux/DeleteReducer";

const DeleteModal = (props) => {

    const [open, setOpen] = useState(true);
    const deleteMessage = useSelector(state => state.deleteReducer.message);
    const idToDelete = useSelector(state => state.deleteReducer.idToDelete);
    const deleteFunction = useSelector(state => state.deleteReducer.deleteFunction);
    const dispatch = useDispatch();

    const handleDelete = () => {
        deleteFunction(idToDelete);
        dispatch(setIdToDelete(""));
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(resetIdToDelete());
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Удалить"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="font-weight-bolder">
                        {`Вы уверены что хотите удалить ${deleteMessage}? Данную операцию нелья будет отменить.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Отмена
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteModal;