import React from "react";
import style from "./Menu.module.css";

const Menu = () => {
    return (
        <div className={style.menu}>
            <div className={style.menuItem}> Панель управления</div>
            <div className={style.menuItem}> Корпуса</div>
            <div className={style.menuItem}>Кабинеты</div>
        </div>
    )
}

export default Menu;