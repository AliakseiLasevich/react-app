import React from "react";
import style from "./Faculty.module.css";

const Faculty = (props) => {

    return (
        <div className={style.Faculty}>
            <div>
                {props.name}
            </div>
        </div>
    )
}

export default Faculty;