import React, {useState} from "react";
import style from "./Faculty.module.css";
import FacultyEdit from "../FacultyEdit/FacultyEdit";

const Faculty = (props) => {

    const [editMode, setEditMode] = useState(false);
    const active = props.active? "+": "-";

    return (
        <div className={style.faculty} onDoubleClick={() => {
            setEditMode(!editMode)
        }}>
            {!editMode && (<div><div>{props.id}. {props.name}. {active}</div></div>)}
            {editMode && <FacultyEdit name={props.name} id={props.id} setEditMode={setEditMode}/>}
        </div>

    )
};

export default Faculty;
