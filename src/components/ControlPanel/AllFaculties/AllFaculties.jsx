import React from "react";
import style from "./AllFaculties.module.css";
import Faculty from "../Faculty/Faculty";

const AllFaculties = (props) => {

    let facultiesWithName = props.state.allFaculties.map(faculty => <Faculty name={faculty.name}/>);

    return (
        <div className={style.AllFaculties}>
            {facultiesWithName}
        </div>
    )
}

export default AllFaculties;