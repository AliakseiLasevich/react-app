import React from "react";
import style from "./Cathedra.module.css";

const Cathedra = (props) => {

    return (
        <div className={style.Cathedra}>
            <div>
                {props.name}
            </div>
        </div>
    )
}

export default Cathedra;