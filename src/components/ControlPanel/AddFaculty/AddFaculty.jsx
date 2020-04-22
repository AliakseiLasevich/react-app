import React from "react";
import style from "./AddFaculty.module.css";

const AddFaculty = (props) => {

    let newFacultyElement = React.createRef();

    let addFaculty = () => {
        let text = newFacultyElement.current.value;

        let emptyInputField = {
            type: "REDRAW-TEXT-INPUT",
            facultyText: ""
        }

        let obj = {
            type: "ADD-FACULTY",
            facultyName: text
        }
        props.dispatch(obj);
        props.dispatch(emptyInputField);
    };

    let onInputChange = () => {
        let text = newFacultyElement.current.value;
        let obj = {
            type: "REDRAW-TEXT-INPUT",
            facultyText: text
        }
        props.dispatch(obj);
    };

    return (
        <div className={style.addFaculty}>
            <input type="text" ref={newFacultyElement}
                   onChange={onInputChange}
                   value={props.state.inputTextField}/>
            <div><input type="button" value="+факультет" onClick={addFaculty}/></div>
        </div>

    )
};

export default AddFaculty;

