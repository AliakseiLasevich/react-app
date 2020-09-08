import React, {useEffect, useMemo, useState} from "react";
import MaterialTable from "material-table";
import tableIcons from "../../Common/TableIcons";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import DeleteConfirmation from "../../Common/DeleteConfirmation";
import Preloader from "../../Common/Preloader";
import {useDispatch, useSelector} from "react-redux";
import StudentsForm from "./StudentsForm";
import {deleteStudentGroup, requestStudentCourses, requestStudentGroups} from "../../../redux/StudentsReducer";


const StudentsManager = () => {

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
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setStudentGroupEditMode(true)}>
                    Добавить курс студентов
                </button>
            </div>


            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-12 col-xl-10">

                    <MaterialTable
                        icons={tableIcons}
                        title="Курсы студентов"
                        columns={[
                            {
                                title: 'Номер курса',
                                field: 'code',
                                render: rowData => <NavLink
                                    to={`/student_courses/${rowData.publicId}`}>{rowData.courseNumber}</NavLink>,
                                customSort: (a, b) => a.number - b.number,
                                searchable: true
                            },
                            {
                                title: 'Специальность',
                                field: 'code',
                                render: rowData => <NavLink
                                    to={`/specialties/${rowData.specialty.publicId}`}>{rowData.specialty.name}</NavLink>,
                                customSort: (a, b) => a.number - b.number,
                                searchable: true
                            },
                            {
                                title: 'Кол-во групп',
                                field: 'code',
                                render: rowData => rowData.studentGroups.length,
                                customSort: (a, b) => a.number - b.number,
                                searchable: true
                            },
                            {
                                title: 'Кол-во подгрупп',
                                field: 'code',
                                render: rowData => {
                                    let count = 0;
                                    rowData.studentGroups.forEach(group => count += group.studentSubgroups?.length);
                                    return count;
                                },
                                customSort: (a, b) => a.number - b.number,
                                searchable: true
                            },

                        ]}
                        data={studentCourses}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать группу',
                                onClick: (event, rowData) => {
                                    setStudentGroupToEdit(rowData);
                                    setStudentGroupEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить группу',
                                onClick: (event, rowData) => {
                                    setStudentGroupToDelete(rowData);
                                    setDeleteModalOpen(true)
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            padding: "dense",
                            pageSize: 10,
                            pageSizeOptions: [5, 10, 15],
                            headerStyle: {
                                backgroundColor: '#ebebeb',
                                color: 'black',
                            },
                            actionsCellStyle: {
                                backgroundColor: '#fcfcfc',
                            }
                        }}
                    />
                </div>

                {studentGroupEditMode &&
                <StudentsForm editMode={studentGroupEditMode}
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

export default StudentsManager;