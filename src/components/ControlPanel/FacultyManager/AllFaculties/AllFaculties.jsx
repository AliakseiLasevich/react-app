import React from "react";
import style from "./AllFaculties.module.css";
import Cathedra from "../../CathedraManager/Cathedra/Cathedra";

const AllFaculties = (props) => {
debugger
    let facultiesWithName = props.state.allFaculties.map(faculty => <Cathedra name={faculty.name}/>);

    return (
        <div className={style.AllFaculties}>
            {facultiesWithName}
        </div>
    )
}

export default AllFaculties;