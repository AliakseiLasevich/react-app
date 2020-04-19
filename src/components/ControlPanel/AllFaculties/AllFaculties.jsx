import React from "react";
import style from "./AllFaculties.module.css";
import Faculty from "../Faculty/Faculty";

const AllFaculties = (props) => {

    let allFaculties = [
        {name: "Агрономический"},
        {name: "Защиты растений"},
        {name: "Ветеринарной медицины"},
        {name: "Биотехнологический"},
        {name: "Инженерно-технологический"},
        {name: "Экономический факультет"},
        {name: "Бухгалтерского учёта"},
    ]

    let facultiesWithName = allFaculties.map(faculty => <Faculty name={faculty.name}/>);

    return (
        <div className={style.AllFaculties}>
            {facultiesWithName}
        </div>
    )
}

export default AllFaculties;