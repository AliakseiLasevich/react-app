import React from 'react';
import LearnDay from "./LearnDay";
import PlannerTableHeader from "./PlannerTableHeader";

const PlannerTable = ({week, lessons, currentStudentCourse, groups}) => {


    return (
        <div className="m-1 row justify-content-center">
            <table>
                <PlannerTableHeader groups={groups} currentStudentCourse={currentStudentCourse}/>
                <tbody>
                {week.map((day, i) =>
                    <LearnDay day={day}
                              key={day + i}
                              lessons={lessons}
                              groups={groups}/>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PlannerTable;