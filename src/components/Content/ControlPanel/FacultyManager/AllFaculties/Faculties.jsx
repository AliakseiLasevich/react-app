import React from "react";
import style from "./AllFaculties.module.css";

let Faculties = (props) => {

    return (
        <div className={style.AllFaculties}>
            {props.facultiesWithName}
        </div>
    )
};

export default Faculties;