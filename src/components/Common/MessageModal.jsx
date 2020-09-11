import React from 'react';

import {useDispatch} from "react-redux";
import {setMessage} from "../../redux/MessageReducer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const MessageModal = (props) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setMessage(""));
    };

    return (
        <>
            <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent className="d-flex justify-content-center m-2">
                    <div className="row justify-content-center">
                        <div className="alert alert-danger col-12" role="alert">
                            {props.message}
                        </div>
                        <button className="btn btn-secondary btn-sm col-3" onClick={() => handleClose()}>OK</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MessageModal;