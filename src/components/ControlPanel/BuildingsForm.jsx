import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {createBuilding, updateBuilding} from "../../redux/BuildingsReducer";

const BuildingsForm = (props) => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const handleClose = () => {
        props.setBuildingToEdit({});
        props.setEditMode(false);
    };

    const onSubmit = ({name}) => {
        let building = {
            name
        };
        if (props.building.publicId) {
            dispatch(updateBuilding(building, props.building.publicId))
        } else {
            dispatch(createBuilding(building))
        }
        props.setBuildingToEdit({});
        props.setEditMode(false);
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="name">Название здания</label>
                    <input type="text" name="name" defaultValue={props.building.name || ""}
                           ref={register({required: "Введите название здания"})} className="d-block"/>
                    <div className="text-danger">  {errors.name && errors.name.message} </div>

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