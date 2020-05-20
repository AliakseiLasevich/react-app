import React, {useState} from 'react';
import activeGreen from "../../../../assets/img/active.png";
import inactive from "../../../../assets/img/inactive.png";
import style from "./Teacher.module.css";
import TeacherEdit from "./TeacherEdit";

const Teacher = (props) => {

    const active = props.active ? <img src={activeGreen} alt="active"/> : <img src={inactive} alt="inactive"/>;

    const [editMode, setEditMode] = useState(false);

    return (
        <div className={style.teacher} onDoubleClick={() => {
            setEditMode(!editMode)
        }}>
            <div className={style.teacherBlock}>
                {!editMode && <div><span className={style.teacherName}>{props.id}. {props.name} </span> <span
                    className={style.cathedra}> {props.cathedra}</span>{active} </div>}

                {editMode && <TeacherEdit name={props.name}
                                          id={props.id}
                                          active={props.active}
                                          cathedraId={props.cathedraId}
                                          setEditMode={setEditMode}/>}
            </div>
        </div>
    )
}

export default Teacher