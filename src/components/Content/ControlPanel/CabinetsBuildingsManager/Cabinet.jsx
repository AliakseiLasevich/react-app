import React, {useState} from "react";
import style from "./Cabinet.module.css";
import EditCabinet from "./EditCabinet";

const Cabinet = (props) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <div onDoubleClick={() => {
            setEditMode(!editMode)
        }}>

            {/*if not editmode, show simple cabinet*/}
            {!editMode &&
            <div className={style.cabinetItem}>
                Кабинет №: {props.number}, вместимость: {props.maxStudents}, тип: {props.type}
            </div>
            }

            {/*if editmode enabled, show cabinet edit form*/}
            {editMode && <EditCabinet id={props.id}
                                      maxStudents={props.maxStudents}
                                      type={props.type}
                                      number={props.number}
                                      setEditMode={setEditMode}
                                      buildingId={props.buildingId}
                                      active={props.active}
            />}
        </div>
    )
};

export default Cabinet;