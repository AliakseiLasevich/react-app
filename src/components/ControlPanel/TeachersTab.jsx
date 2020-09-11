import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";
import tableIcons from "../Common/TableIcons";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import DeleteModal from "../Common/DeleteModal";
import Preloader from "../Common/Preloader";
import TeacherForm from "./TeacherForm";
import {deleteTeacher, requestAllTeachers} from "../../redux/TeacherReducer";

const TeachersTab = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [teacherToEdit, setTeacherToEdit] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [teacherToDelete, setTeacherToDelete] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.teacherReducer.isFetching);
    const teachers = useSelector(state => state.teacherReducer.allTeachers);

    useEffect(() => {
        dispatch(requestAllTeachers());
    }, [dispatch]);


    useEffect(() => {
        if (idToDelete != undefined) {
            dispatch(deleteTeacher(idToDelete))
        }
    }, [dispatch, idToDelete]);

    return (
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setEditMode(true)}>Добавить
                    Преподавателя
                </button>
            </div>

            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-8 col-xl-7">

                    <MaterialTable
                        icons={tableIcons}
                        title="Преподаватели"
                        columns={[
                            {
                                title: 'Имя преподавателя',
                                field: 'name',
                                render: rowData => <NavLink
                                    to={`/teachers/${rowData.publicId}`}>{rowData.name}</NavLink>
                            },
                            {
                                title: 'Кафедра',
                                field: 'cathedra',
                                render: rowData => <NavLink
                                    to={`/cathedras/${rowData.cathedra.publicId}`}>{rowData.cathedra.name} </NavLink>,
                                customSort: (a, b) => a.cathedra.name.localeCompare(b.cathedra.name)
                            },
                        ]}
                        data={teachers}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать',
                                onClick: (event, rowData) => {
                                    setTeacherToEdit(rowData);
                                    setEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить',
                                onClick: (event, rowData) => {
                                    setTeacherToDelete(rowData);
                                    setDeleteModalOpen(true)
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            padding: "dense",
                            pageSize: 15,
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

                {editMode &&
                <TeacherForm editMode={editMode}
                             setEditMode={setEditMode}
                             teacher={teacherToEdit}
                             setTeacherToEdit={setTeacherToEdit}/>}

                {deleteModalOpen &&
                <DeleteModal setOpen={setDeleteModalOpen}
                             message={teacherToDelete.name}
                             publicId={teacherToDelete.publicId}
                             setIdToDelete={setIdToDelete}/>}
            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
}

export default TeachersTab;