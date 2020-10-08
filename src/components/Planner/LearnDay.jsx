import React from 'react';
import moment from "moment";
import LearnDayRow from "./LearnDayRow";

const LearnDay = ({day, currentStudentCourseGroups, lessons}) => {

    const times = [
        '8.00-9.20',
        '9.40-11.00',
        '11.30-12.50',
        '13.10-14.30',
        '14.50-16.10',
        '16.30-17.50',
        '18.10-19.30'
    ];

    const subgroups = currentStudentCourseGroups.flatMap(group => group.studentSubgroups) || [];

    return (
        <>
            <tr>
                <td rowSpan="8">
                    <div> {moment(day).format('ll')}</div>
                    <div>{moment(day).format('dddd')}</div>
                </td>

            </tr>
            {times.map((time, timeIndex) =>
                <LearnDayRow key={time + timeIndex}
                             time={time}
                             timeIndex={timeIndex}
                             subgroups={subgroups}
                             lessons={lessons}
                             day={day}/>
            )}
        </>
    );
};

export default LearnDay;