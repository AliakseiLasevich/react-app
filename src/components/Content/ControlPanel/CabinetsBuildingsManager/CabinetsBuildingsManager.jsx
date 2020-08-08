import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";
import tableIcons from "../../../Common/TableIcons";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import DeleteConfirmation from "../../../Common/DeleteConfirmation";
import Preloader from "../../../Common/Preloader";
import CabinetsForm from "./CabinetsForm";
import BuildingsForm from "./BuildingsForm";
import {deleteCabinet, requestBuildingsWithCabinets} from "../../../../redux/CabinetsBuildingsReducer";


const CabinetsBuildingsManager = (props) => {
    const [buildingEditMode, setBuildingEditMode] = useState(false);
    const [cabinetEditMode, setCabinetEditMode] = useState(false);
    const [cabinetToEdit, setCabinetToEdit] = useState({});
    const [buildingToEdit, setBuildingToEdit] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [cabinetToDelete, setCabinetToDelete] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.cabinetsBuildingsReducer.isFetching);
    const buildings = useSelector(state => state.cabinetsBuildingsReducer.allBuildings);

    const cabinets = buildings.flatMap(building => {
        return building.cabinets.map(cabinet => cabinet = {
            ...cabinet,
            buildingId: building.publicId,
            buildingName: building.name
        })
    });

    useEffect(() => {
        dispatch(requestBuildingsWithCabinets());
    }, [dispatch]);


    useEffect(() => {
        if (idToDelete != undefined) {
            dispatch(deleteCabinet(idToDelete))
        }
    }, [dispatch, idToDelete]);

    return (
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setBuildingEditMode(true)}>
                    Добавить Здание
                </button>
                <button className="btn btn-sm btn-light mx-1" onClick={() => setCabinetEditMode(true)}>
                    Добавить Кабинет
                </button>
            </div>


            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-12 col-xl-10">

                    <MaterialTable
                        icons={tableIcons}
                        title="Кабинеты"
                        columns={[
                            {
                                title: 'Здание',
                                field: 'building',
                                render: rowData => <NavLink
                                    to={`/buildings/${rowData.buildingId}`}>{rowData.buildingName}</NavLink>,
                                customSort: (a, b) => a.buildingName.localeCompare(b.buildingName)
                            },
                            {
                                title: 'Номер кабинета',
                                field: 'cabinet',
                                render: rowData => <NavLink
                                    to={`/cabinets/${rowData.publicId}`}>{rowData.number} </NavLink>,
                                customSort: (a, b) => a.number - b.number
                            },
                            {
                                title: 'Вместимость',
                                field: 'capacity',
                                render: rowData => rowData.maxStudents,
                                customSort: (a, b) => a.maxStudents - b.maxStudents
                            },
                            {
                                title: 'Тип',
                                field: 'type',
                                render: rowData => rowData.type,
                                customSort: (a, b) => a.type.localeCompare(b.type)
                            },
                        ]}
                        data={cabinets}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать кабинет',
                                onClick: (event, rowData) => {
                                    setCabinetToEdit(rowData);
                                    setCabinetEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить кабинет',
                                onClick: (event, rowData) => {
                                    setCabinetToDelete(rowData);
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

                {cabinetEditMode &&
                <CabinetsForm editMode={cabinetEditMode}
                              setEditMode={setCabinetEditMode}
                              cabinet={cabinetToEdit}
                              setCabinetToEdit={setCabinetToEdit}/>}

                {buildingEditMode &&
                <BuildingsForm editMode={buildingEditMode}
                               setEditMode={setBuildingEditMode}
                               building={buildingToEdit}
                               setBuildingToEdit={setBuildingToEdit}/>}

                {deleteModalOpen &&
                <DeleteConfirmation setOpen={setDeleteModalOpen}
                                    message={`Кабинет №${cabinetToDelete.number}`}
                                    publicId={cabinetToDelete.publicId}
                                    setIdToDelete={setIdToDelete}/>}
            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default CabinetsBuildingsManager;