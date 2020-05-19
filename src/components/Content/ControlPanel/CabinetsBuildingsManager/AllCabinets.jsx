import React, {useEffect, useState} from "react";
import Cabinet from "./Cabinet";
import {useDispatch, useSelector} from "react-redux";
import {getCabinetsByBuildingId} from "../../../../redux/CabinetsBuildingsReducer";
import AddCabinet from "./AddCabinet";
import style from "../CathedraManager/CathedraManager.module.css";
import plus_green from "../../../../assets/img/plus_green.png";
import minus_red from "../../../../assets/img/minus_red.png";

const AllCabinets = (props) => {

    const dispatch = useDispatch();
    const cabinets = useSelector(state => state.cabinetsBuildingsReducer.allCabinets);

    const [addCabinetMode, setAddCabinetMode] = useState(false);

    const toggleAddMode = () => {
        setAddCabinetMode(!addCabinetMode)
    };

    useEffect(() => {
        props.selectedBuildingId !== null           // get cabinets if building is selected
        && dispatch(getCabinetsByBuildingId(props.selectedBuildingId));
    }, [dispatch, props.selectedBuildingId]);

    const cabinetComponents = cabinets.map(cabinet => <Cabinet id={cabinet.id}
                                                               key={cabinet.id}
                                                               number={cabinet.number}
                                                               maxStudents={cabinet.maxStudents}
                                                               type={cabinet.type}
                                                               buildingId={props.selectedBuildingId}
                                                               active={cabinet.active}/>
    );

    return (
        <div>
            {/*show ADD CABINET button if building is selected */}
            {props.selectedBuildingId !== null &&
            <div onClick={toggleAddMode} className={style.addCabinetButton}>
                {!addCabinetMode && <span><img src={plus_green} alt="+"/>Добавить Кабинет</span>}
                {addCabinetMode && <span><img src={minus_red} alt="-"/>Отмена</span>}
            </div>
            }
            {addCabinetMode && <AddCabinet buildingId={props.selectedBuildingId}/>}

            {/*show CABINET COMPONENTS if building is selected */}
            {props.selectedBuildingId !== null && cabinetComponents}
        </div>
    )
};

export default AllCabinets;