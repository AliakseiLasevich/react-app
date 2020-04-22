import React from "react";
import style from "./Content.module.css";
import ControlPanel from "../ControlPanel/ControlPanel";

const Content = (props) =>{
    return (
    <div className={style.content}>
        <ControlPanel state={props.state}
                      dispatch={props.dispatch}
        />
    </div>
)
}

export default Content;