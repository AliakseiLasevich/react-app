import React, {useState} from "react";
import LearnPlanForm from "./LearnPlanForm";

const LearnPlanManager = (props) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <>
            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setEditMode(!editMode)}>
                    Добавить график
                </button>
            </div>

            <div className="container-fluid mt-1">
                {editMode && <LearnPlanForm setEditMode={setEditMode}/>}

                <img src="https://i.imgur.com/MMF3IVo.jpg"/>

            </div>

        </>
    )
};

export default LearnPlanManager;