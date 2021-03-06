import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MaterialTable from "material-table";
import tableIcons from "../Common/TableIcons";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Preloader from "../Common/Preloader";
import {deleteSpecialty, requestSpecialties} from "../../redux/SpecialtyReducer";
import SpecialtyForm from "./SpecialtyForm";
import {setDeleteFunction, setDeleteMessage, setIdToDelete} from "../../redux/DeleteReducer";

const SpecialtyTab = (props) => {
    const [specialtyEditMode, setSpecialtyEditMode] = useState(false);
    const [specialtyToEdit, setSpecialtyToEdit] = useState({});

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.specialtyReducer.isFetching);
    const specialties = useSelector(state => state.specialtyReducer.allSpecialties);

    useEffect(() => {
        dispatch(requestSpecialties());
    }, [dispatch]);

    return (
        <div className="container-fluid">

            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setSpecialtyEditMode(true)}>
                    Добавить Специальность
                </button>
            </div>

            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-12 col-xl-10">

                    <MaterialTable
                        icons={tableIcons}
                        title="Специальности"
                        columns={[
                            {
                                title: 'Факультет',
                                field: 'code',
                                render: rowData => <NavLink to={`/faculties/${rowData.faculty.publicId}`}>{rowData.faculty.name}</NavLink>,
                                customSort: (a, b) => a.faculty.name.localeCompare(b.faculty.name),
                                searchable: true,
                                customFilterAndSearch: (filter, rowData) => rowData.faculty.name.toUpperCase().includes(filter.toUpperCase())
                            },
                            {
                                title: 'Специальность',
                                field: 'specialty',
                                render: rowData => <NavLink
                                    to={`/specialties/${rowData.publicId}`}>{rowData.name}</NavLink>,
                                customSort: (a, b) => a.name.localeCompare(b.name),
                                searchable: true,
                                customFilterAndSearch: (filter, rowData) => rowData.name.toUpperCase().includes(filter.toUpperCase())
                            },
                            {
                                title: 'Код',
                                field: 'code',
                                render: rowData => rowData.code,
                                customSort: (a, b) => a.code.localeCompare(b.code),
                                searchable: true
                            },

                        ]}
                        data={specialties}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать кабинет',
                                onClick: (event, rowData) => {
                                    setSpecialtyToEdit(rowData);
                                    setSpecialtyEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить кабинет',
                                onClick: (event, rowData) => {
                                    dispatch(setIdToDelete(rowData.publicId));
                                    dispatch(setDeleteMessage(`Удалить специальность: ${rowData.name}`));
                                    dispatch(setDeleteFunction(() => {
                                        dispatch(deleteSpecialty(rowData.publicId))
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

                {specialtyEditMode &&
                <SpecialtyForm editMode={specialtyEditMode}
                               setEditMode={setSpecialtyEditMode}
                               specialty={specialtyToEdit}
                               setSpecialtyToEdit={setSpecialtyToEdit}/>}

            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
        </div>
    )
};

export default SpecialtyTab;