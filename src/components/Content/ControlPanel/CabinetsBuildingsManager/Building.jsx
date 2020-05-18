import React from "react";


const Building = (props) => {

    return (
        <div>
            {props.id}. {props.name}. {props.active}
        </div>
    )
};

export default Building;