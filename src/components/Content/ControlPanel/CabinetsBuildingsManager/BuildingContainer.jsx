import React from "react";
import Building from "./Building";

const BuildingContainer = (props) => {

    return (
        <div>
            <Building id={props.id}
                      name={props.name}
                      active={props.active}/>
        </div>

    )
};

export default BuildingContainer;