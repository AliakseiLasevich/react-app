import React from 'react';
import moment from "moment";
import Row from "./Row";

const LearnDay = ({day, studentGroups, lessons}) => {

    const times = [
        '8.00-9.20',
        '9.40-11.00',
        '11.30-12.50',
        '13.10-14.30',
        '14.50-16.10',
        '16.30-17.50',
        '18.10-19.30'
    ];

    const groups = Object.values(studentGroups)[0] || [];
    const subgroups = groups.flatMap(group => group.studentSubgroups) || [];

    return (
        <>

            <tr>
                <td rowSpan="8">{moment(day).format('ll')}</td>
            </tr>

            {times.map((time, timeIndex) =>
                <Row key={time + timeIndex}
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