import React from "react";
import style from "./AllFaculties.module.css";
import Cathedra from "../../CathedraManager/Cathedra/Cathedra";

const AllFaculties = (props) => {

    let facultiesWithName = props.allFaculties.map(faculty => <Cathedra name={faculty.name}/>);

    return (
        <div className={style.AllFaculties}>
            {facultiesWithName}
        </div>
    )
}

export default AllFaculties;