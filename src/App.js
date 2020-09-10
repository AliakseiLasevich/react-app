import React from 'react';
import Header from "./components/Header/Header";
import {Route} from "react-router-dom";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Scheduler from "./components/Scheduler/Scheduler";
import StudentsPlan from "./components/StudentsPlan/StudentsPlan";
import TeachersPlan from "./components/TeachersPlan/TeachersPlan";

function App(props) {

    return (
        <div style={{height: "100vh", backgroundColor: "grey",  overflowY: "scroll"}}>
            <div className="container-fluid p-2">
                <Header/>
                <Route path="/controlPanel" render={() => <ControlPanel/>}/>
                <Route path="/scheduler" render={() => <Scheduler/>}/>
                <Route path="/studentsPlan" render={() => <StudentsPlan/>}/>
                <Route path="/teachersPlan" render={() => <TeachersPlan/>}/>
            </div>
        </div>
    );
}

export default App;

