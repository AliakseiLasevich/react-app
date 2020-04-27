import React from "react";
import style from "./AllCathedras.module.css";
import Cathedra from "../Cathedra/Cathedra";

const AllCathedras = (props) => {
    return (
        <div className={style.AllCathedras}>
            {props.allCathedras}
        </div>
    )
};

export default AllCathedras;