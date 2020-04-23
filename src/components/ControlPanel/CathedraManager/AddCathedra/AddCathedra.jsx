import React from "react";
import style from "./AddCathedra.module.css";
import {CathedraTextUpdateActionCreator, AddCathedraActionCreator} from "../../../../redux/CathedraReducer";

const AddCathedra = (props) => {

    let cathedraInputTextField = props.state.cathedraInputTextField;

    let onAddCathedraClick = () => {
        let newCathedra = props.state.cathedraInputTextField;
        props.dispatch(AddCathedraActionCreator(newCathedra));
    }

    let onInputFieldChange = (event) => {
        let body = event.target.value;
        props.state.cathedraInputTextField = body;
        props.dispatch(CathedraTextUpdateActionCreator(body));
    }


    return <div className={style.addFaculty}>
        <div>Добавить Кафедру.</div>

        <input type="text" onChange={onInputFieldChange} value={cathedraInputTextField} placeholder="enter name"/>
        <input type="button" value="+кафедра" onClick={onAddCathedraClick}/>
    </div>
}

export default AddCathedra;

