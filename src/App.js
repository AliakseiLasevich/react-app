import React from 'react';

import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import {Route} from "react-router-dom";
import ControlPanel from "./components/Content/ControlPanel/ControlPanel";
import Scheduler from "./components/Content/Scheduler/Scheduler";
import StudentsPlan from "./components/Content/StudentsPlan/StudentsPlan";
import TeachersPlan from "./components/Content/TeachersPlan/TeachersPlan";

function App(props) {

    return (
        <div className="wrapper">
            <Header/>
            <NavBar/>
            <div className="content">
                <Route path="/controlPanel" render={() => <ControlPanel/>}/>
                <Route path="/scheduler" render={() => <Scheduler/>}/>
                <Route path="/studentsPlan" render={() => <StudentsPlan/>}/>
                <Route path="/teachersPlan" render={() => <TeachersPlan/>}/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;

