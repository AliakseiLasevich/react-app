import React from "react";
import style from "./AddFaculty.module.css";

const AddFaculty = (props) => {

    let newFacultyElement = React.createRef();

    let addFaculty = () => {
        let text = newFacultyElement.current.value;
        props.addFaculty(text);
        newFacultyElement.current.value="";
    };

    return (
        <div className={style.addFaculty}>
            {/*<div><textarea ref/></div>*/}
            <input type="text" ref={newFacultyElement}/>
            <div><input type="button" value="+факультет" onClick={addFaculty}/></div>
        </div>

    )
};

export default AddFaculty;

