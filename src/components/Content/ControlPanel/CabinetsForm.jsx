import React, {useEffect, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {createCabinet, updateCabinet} from "../../../redux/CabinetsReducer";
import {requestBuildings} from "../../../redux/BuildingsReducer";

const CabinetsForm = (props) => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const [buildingId, setBuildingId] = useState(props.cabinet?.buildingId || {});
    const [cabinetType, setCabinetType] = useState(props.cabinet?.type || {});
    const buildings = useSelector(state => state.buildingsReducer.allBuildings);

    useEffect(() => {
      dispatch(requestBuildings())
    }, [dispatch]);

    const handleClose = () => {
        props.setCabinetToEdit({});
        props.setEditMode(false);
    };

    const onSubmit = (cabinet) => {
        if (props.cabinet.publicId) {
            dispatch(updateCabinet(cabinet, props.cabinet.publicId))
        } else {
            dispatch(createCabinet(cabinet))
        }
        props.setCabinetToEdit({});
        props.setEditMode(false);
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="buildingId">Здание</label>
                    <select className="form-control" name="buildingId" ref={register({required: "Выберите здание"})}
                            value={buildingId} onChange={e => setBuildingId(e.target.value)}>
                        <option></option>
                        {buildings.map(building => <option value={building.publicId}>{building.name}</option>)}
                    </select>
                    <div className="text-danger">  {errors.building && errors.building.message} </div>

                    <label htmlFor="number">Номер кабинета</label>
                    <input type="text" name="number" defaultValue={props.cabinet.number || ""}
                           ref={register({required: "Введите номер кабинета"})} className="d-block"/>
                    <div className="text-danger">  {errors.number && errors.number.message} </div>

                    <label htmlFor="maxStudents">Максимальная вместимость</label>
                    <input type="text" name="maxStudents" defaultValue={props.cabinet.maxStudents || ""}
                           ref={register({required: "Введите кол-во мест"})} className="d-block"/>
                    <div className="text-danger">  {errors.maxStudents && errors.maxStudents.message} </div>

                    <label htmlFor="type">Тип</label>
                    <select className="form-control" name="type"
                            ref={register({required: "Выберите тип кабинета"})}
                            value={cabinetType} onChange={e => setCabinetType(e.target.value)}>
                        <option></option>
                        <option value="Лекционный">Лекционный</option>
                        <option value="Практический">Практический</option>
                        <option value="Компьютерный">Компьютерный</option>
                    </select>
                    <div className="text-danger">  {errors.type && errors.type.message} </div>


                    <DialogActions>
                        <button className="btn" onClick={handleClose}>Отмена</button>
                        <button className="btn" onClick={handleSubmit}>Сохранить</button>
                    </DialogActions>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CabinetsForm;