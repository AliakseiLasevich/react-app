import React from "react";
import style from "./AllTeachers.module.css";

const AllTeachers = (props) => {

    let allTeachers = props.allTeachers.map(teacher =>
        <div key={teacher.id}>{teacher.id}. {teacher.name}</div>
    );

    return <div className={style.AllTeachers}>
        {allTeachers}
    </div>
};

export default AllTeachers;