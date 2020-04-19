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

    return (
        <div className={style.AllFaculties}>
           <Faculty name={allFaculties[0].name}/>
           <Faculty name={allFaculties[1].name}/>
           <Faculty name={allFaculties[2].name}/>
           <Faculty name={allFaculties[3].name}/>
           <Faculty name={allFaculties[4].name}/>
           <Faculty name={allFaculties[5].name}/>
           <Faculty name={allFaculties[6].name}/>
        </div>
    )
}

export default AllFaculties;