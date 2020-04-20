import React from "react";
import style from "./AllFaculties.module.css";
import Faculty from "../Faculty/Faculty";

const AllFaculties = (props) => {
    console.log(props.allFaculties);
    debugger;
    let facultiesWithName = props.source.allFaculties.map(faculty => <Faculty name={faculty.name}/>);
    return (
        <div className={style.AllFaculties}>
            {facultiesWithName}
        </div>
    )
}

export default AllFaculties;