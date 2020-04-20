import React from "react";
import style from "./Content.module.css";
import ControlPanel from "../ControlPanel/ControlPanel";

const Content = (props) =>{
    return (
    <div className={style.content}>
        <ControlPanel source={props.source}/>
    </div>
)
}

export default Content;