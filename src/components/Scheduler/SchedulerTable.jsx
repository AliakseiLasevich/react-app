import React from 'react';
import LearnDay from "./LearnDay";
import SchedulerTableHeader from "./SchedulerTableHeader";

const SchedulerTable = ({week, lessons, currentStudentCourse, groups}) => {


    return (
        <div className="m-1 row justify-content-center">
            <table>
                <SchedulerTableHeader groups={groups} currentStudentCourse={currentStudentCourse}/>
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

export default SchedulerTable;