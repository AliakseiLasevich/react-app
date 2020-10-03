import React from 'react';
import Header from "./components/Header/Header";
import {Route} from "react-router-dom";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import PlannerTab from "./components/Scheduler/PlannerTab";
import StudentsPlan from "./components/StudentsPlan/StudentsPlan";
import TeachersPlan from "./components/TeachersPlan/TeachersPlan";
import MessageModal from "./components/Common/MessageModal";
import {useSelector} from "react-redux";
import DeleteModal from "./components/Common/DeleteModal";
import {setAutoFreeze} from "immer";

function App(props) {

    const message = useSelector(state => state.messageReducer.message);
    const idToDelete = useSelector(state => state.deleteReducer.idToDelete);

    //надо для корректной работы material-table и immer
    setAutoFreeze(false);

    return (
        <div style={{height: "100vh", backgroundColor: "grey", overflowY: "scroll"}}>
            <div className="container-fluid p-2">
                <Header/>
                <Route path="/controlPanel" render={() => <ControlPanel/>}/>
                <Route path="/scheduler" render={() => <PlannerTab/>}/>
                <Route path="/studentsPlan" render={() => <StudentsPlan/>}/>
                <Route path="/teachersPlan" render={() => <TeachersPlan/>}/>
            </div>

            {message && <MessageModal message={message}/>}

            {idToDelete && <DeleteModal/>}

        </div>
    );
}

export default App;

