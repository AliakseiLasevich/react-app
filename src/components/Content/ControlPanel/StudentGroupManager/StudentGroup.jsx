import React, {useState} from "react";
import style from "../TeacherManager/Teacher.module.css";
import EditStudentGroup from "./EditStudentGroup";
import activeGreen from "../../../../assets/img/active.png";
import inactive from "../../../../assets/img/inactive.png";

const StudentGroup = (props) => {

    const active = props.active ? <img src={activeGreen} alt="active"/> : <img src={inactive} alt="inactive"/>;

    const [editMode, setEditMode] = useState(false);

    return (

        <div className={style.teacher} onDoubleClick={() => {
            setEditMode(!editMode)
        }}>


            {!editMode &&
            <div>
                Курс: {props.course}, Номер группы: {props.number}, Специальность: {props.specialtyName} {active}
            </div>}

            {editMode && <EditStudentGroup name={props.number}
                                           id={props.id}
                                           number={props.number}
                                           course={props.course}
                                           active={props.active}
                                           specialtyId={props.specialtyId}
                                           setEditMode={setEditMode}/>}


        </div>
    )
};

export default StudentGroup;