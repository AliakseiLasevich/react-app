import React from "react";
import style from "./AddFaculty.module.css";

const AddFaculty = (props) => {
    return <div className={style.addFaculty}>
        Добавить факультет.
        <input/>
        <input type="button" value="+факультет"/>
    </div>
}

export default AddFaculty;