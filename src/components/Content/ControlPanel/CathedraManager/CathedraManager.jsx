import React, {useState} from "react";
import style from "./CathedraManager.module.css";
import plus_green from "../../../../assets/img/plus_green.png";
import minus_red from "../../../../assets/img/minus_red.png";
import AddCathedra from "./AddCathedra";
import AllCathedras from "./AllCathedras";

const CathedraManager = (props) => {

    const [addCathedraMode, setAddCathedraMode] = useState(false);

    const toggleEditMode = () => {
        setAddCathedraMode(!addCathedraMode)
    };

    return (
        <div className={style.CathedraManager}>

            <div onClick={toggleEditMode} className={style.addFacultyButton}>
                {!addCathedraMode && <span><img src={plus_green} alt="+"/>Добавить Кафедру</span>}
                {addCathedraMode && <span><img src={minus_red} alt="-"/>Отмена</span>}
            </div>
            {addCathedraMode && <AddCathedra/>}

            <AllCathedras/>
        </div>
    )
};

export default CathedraManager;