import React from "react";
import AllBuildings from "./AllBuildings";

const CabinetsBuildingsManager = (props) => {

    return (
        <div>
            <AllBuildings buildings={props.buildings}/>
        </div>
    )
};

export default CabinetsBuildingsManager;