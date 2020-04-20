import React from "react";
import style from "./Content.module.css";
import ControlPanel from "../ControlPanel/ControlPanel";

const Content = (props) =>{
    return (
    <div className={style.content}>
        <ControlPanel state={props.state} addFaculty={props.addFaculty}/>
    </div>
)
}

export default Content;