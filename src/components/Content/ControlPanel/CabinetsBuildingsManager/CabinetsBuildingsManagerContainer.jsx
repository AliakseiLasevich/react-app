import React, {useEffect} from "react";
import CabinetsBuildingsManager from "./CabinetsBuildingsManager";
import {useDispatch, useSelector} from "react-redux";
import {getBuildings} from "../../../../redux/CabinetsBuildingsReducer";

const CabinetsBuildingsManagerContainer = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBuildings());
    }, []);

    const buildings = useSelector(state => state.cabinetsBuildingsReducer.allBuildings);

    return (
        <div>
            <CabinetsBuildingsManager buildings={buildings}/>
        </div>
    )
};

export default CabinetsBuildingsManagerContainer;