import React from "react";
import {NavLink, Route} from "react-router-dom"
import FacultyTab from "./FacultyTab";
import CathedrasTab from "./CathedrasTab";
import TeachersTab from "./TeachersTab";
import StudentsTab from "./StudentsTab";
import LearnPlanTab from "./LearnPlanTab";
import SpecialtyTab from "./SpecialtyTab";
import CabinetsTab from "./CabinetsTab";
import BuildingsTab from "./BuildingsTab";
import DisciplinesTab from "./DisciplinesTab";
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
                   render={() => <FacultyTab/>}/>

            <Route path="/controlPanel/cathedraManager"
                   render={() => <CathedrasTab/>}/>

            <Route path="/controlPanel/teacherManager"
                   render={() => <TeachersTab/>}/>

            <Route path="/controlPanel/buildings"
                   render={() => <BuildingsTab/>}/>

            <Route path="/controlPanel/cabinets"
                   render={() => <CabinetsTab/>}/>

            <Route path="/controlPanel/specialities"
                   render={() => <SpecialtyTab/>}/>

            <Route path="/controlPanel/students"
                   render={() => <StudentsTab/>}/>

            <Route path="/controlPanel/learnPlan" exact={true}
                   render={() => <LearnPlanTab/>}/>

            <Route path="/controlPanel/disciplines"
                   render={() => <DisciplinesTab/>}/>


            <Route exact path="/controlPanel/learnPlan/:learnPlanId" component={LearnPlan}/>
        </>


    )
}

export default ControlPanel;