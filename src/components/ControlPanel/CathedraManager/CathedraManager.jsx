import React from "react";
import style from "./CathedraManager.module.css";
import AddCathedraContainer from "./AddCathedra/AddCathedraContainer";
import AllCathedrasContainer from "./AllCathedras/AllCathedrasContainer";

const CathedraManager = (props) => {

    return (
        <div className={style.CathedraManager}>
            <AllCathedrasContainer/>
            <AddCathedraContainer/>
        </div>
    )
}

export default CathedraManager;