import React, {useEffect} from 'react';
import LearnDay from "./LearnDay";
import {useDispatch, useSelector} from "react-redux";
import * as studentsReducer from "../../redux/StudentsReducer";
import SchedulerTableHeader from "./SchedulerTableHeader";

const SchedulerTable = ({week, lessons, studentCourseId}) => {
    const dispatch = useDispatch();
    const studentGroups = useSelector(state => state.studentsReducer.studentGroups);

    useEffect(() => {
        if (studentCourseId !== null) {
            dispatch(studentsReducer.requestStudentGroupsByCourseId(studentCourseId));
        }
    }, [dispatch, studentCourseId]);

    return (
        <div className="m-1 row justify-content-center">
            <table>
                <SchedulerTableHeader studentGroups={studentGroups}/>
                <tbody>
                {week.map(day =>
                    <LearnDay day={day}
                              key={day.toString()}
                              lessons={lessons}
                              studentGroups={studentGroups}/>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default SchedulerTable;