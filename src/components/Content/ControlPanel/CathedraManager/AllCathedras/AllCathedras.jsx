import React from "react";
import style from "./AllCathedras.module.css";

const AllCathedras = (props) => {
    return (
        <div className={style.AllCathedras}>
            {props.allCathedras}
        </div>
    )
};

export default AllCathedras;