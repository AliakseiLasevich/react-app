import React from "react";
import style from "./LearnPlan.module.css";

const LearnPlan = (props) => {
    return (
        <div>
            <div>
                <ul>
                    <li>Выбрать факультет</li>
                    <li>Добавить учебный план</li>
                    <li></li>
                    <li></li>
                </ul>

            </div>
            <div className={style.LearnPlan}>
                <img src="https://i.imgur.com/MMF3IVo.jpg" alt="learn plan"/>
            </div>
        </div>
    )
}

export default LearnPlan;