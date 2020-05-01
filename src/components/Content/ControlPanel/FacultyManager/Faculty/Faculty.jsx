import React from "react";

import FacultyEdit from "../FacultyEdit/FacultyEdit";

const Faculty = (props) => {

    let fac = props.id === parseInt(props.facultyUrl) ? <FacultyEdit name={props.name}/>: (props.id+". "+props.name);

    return (
        <div>
            <div>
                {fac}
            </div>
        </div>
    )
};

export default Faculty;
