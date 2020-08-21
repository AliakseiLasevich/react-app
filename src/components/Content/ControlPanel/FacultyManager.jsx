import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {deleteFaculty, getFaculties} from "../../../redux/FacultyReducer";
import FacultyForm from "./FacultyForm";
import DeleteConfirmation from "../../Common/DeleteConfirmation";
import Preloader from "../../Common/Preloader";
import tableIcons from "../../Common/TableIcons";

const FacultyManager = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [facultyToEdit, setFacultyToEdit] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [facultyToDelete, setFacultyToDelete] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.facultyReducer.isFetching);
    const faculties = useSelector(state => state.facultyReducer.allFaculties);

    useEffect(() => {
        dispatch(getFaculties());
    }, [dispatch]);


    useEffect(() => {
        if (idToDelete != undefined) {
            dispatch(deleteFaculty(idToDelete))
        }
    }, [dispatch, idToDelete]);

    return (
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setEditMode(true)}>Добавить
                    факультет
                </button>
            </div>

            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-8 col-xl-6">

                    <MaterialTable
                        icons={tableIcons}
                        title="Факультеты"
                        columns={[
                            {
                                title: 'Название факультета',
                                field: 'name',
                                render: rowData => <NavLink
                                    to={`/faculties/${rowData.publicId}`}>{rowData.name}</NavLink>
                            },
                        ]}
                        data={faculties}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать',
                                onClick: (event, rowData) => {
                                    setFacultyToEdit(rowData);
                                    setEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить',
                                onClick: (event, rowData) => {
                                    setFacultyToDelete(rowData);

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

                {editMode &&
                <FacultyForm editMode={editMode} setEditMode={setEditMode} faculty={facultyToEdit}
                             setFacultyToEdit={setFacultyToEdit}/>}

                {deleteModalOpen &&
                <DeleteConfirmation setOpen={setDeleteModalOpen}
                                    message={facultyToDelete.name}
                                    publicId={facultyToDelete.publicId}
                                    setIdToDelete={setIdToDelete}/>}
            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default FacultyManager;