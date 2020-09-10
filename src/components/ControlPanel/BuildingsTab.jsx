import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";

import {NavLink} from "react-router-dom";
import Delete from "@material-ui/icons/Delete";
import tableIcons from "../Common/TableIcons";
import BuildingsForm from "./BuildingsForm";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import Preloader from "../Common/Preloader";
import {deleteBuilding, requestBuildings} from "../../redux/BuildingsReducer";
import Edit from "@material-ui/icons/Edit";


const BuildingsTab = (props) => {
    const [buildingEditMode, setBuildingEditMode] = useState(false);
    const [buildingToEdit, setBuildingToEdit] = useState({});
    const [buildingToDelete, setBuildingToDelete] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.buildingsReducer.isFetching);
    const buildings = useSelector(state => state.buildingsReducer.allBuildings);

    useEffect(() => {
        dispatch(requestBuildings());
    }, [dispatch]);

    useEffect(() => {
        if (idToDelete != undefined) {
            dispatch(deleteBuilding(idToDelete))
        }
    }, [dispatch, idToDelete]);

    return (
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setBuildingEditMode(true)}>
                    Добавить Здание
                </button>
            </div>

            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-10 col-xl-6">
                    <MaterialTable
                        icons={tableIcons}
                        title="Здания"
                        columns={[
                            {
                                title: 'Здание',
                                field: 'building',
                                render: rowData => <NavLink
                                    to={`/buildings/${rowData.publicId}`}>{rowData.name}</NavLink>,
                                customSort: (a, b) => a.name.localeCompare(b.name),
                                searchable: true,
                                customFilterAndSearch: (filter, rowData) => rowData.name.toUpperCase().includes(filter.toUpperCase())
                            },
                        ]}
                        data={buildings}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать здание',
                                onClick: (event, rowData) => {
                                    setBuildingToEdit(rowData);
                                    setBuildingEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить здание',
                                onClick: (event, rowData) => {
                                    setBuildingToDelete(rowData);
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


                {buildingEditMode &&
                <BuildingsForm editMode={buildingEditMode}
                               setEditMode={setBuildingEditMode}
                               building={buildingToEdit}
                               setBuildingToEdit={setBuildingToEdit}/>}

                {deleteModalOpen &&
                <DeleteConfirmation setOpen={setDeleteModalOpen}
                                    message={`Здание ${buildingToDelete.name}. Кабинеты здания также будут удалены.`}
                                    publicId={buildingToDelete.publicId}
                                    setIdToDelete={setIdToDelete}/>}
            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default BuildingsTab;