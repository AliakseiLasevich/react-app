import React from "react";
import style from "./Menu.module.css";

const Menu = ()=>{
    return <div className={style.menu}>
        <div className="menu-item">Факультеты</div>
        <div className="menu-item">Кафедры</div>
        <div className="menu-item">Преподаватели</div>
        <div className="menu-item">Корпуса</div>
        <div className="menu-item">Кабинеты</div>
    </div>
}

export default Menu;