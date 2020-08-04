import React, {forwardRef, useEffect, useState} from "react";
import MaterialTable from "material-table";
import {NavLink} from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import {getFaculties} from "../../../../redux/FacultyReducer";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import FacultyForm from "./FacultyForm";
import DeleteConfirmation from "../../../Common/DeleteConfirmation";

const FacultyManager = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFaculties());
    }, []);

    const fetching = useSelector(state => state.facultyReducer.isFetching);
    const faculties = useSelector(state => state.facultyReducer.allFaculties);

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
    };

    const data = [{name: "a"}, {name: "b"}];

    const [editModeModalOpen, setEditModeModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [facultyToEdit, setFacultyToEdit] = useState({});
    const [facultyToDelete, setFacultyToDelete] = useState({});

    return (
        <div className="container-fluid">

                <div className="row justify-content-center mt-1 ">
                    <button className="btn btn-sm btn-light mx-1" onClick={()=>setEditModeModalOpen(true)}>Добавить факультет</button>
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
                                render: rowData => <NavLink to={`/`}>{rowData.name}</NavLink>
                            },
                        ]}
                        data={data}
                        actions={[
                            {
                                icon: Edit,
                                tooltip: 'Редактировать',
                                onClick: (event, rowData) => {
                                    setFacultyToEdit(rowData);
                                    setEditModeModalOpen(true)
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
                            pageSizeOptions: [5, 10, 15]
                        }}
                    />
                </div>

                {editModeModalOpen &&
                <FacultyForm editMode={editModeModalOpen} setEditMode={setEditModeModalOpen} faculty={facultyToEdit} setFacultyToEdit={setFacultyToEdit}/>}

                {deleteModalOpen &&
                <DeleteConfirmation open={deleteModalOpen} setOpen={setDeleteModalOpen} faculty={facultyToDelete}/>}
            </div>
        </div>
    )
};

export default FacultyManager;