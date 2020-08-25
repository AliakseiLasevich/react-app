import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import tableIcons from "../../Common/TableIcons";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import DeleteConfirmation from "../../Common/DeleteConfirmation";
import Preloader from "../../Common/Preloader";
import {useDispatch, useSelector} from "react-redux";
import StudentGroupForm from "./StudentGroupForm";
import {deleteStudentGroup, requestStudentGroups} from "../../../redux/StudentGroupsReducer";


const StudentGroupManager = () => {

    const [studentGroupEditMode, setStudentGroupEditMode] = useState(false);
    const [studentGroupToEdit, setStudentGroupToEdit] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [studentGroupToDelete, setStudentGroupToDelete] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.studentGroupReducer.isFetching);
    const studentGroups = useSelector(state => state.studentGroupReducer.allStudentGroups);

    useEffect(() => {
        dispatch(requestStudentGroups());
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
                    Добавить группу студентов
                </button>
            </div>


            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-12 col-xl-10">

                    <MaterialTable
                        icons={tableIcons}
                        title="Группы студентов"
                        columns={[
                            {
                                title: 'Номер группы',
                                field: 'code',
                                render: rowData => <NavLink
                                    to={`/faculties/${rowData.publicId}`}>{rowData.number}</NavLink>,
                                customSort: (a, b) => a.number - b.number,
                                searchable: true
                            },

                        ]}
                        data={studentGroups}
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
                <StudentGroupForm editMode={studentGroupEditMode}
                                  setEditMode={setStudentGroupEditMode}
                                  studentGroup={studentGroupToEdit}
                                  setStudentGroupToEdit={setStudentGroupToEdit}/>}

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

export default StudentGroupManager;