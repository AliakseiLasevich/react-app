import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {requestStudentCourses} from "../../redux/StudentsReducer";
import MaterialTable from "material-table";
import tableIcons from "../Common/TableIcons";
import StudentsGroupDetails from "./StudentsGroupDetails";
import StudentsGroupForm from "./StudentsGroupForm";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";



export default function StudentsCoursesTable(props) {
    const dispatch = useDispatch();
    const allCourses = useSelector(state => state.studentsReducer.allStudentCourses);
    const [groupEditMode, setGroupEditMode] = useState(false);
    const [newGroupForm, setNewGroupForm] = useState();

    useEffect(() => {
        dispatch(requestStudentCourses());
    }, []);

    const createNewGroupWindow = (course) => {
      setNewGroupForm(
            <StudentsGroupForm editMode={groupEditMode}
                               setEditMode={setGroupEditMode}
                               course={course}
                               setNewGroupForm={setNewGroupForm}/>
        )
    };

    return (
        <div className="row justify-content-center p-2 m-auto ">

            <div className="col-md-12 col-xl-8">
                <MaterialTable
                    icons={tableIcons}
                    title="Студенты по курсам"
                    style={{height: "auto"}}
                    columns={[
                        {
                            title: 'Номер Курса',
                            field: 'name',
                            render: rowData => rowData.courseNumber
                        },
                        {
                            title: 'Специальность',
                            field: 'specialty',
                            render: rowData => rowData.specialty.name
                        },
                    ]}
                    data={allCourses}
                    detailPanel={rowData => {
                        return (
                            <div className="p-2" style={{backgroundColor: "#6b706e"}}>
                                <button className="btn btn-sm btn-success m-1"
                                        onClick={() => createNewGroupWindow(rowData)}>
                                    Добавить группу
                                </button>
                                {rowData.studentGroups.map(studentGroup => (
                                        <>
                                            <StudentsGroupDetails studentGroup={studentGroup}/>
                                        </>
                                    )
                                )}
                            </div>
                        )
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        padding: "dense",
                        pageSize: 10,
                        pageSizeOptions: [5, 10, 15, 25],
                        headerStyle: {
                            backgroundColor: '#ebebeb',
                            color: 'black',
                        },
                        actionsCellStyle: {
                            backgroundColor: '#fcfcfc',
                        }
                    }}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Редактировать номер курса',
                            onClick: (event, rowData) => {
                                // setCabinetToEdit(rowData);
                                // setCabinetEditMode(true)
                            }
                        },
                        {
                            icon: Delete,
                            tooltip: 'Удалить курс',
                            onClick: (event, rowData) => {
                                // setCabinetToDelete(rowData);
                                // setDeleteModalOpen(true)
                            }
                        }
                    ]}
                />
            </div>

            {newGroupForm}

        </div>
    )

}