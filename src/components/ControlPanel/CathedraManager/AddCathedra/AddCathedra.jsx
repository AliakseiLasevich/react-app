import React from "react";
import style from "./AddCathedra.module.css";


const AddCathedra = (props) => {

    let onInputFieldChange = (event) => {
        let body = event.target.value;
        props.onInputFieldChange(body);
    };

    return <div className={style.AddCathedra}>
        <input type="text" onChange={onInputFieldChange} value={props.cathedraInputTextField} placeholder="enter name"/>
        <input type="button" value="+кафедра" onClick={props.onAddCathedraClick}/>

        <div>Добавить Кафедру.</div>

    </div>
}

export default AddCathedra;

