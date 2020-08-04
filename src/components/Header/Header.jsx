import React from "react";
import logo from "../../assets/img/ggau-logo.png"
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark py-1 rounded-top">
            <div className="container-fluid">
                <NavLink to="/">
                    <img src={logo} alt="Logo" className="navbar-brand"/>
                </NavLink>

                <ul className="navbar-nav">
                    <li className="nav-item align-self-center">
                        <NavLink className="btn bg-dark text-white" activeClassName="btn-warning" to="/scheduler">
                            Планировщик
                        </NavLink>
                    </li>

                    <li className="nav-item align-self-center">
                        <NavLink className="btn bg-dark text-white" activeClassName="btn-warning" to="/teachersPlan">Занятость
                            преподавателей</NavLink>
                    </li>

                    <li className="nav-item align-self-center">
                        <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                 to="/studentsPlan">Расписание студентов</NavLink>
                    </li>

                    <li className="nav-item align-self-center">
                        <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                 to="/controlPanel">Панель управления</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )

};

export default Header;