import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";

import {NavLink} from "react-router-dom";
import Delete from "@material-ui/icons/Delete";
import tableIcons from "../Common/TableIcons";
import BuildingsForm from "./BuildingsForm";
import Preloader from "../Common/Preloader";
import {deleteBuilding, requestBuildings} from "../../redux/BuildingsReducer";
import Edit from "@material-ui/icons/Edit";
import {setDeleteFunction, setDeleteMessage, setIdToDelete} from "../../redux/DeleteReducer";
import {deleteCabinet} from "../../redux/CabinetsReducer";


const BuildingsTab = (props) => {
    const [buildingEditMode, setBuildingEditMode] = useState(false);
    const [buildingToEdit, setBuildingToEdit] = useState({});
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.buildingsReducer.isFetching);
    const buildings = useSelector(state => state.buildingsReducer.allBuildings);

    useEffect(() => {
        dispatch(requestBuildings());
    }, [dispatch]);

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
                                    dispatch(setIdToDelete(rowData.publicId));
                                    dispatch(setDeleteMessage(`Удалить здание: ${rowData.name}`));
                                    dispatch(setDeleteFunction(() => {
                                        dispatch(deleteBuilding(rowData.publicId))
                                    }));
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

            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default BuildingsTab;