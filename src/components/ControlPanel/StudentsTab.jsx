import React, {useEffect, useState} from "react";
import Preloader from "../Common/Preloader";
import {useDispatch, useSelector} from "react-redux";
import StudentsCourseForm from "./StudentsCourseForm";
import {requestStudentCourses} from "../../redux/StudentsReducer";
import StudentsCoursesTable from "./StudentsCoursesTable";


const StudentsTab = () => {

    const [studentCourseToEdit, setStudentCourseToEdit] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.studentsReducer.isFetching);

    useEffect(() => {
        dispatch(requestStudentCourses());
    }, [dispatch]);

    return (
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setStudentCourseToEdit({})}>
                    Создать новый курс
                </button>
            </div>

            <div className="justify-content-center">

                <StudentsCoursesTable  studentCourseToEdit={studentCourseToEdit}
                                       setStudentCourseToEdit={setStudentCourseToEdit}/>

                {studentCourseToEdit &&
                <StudentsCourseForm studentCourseToEdit={studentCourseToEdit}
                                    setStudentCourseToEdit={setStudentCourseToEdit}/>
                }
            </div>
            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default StudentsTab;