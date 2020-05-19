import React from "react";
import style from "./NavBar.module.css";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div className={style.menu}>

            <NavLink className={style.menuItem} activeClassName={style.active} to="/scheduler">Планировщик</NavLink>

            <NavLink className={style.menuItem} activeClassName={style.active} to="/teachersPlan">Занятость
                преподавателей</NavLink>

            <NavLink className={style.menuItem} activeClassName={style.active} to="/studentsPlan">Расписание
                студентов</NavLink>

            <NavLink className={style.menuItem} activeClassName={style.active} to="/controlPanel">Панель
                управления</NavLink>

        </div>
    )
}

export default NavBar;