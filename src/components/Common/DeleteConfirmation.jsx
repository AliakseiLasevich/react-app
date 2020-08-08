import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

const DeleteConfirmation = (props) => {

    const handleDelete = () => {
        props.setIdToDelete(props.publicId);
        props.setOpen(false);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Удалить"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="text-danger font-weight-bolder">
                        {`Вы уверены что хотите удалить ${props.message}? Данную операцию нелья будет отменить.`}
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

export default DeleteConfirmation;