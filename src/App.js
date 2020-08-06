import React from 'react';
import Header from "./components/Header/Header";
import {Route} from "react-router-dom";
import ControlPanel from "./components/Content/ControlPanel/ControlPanel";
import Scheduler from "./components/Content/Scheduler/Scheduler";
import StudentsPlan from "./components/Content/StudentsPlan/StudentsPlan";
import TeachersPlan from "./components/Content/TeachersPlan/TeachersPlan";

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

