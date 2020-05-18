import React, {useState} from "react";
import style from "./Faculty.module.css";
import FacultyEdit from "./FacultyEdit";
import activeGreen from "../../../../assets/img/active.png";
import inactive from "../../../../assets/img/inactive.png";

const Faculty = (props) => {

    const [editMode, setEditMode] = useState(false);
    const active = props.active ? <img src={activeGreen} alt="active"/> : <img src={inactive} alt="inactive"/>;

    return (
        <div className={style.faculty} onDoubleClick={() => {
            setEditMode(!editMode)
        }}>
            {!editMode && (<div>
                <div>{props.id}. {props.name}. {active}</div>
            </div>)}
            {editMode && <FacultyEdit name={props.name} id={props.id} active={props.active} setEditMode={setEditMode}/>}
        </div>

    )
};

export default Faculty;
