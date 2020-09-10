import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import Preloader from "../Common/Preloader";
import tableIcons from "../Common/TableIcons";
import {deleteDiscipline, requestDisciplines} from "../../redux/DisciplinesReducer";
import DisciplineForm from "./DisciplineForm";

const DisciplinesTab = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [disciplineToEdit, setDisciplineToEdit] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [disciplineToDelete, setDisciplineToDelete] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.disciplinesReducer.isFetching);
    const disciplines = useSelector(state => state.disciplinesReducer.allDisciplines);

    useEffect(() => {
        dispatch(requestDisciplines());
    }, [dispatch]);


    useEffect(() => {
        if (idToDelete != undefined) {
            dispatch(deleteDiscipline(idToDelete))
        }
    }, [dispatch, idToDelete]);

    return (
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setEditMode(true)}>Добавить
                    дисциплину
                </button>
            </div>

            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-8 col-xl-6">

                    <MaterialTable
                        icons={tableIcons}
                        title="Дисциплины"
                        columns={[
                            {
                                title: 'Дисциплина',
                                field: 'name',
                                render: rowData => <NavLink
                                    to={`/disciplines/${rowData.publicId}`}>{rowData.name}</NavLink>
                            },
                        ]}
                        data={disciplines}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать',
                                onClick: (event, rowData) => {
                                    setDisciplineToEdit(rowData);
                                    setEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить',
                                onClick: (event, rowData) => {
                                    setDisciplineToDelete(rowData);
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
                <DisciplineForm editMode={editMode} setEditMode={setEditMode} discipline={disciplineToEdit}
                             setDisciplineToEdit={setDisciplineToEdit}/>}

                {deleteModalOpen &&
                <DeleteConfirmation setOpen={setDeleteModalOpen}
                                    message={disciplineToDelete.name}
                                    publicId={disciplineToDelete.publicId}
                                    setIdToDelete={setIdToDelete}/>}
            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default DisciplinesTab;