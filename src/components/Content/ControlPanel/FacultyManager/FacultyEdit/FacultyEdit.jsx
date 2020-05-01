import React from "react";

const FacultyEdit = (props) => {

    return (
        <div>
            <div>
                <input value={props.name}/>
                <input type="button" value="Save"/>
            </div>
        </div>
    )
}

export default FacultyEdit;