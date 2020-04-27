import React from "react";
import style from "./Scheduler.module.css";
import Week from "./Week/Week";

const Scheduler = (props) => {
    return (
        <div>
            <div className={style.Scheduler}>Scheduler</div>
            <div><Week/></div>
            <div><Week/></div>
            <div><Week/></div>
        </div>
    )
}

export default Scheduler;