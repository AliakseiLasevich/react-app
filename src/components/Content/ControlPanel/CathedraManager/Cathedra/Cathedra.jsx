import React, {useState} from "react";
import style from "./Cathedra.module.css";
import activeGreen from "../../../../../assets/img/active.png";
import inactive from "../../../../../assets/img/inactive.png";
import CathedraEdit from "../CathedraEdit/CathedraEdit";

const Cathedra = (props) => {

    const active = props.active ? <img src={activeGreen} alt="active"/> : <img src={inactive} alt="inactive"/>;

    const [editMode, setEditMode] = useState(false);


    return (
        <div className={style.Cathedra} onDoubleClick={() => {
            setEditMode(!editMode)
        }}>
            <div className={style.cathedraBlock}>
                {!editMode && <div><span className={style.cathedraName} >{props.id}. {props.name} </span> <span className={style.faculty}> {props.facultyName}</span>{active} </div>}

                {editMode && <CathedraEdit name={props.name}
                                           id={props.id}
                                           active={props.active}
                                           facultyName={props.facultyName}
                                           facultyId={props.facultyId}
                                           setEditMode={setEditMode}/>}
            </div>
        </div>
    )
};

export default Cathedra;