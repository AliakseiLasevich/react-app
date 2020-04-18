import React from "react";
import style from "./AddCathedra.module.css";

const AddCathedra = (props) => {
    return <div className={style.addFaculty}>
        Добавить Кафедру.
        <input/>
        <input type="button" value="+кафедра"/>
    </div>
}

export default AddCathedra;