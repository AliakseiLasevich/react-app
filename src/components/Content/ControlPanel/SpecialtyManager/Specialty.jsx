import React, {useState} from 'react';
import activeGreen from "../../../../assets/img/active.png";
import inactive from "../../../../assets/img/inactive.png";
import EditSpecialty from "./EditSpcialty";


const Specialty = (props) => {

    const active = props.active ? <img src={activeGreen} alt="active"/> : <img src={inactive} alt="inactive"/>;

    const [editMode, setEditMode] = useState(false);

    return (
        <div onDoubleClick={() => {
            setEditMode(!editMode)
        }}>
            <div>

                {!editMode && <div><span>{props.id}. {props.name} , Код: {props.code}</span> {active} </div>}

                {editMode && <EditSpecialty name={props.name}
                                            id={props.id}
                                            code={props.code}
                                            active={props.active}
                                            facultyId={props.facultyId}
                                            setEditMode={setEditMode}/>}
            </div>
        </div>
    )
}

export default Specialty