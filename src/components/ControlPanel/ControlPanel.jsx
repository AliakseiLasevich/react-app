import React from "react";
import style from "./ControlPanel.module.css";
import AddFaculty from "./AddFaculty/AddFaculty";
import AddCathedra from "./AddCathedra/AddCathedra";

const ControlPanel = (props) => {
    return <div className={style.controlPanel}>
        <AddFaculty />
        <AddCathedra/>

    </div>
}

export default ControlPanel;