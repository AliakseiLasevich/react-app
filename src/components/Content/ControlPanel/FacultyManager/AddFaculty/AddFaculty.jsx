import React from "react";
import style from "./AddFaculty.module.css";

const AddFaculty = (props) => {

    let onInputChange = (event) => {
        let text = event.target.value;
        props.updateInputField(text);
    };

    return (
        <div className={style.addFaculty}>
            <div><input type="text" onChange={onInputChange} value={props.facultyInputTextField}/></div>
            <div><input type="button" value="+факультет" onClick={props.addFaculty}/></div>
        </div>

    )
};

export default AddFaculty;

