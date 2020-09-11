import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteStudentCourse, requestStudentCourses} from "../../redux/StudentsReducer";
import MaterialTable from "material-table";
import tableIcons from "../Common/TableIcons";
import StudentsGroupDetails from "./StudentsGroupDetails";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import {setDeleteFunction, setDeleteMessage, setIdToDelete} from "../../redux/DeleteReducer";

export default function StudentsCoursesTable(props) {

    const dispatch = useDispatch();
    const allCourses = useSelector(state => state.studentsReducer.allStudentCourses);

    useEffect(() => {
        dispatch(requestStudentCourses());
    }, []);

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
                            field: 'number',
                            render: rowData => rowData.courseNumber,

                        },
                        {
                            title: 'Специальность',
                            field: 'specialty',
                            render: rowData => rowData.specialty.name
                        },
                    ]}
                    data={allCourses}
                    detailPanel={rowData => <StudentsGroupDetails studentCourse={rowData}/>}
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
                            tooltip: 'Редактировать курс',
                            onClick: (event, rowData) => {
                                props.setStudentCourseToEdit(rowData);
                            },

                        },
                        {
                            icon: Delete,
                            tooltip: 'Удалить курс',
                            onClick: (event, rowData) => {
                                dispatch(setIdToDelete(rowData.publicId));
                                dispatch(setDeleteMessage(`Удалить курс: ${rowData.courseNumber}`));
                                dispatch(setDeleteFunction(() => {
                                    dispatch(deleteStudentCourse(rowData.publicId))
                                }));
                            }
                        }
                    ]}
                />
            </div>
        </div>
    )

}