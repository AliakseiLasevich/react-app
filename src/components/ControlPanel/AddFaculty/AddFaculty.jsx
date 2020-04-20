import React from "react";
import style from "./AddFaculty.module.css";
import {redrawTextInput} from "../../../state/state";

const AddFaculty = (props) => {



    let newFacultyElement = React.createRef();

    let addFaculty = () => {
        let text = newFacultyElement.current.value;
        props.addFaculty(text);
        props.redrawTextInput("");
        debugger
    };

    let onInputChange = ()=>{
        let text = newFacultyElement.current.value;
        props.redrawTextInput(text);
    };

    return (
        <div className={style.addFaculty}>
            <input type="text" ref={newFacultyElement} onChange={onInputChange} value={props.state.inputTextField} />
            <div><input type="button" value="+факультет" onClick={addFaculty}/></div>
        </div>

    )
};

export default AddFaculty;

