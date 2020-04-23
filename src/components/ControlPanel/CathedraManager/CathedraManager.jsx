import React from "react";
import style from "./CathedraManager.module.css";
import AllCathedras from "./AllCathedras/AllCathedras";
import AddCathedraContainer from "./AddCathedra/AddCathedraContainer";

const CathedraManager = (props) => {

    return (

        <div className={style.CathedraManager}>
            <AllCathedras state={props.state}/>
            <AddCathedraContainer store={props.store}/>

        </div>
    )
}

export default CathedraManager;