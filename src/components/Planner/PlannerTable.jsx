import React from 'react';
import LearnDay from "./LearnDay";
import PlannerTableHeader from "./PlannerTableHeader";

const PlannerTable = ({week, lessons, currentStudentCourse, currentStudentCourseGroups}) => {


    return (
        <div className="m-1 row justify-content-center">
            <table>
                <PlannerTableHeader currentStudentCourse={currentStudentCourse}
                                    currentStudentCourseGroups={currentStudentCourseGroups}/>

                <tbody>
                {week.map((day, i) =>
                    <LearnDay day={day}
                              key={day + i}
                              lessons={lessons}
                              currentStudentCourseGroups={currentStudentCourseGroups}/>
                )}
                </tbody>

            </table>
        </div>
    );
};

export default PlannerTable;