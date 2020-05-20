import React, {useState} from "react";
import AllStudentGroups from "./AllStudentGroups";
import AddStudentGroup from "./AddStudentGroup";
import plus_green from "../../../../assets/img/plus_green.png";
import minus_red from "../../../../assets/img/minus_red.png";

const StudentGroupManager = () => {

    const [addStudentGroupMode, setAddStudentGroupMode] = useState(false);

    const toggleEditMode = () => {
        setAddStudentGroupMode(!addStudentGroupMode)
    };

    return (
        <div>
            <div onClick={toggleEditMode}>
                {!addStudentGroupMode && <span><img src={plus_green} alt="+"/>Добавить группу студентов</span>}
                {addStudentGroupMode && <span><img src={minus_red} alt="-"/>Отмена</span>}
            </div>
            {addStudentGroupMode && <AddStudentGroup/>}
            <hr/>
                <AllStudentGroups/>
        </div>
)
};

export default StudentGroupManager;