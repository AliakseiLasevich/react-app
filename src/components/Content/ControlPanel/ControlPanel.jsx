import React from "react";
import {NavLink, Route} from "react-router-dom"
import FacultyManager from "./FacultyManager";
import CathedraManager from "./CathedraManager";
import TeacherManager from "./TeacherManager";
import StudentsManager from "./StudentsManager";
import LearnPlanManager from "./LearnPlanManager";
import SpecialtyManager from "./SpecialtyManager";
import CabinetsManager from "./CabinetsManager";
import BuildingsManager from "./BuildingsManager";
import DisciplinesManager from "./DisciplinesManager";
import LearnPlan from "./LearnPlan";

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
                                     to="/controlPanel/buildings">Здания
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/cabinets">Кабинеты
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/specialities">Специальности
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/students">Студенты
                            </NavLink>
                        </li>

                        <li className="nav-item align-self-center">
                            <NavLink className="btn bg-dark text-white" activeClassName="btn-warning"
                                     to="/controlPanel/disciplines">Дисциплины
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

            <Route path="/controlPanel/buildings"
                   render={() => <BuildingsManager/>}/>

            <Route path="/controlPanel/cabinets"
                   render={() => <CabinetsManager/>}/>

            <Route path="/controlPanel/specialities"
                   render={() => <SpecialtyManager/>}/>

            <Route path="/controlPanel/students"
                   render={() => <StudentsManager/>}/>

            <Route path="/controlPanel/learnPlan" exact={true}
                   render={() => <LearnPlanManager/>}/>

            <Route path="/controlPanel/disciplines"
                   render={() => <DisciplinesManager/>}/>


            <Route exact path="/controlPanel/learnPlan/:learnPlanId" component={LearnPlan}/>
        </>


    )
}

export default ControlPanel;