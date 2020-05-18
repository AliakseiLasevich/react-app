import React, {useState} from "react";
import style from "./AllBuildings.module.css";
import BuildingContainer from "./BuildingContainer";
import {NavLink} from "react-router-dom";
import AllCabinets from "./AllCabinets";

const AllBuildings = (props) => {

    let [selectedBuildingId, setSelectedBuildingId] = useState(null);

    const buildingComponents = props.buildings
        .map(building =>
            <div key={building.id} onClick={()=> setSelectedBuildingId(building.id)}>
                <NavLink className={style.item} activeClassName={style.active}
                         to={`/controlPanel/cabinetsAndBuildings/` + building.id}>

                    <BuildingContainer id={building.id}
                                       key={building.id}
                                       name={building.name}
                                       active={building.active}/>
                </NavLink>
            </div>);


    return (
        <div>
            <div className={style.buildingsMenu}>
                {buildingComponents}
            </div>

            <div>
                <AllCabinets selectedBuildingId={selectedBuildingId}
                             />
            </div>

        </div>
    )
};

export default AllBuildings;