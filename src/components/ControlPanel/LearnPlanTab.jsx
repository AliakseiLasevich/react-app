import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {deleteLearnPlan, requestAllLearnPlans} from "../../redux/LearnPlanReducer";
import tableIcons from "../Common/TableIcons";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import Preloader from "../Common/Preloader";
import LearnPlanForm from "./LearnPlanForm";
import {BsFillEyeFill} from "react-icons/bs";
import moment from "moment";
import {Redirect} from "react-router-dom";
import {setDeleteFunction, setDeleteMessage, setIdToDelete} from "../../redux/DeleteReducer";

const LearnPlanTab = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [learnPlanToEdit, setLearnPlanToEdit] = useState({});
    const [learnPlanIdToRedirect, setLearnPlanIdToRedirect] = useState("");
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.learnPlanReducer.isFetching);

    useEffect(() => {
        dispatch(requestAllLearnPlans());
    }, [dispatch]);

    const allLearnPlans = useSelector(state => state.learnPlanReducer.allLearnPlans);

    return (
        <>
            <div className="row justify-content-center mt-1 ">
                <button className="btn btn-sm btn-light mx-1" onClick={() => setEditMode(!editMode)}>
                    Добавить график
                </button>
            </div>

            <div className="row justify-content-center p-2 m-auto ">
                <div className="col-md-12 col-xl-10">

                    <MaterialTable
                        icons={tableIcons}
                        title="Учебные графики"
                        columns={[
                            {
                                title: 'Факультет',
                                field: 'faculty',
                                render: rowData => rowData.faculty.name,
                            },
                            {
                                title: 'Курс',
                                field: 'course',
                                render: rowData => `${rowData.studentCourse.specialty.name} / ${rowData.studentCourse.courseNumber} курс`,
                            },
                            {
                                title: 'Начало',
                                field: 'startDate',
                                render: rowData => moment(rowData.startDate).format("DD/MM/YY"),

                            },
                            {
                                title: 'Конец',
                                field: 'endDate',
                                render: rowData => moment(rowData.endDate).format("DD/MM/YY"),
                            },


                        ]}
                        data={allLearnPlans}
                        actions={[
                            {
                                icon: BsFillEyeFill,
                                tooltip: 'Подробнее',
                                onClick: (event, rowData) => {
                                    setLearnPlanIdToRedirect(rowData.publicId);
                                }
                            },
                            {
                                icon: Edit,
                                tooltip: 'Редактировать учебный план',
                                onClick: (event, rowData) => {
                                    setLearnPlanToEdit(rowData);
                                    setEditMode(true)
                                }
                            },
                            {
                                icon: Delete,
                                tooltip: 'Удалить учебный план',
                                onClick: (event, rowData) => {
                                    dispatch(setIdToDelete(rowData.publicId));
                                    dispatch(setDeleteMessage(`Удалить учебный план специальности: ${rowData.specialty.name}, ${rowData.courseNumber} курс`));
                                    dispatch(setDeleteFunction(() => {
                                        dispatch(deleteLearnPlan(rowData.publicId))
                                    }));
                                }
                            },

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
                <LearnPlanForm editMode={editMode}
                               setEditMode={setEditMode}
                               learnPlan={learnPlanToEdit}
                               setLearnPlanToEdit={setLearnPlanToEdit}/>}
            </div>

            {isFetching && <div className="row justify-content-center p-2 m-2"><Preloader/></div>}
            {learnPlanIdToRedirect&& <Redirect to={`/controlPanel/learnPlan/${learnPlanIdToRedirect}`}/>}
        </>
    )
};

export default LearnPlanTab;