import React from "react";
import style from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return <div className={style.header}>
        <div className="logo">
            <NavLink to={"/"}> <img src="https://www.ggau.by/images/ggau-logo-m.png" alt="Logo"/></NavLink>
        </div>
    </div>
}

export default Header;