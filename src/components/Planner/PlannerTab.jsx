import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {requestFaculties} from "../../redux/FacultyReducer";
import SideBar from "./SideBar";

import PlannerTable from "./PlannerTable";
import * as studentsReducer from "../../redux/StudentsReducer";
import LearnPlanToolbar from "./LearnPlanToolbar";

const PlannerTab = () => {
    const dispatch = useDispatch();
    const [week, setWeek] = useState([]);
    const currentStudentCourse = useSelector(state => state.studentsReducer.currentStudentCourse);
    const lessons = useSelector(state => state.lessonReducer.lessons);
    const studentGroups = useSelector(state => state.studentsReducer.studentGroups);
    const groups = Object.values(studentGroups)[0] || [];

    useEffect(() => {
        if (currentStudentCourse.publicId) {
            dispatch(studentsReducer.requestStudentGroupsByCourseId(currentStudentCourse.publicId));
        }
    }, [dispatch, currentStudentCourse]);

    useEffect(() => {
        dispatch(requestFaculties());
    }, [dispatch]);

    return (
        <div className="bg-light row">
            <SideBar week={week} setWeek={setWeek}/>
            <div className="col-8">
                <div>
                    {currentStudentCourse.publicId &&
                    <>
                        <LearnPlanToolbar currentStudentCourse={currentStudentCourse}
                                          groups={groups}
                                          week={week}
                                          existingLessons={lessons}/>
                        <PlannerTable week={week}
                                      lessons={lessons}
                                      currentStudentCourse={currentStudentCourse}
                                      groups={groups}/>
                    </>
                    }
                </div>
            </div>

        </div>
    );
};

export default PlannerTab;