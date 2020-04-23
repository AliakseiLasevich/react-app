import React from "react";
import style from "./AllCathedras.module.css";
import Cathedra from "../Cathedra/Cathedra";

const AllCathedras = (props) => {

    let cathedrassWithName = props.state.allCathedras.map(cathedra => <Cathedra name={cathedra.name}/>);

    return (
        <div className={style.AllCathedras}>
            {cathedrassWithName}
        </div>
    )
}

export default AllCathedras;