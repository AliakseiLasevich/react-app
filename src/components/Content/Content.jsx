import React from "react";
import style from "./Content.module.css";
import ControlPanel from "../ControlPanel/ControlPanel";
import {redrawTextInput} from "../../state/state";

const Content = (props) =>{
    return (
    <div className={style.content}>
        <ControlPanel state={props.state}
                      addFaculty={props.addFaculty}
                      redrawTextInput={props.redrawTextInput}/>
    </div>
)
}

export default Content;