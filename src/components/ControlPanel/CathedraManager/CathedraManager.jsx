import React from "react";
import style from "./CathedraManager.module.css";
import AllCathedras from "./AllCathedras/AllCathedras";
import AddCathedra from "./AddCathedra/AddCathedra";

const CathedraManager = (props) => {
debugger
    return (

        <div className={style.CathedraManager}>
            <AllCathedras state={props.state}/>
            <AddCathedra state={props.state}
                         dispatch={props.dispatch}
            />

        </div>
    )
}

export default CathedraManager;