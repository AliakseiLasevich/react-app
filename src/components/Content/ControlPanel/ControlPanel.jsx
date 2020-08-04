import React from "react";
import {NavLink, Route} from "react-router-dom"
import FacultyManager from "./FacultyManager/FacultyManager";
import CathedraManager from "./CathedraManager/CathedraManager";
import TeacherManager from "./TeacherManager/TeacherManager";
import StudentGroupManager from "./StudentGroupManager/StudentGroupManager";
import CabinetsBuildingsManagerContainer from "./CabinetsBuildingsManager/CabinetsBuildingsManagerContainer";
import LearnPlan from "./LearnPlan/LearnPlan";
import SpecialtyManager from "./SpecialtyManager/SpecialtyManager";

const ControlPanel = (props) => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-0 pb-2 rounded-bottom">
                <div className="container-fluid justify-content-end">
                    <ul className="navbar-nav">

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/facultyManager">Факультеты
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/cathedraManager">Кафедры
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/teacherManager">Преподаватели
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/cabinetsAndBuildings">Кабинеты и здания
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/specialities">Специальности
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/students">Студенческие группы
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/learnPlan">Учебный план
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <Route path="/controlPanel/facultyManager/"
                   render={() => <FacultyManager/>}/>

            <Route path="/controlPanel/cathedraManager"
                   render={() => <CathedraManager/>}/>

            <Route path="/controlPanel/teacherManager"
                   render={() => <TeacherManager/>}/>

            <Route path="/controlPanel/cabinetsAndBuildings"
                   render={() => <CabinetsBuildingsManagerContainer/>}/>

            <Route path="/controlPanel/specialities"
                   render={() => <SpecialtyManager/>}/>

            <Route path="/controlPanel/students"
                   render={() => <StudentGroupManager/>}/>

            <Route path="/controlPanel/learnPlan"
                   render={() => <LearnPlan/>}/>
        </>


    )
}

export default ControlPanel;