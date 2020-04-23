import React from "react";
import style from "./AddFaculty.module.css";
import {addFacultyActionCreator, FacultyTextUpdateActionCreator} from "../../../../state/addFacultyReducer";

const AddFaculty = (props) => {

    let newFacultyElement = React.createRef();

    let addFaculty = () => {
        let text = newFacultyElement.current.value;
        props.dispatch(addFacultyActionCreator(text));
    };

    let onInputChange = () => {
        let text = newFacultyElement.current.value;
        props.dispatch(FacultyTextUpdateActionCreator(text));
    };

    return (
        <div className={style.addFaculty}>
            <input type="text" ref={newFacultyElement} onChange={onInputChange}
                   value={props.state.facultyInputTextField}/>
            <div><input type="button" value="+факультет" onClick={addFaculty}/></div>
        </div>

    )
};

export default AddFaculty;

