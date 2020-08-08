import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import tableIcons from "../../../Common/TableIcons";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import DeleteConfirmation from "../../../Common/DeleteConfirmation";
import Preloader from "../../../Common/Preloader";
import {deleteCathedra, getCathedrasWithFaculties} from "../../../../redux/CathedraReducer";
import CathedraForm from "./CathedraForm";

const CathedraManager = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [cathedraToEdit, setCathedraToEdit] = useState({});
    const [deleteMode, setDeleteMode] = useState(false);
    const [cathedraToDelete, setCathedraToDelete] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.cathedraReducer.isFetching);
    const cathedras = useSelector(state => state.cathedraReducer.allCathedras);

    useEffect(() => {
        dispatch(getCathedrasWithFaculties());
    }, [dispatch]);


    useEffect(() => {
        if (idToDelete != undefined) {
            dispatch(deleteCathedra(idToDelete))
        }
    }, [dispatch, idToDelete]);

    return (
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setEditMode(true)}>Добавить
                    кафедру
                </button>
            </div>

            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-8 col-xl-7">

                    <MaterialTable
                        icons={tableIcons}
                        title="Кафедры"
                        columns={[
                            {
                                title: 'Название кафедры',
                                field: 'name',
                                render: rowData => <NavLink
                                    to={`/cathedras/${rowData.publicId}`}>{rowData.name}</NavLink>,
                                customSort: (a, b) => a.name.localeCompare(b.name)
                            },
                            {
                                title: 'Факультет',
                                field: 'faculty',
                                render: rowData => <NavLink
                                    to={`/faculties/${rowData.faculty.publicId}`}>{rowData.faculty.name}</NavLink>,
                                customSort: (a, b) => a.faculty.name.localeCompare(b.faculty.name)
                            },
                        ]}
                        data={cathedras}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать',
                                onClick: (event, rowData) => {
                                    setCathedraToEdit(rowData);
                                    setEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить',
                                onClick: (event, rowData) => {
                                    setCathedraToDelete(rowData);
                                    setDeleteMode(true)
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            padding: "dense",
                            pageSize: 15,
                            pageSizeOptions: [5, 10, 15, 25],
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
                <CathedraForm setEditMode={setEditMode}
                              cathedra={cathedraToEdit}
                              setCathedraToEdit={setCathedraToEdit}/>}

                {deleteMode &&
                <DeleteConfirmation setOpen={setDeleteMode}
                                    message={cathedraToDelete.name}
                                    publicId={cathedraToDelete.publicId}
                                    setIdToDelete={setIdToDelete}/>}
            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default CathedraManager;