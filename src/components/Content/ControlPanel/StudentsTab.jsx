import React, {useEffect, useState} from "react";
import DeleteConfirmation from "../../Common/DeleteConfirmation";
import Preloader from "../../Common/Preloader";
import {useDispatch, useSelector} from "react-redux";
import StudentsCourseForm from "./StudentsCourseForm";
import {deleteStudentGroup, requestStudentCourses} from "../../../redux/StudentsReducer";
import StudentsCoursesTable from "./StudentsCoursesTable";


const StudentsTab = () => {

    const [studentGroupEditMode, setStudentGroupEditMode] = useState(false);
    const [studentGroupToEdit, setStudentGroupToEdit] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [studentGroupToDelete, setStudentGroupToDelete] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.studentsReducer.isFetching);
    const studentCourses = useSelector(state => state.studentsReducer.allStudentCourses);

    useEffect(() => {
        dispatch(requestStudentCourses());
    }, [dispatch]);


    useEffect(() => {
        if (idToDelete != undefined) {
            dispatch(deleteStudentGroup(idToDelete))
        }
    }, [dispatch, idToDelete]);


    return (
        <div className="container-fluid" >

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setStudentGroupEditMode(true)}>
                    Добавить курс студентов
                </button>
            </div>


            <div className="row justify-content-center p-2 m-auto" >

               <StudentsCoursesTable/>

                {studentGroupEditMode &&
                <StudentsCourseForm editMode={studentGroupEditMode}
                                    setEditMode={setStudentGroupEditMode}
                                    studentGroup={studentGroupToEdit}
                                    setStudentGroupToEdit={setStudentGroupToEdit}/>
                }

                {deleteModalOpen &&
                <DeleteConfirmation setOpen={setDeleteModalOpen}
                                    message={`группу ${studentGroupToDelete.number}`}
                                    publicId={studentGroupToDelete.publicId}
                                    setIdToDelete={setIdToDelete}/>}
            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default StudentsTab;