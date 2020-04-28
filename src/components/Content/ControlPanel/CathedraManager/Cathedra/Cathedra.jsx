import React from "react";
import style from "./Cathedra.module.css";
import {NavLink} from "react-router-dom";

const Cathedra = (props) => {

    return (
        <div className={style.Cathedra}>
            <div>
                <NavLink to={"/cathedras/"+props.id}>
                    {props.id}. {props.name}
                </NavLink>

            </div>
        </div>
    )
}

export default Cathedra;