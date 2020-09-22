import React from 'react';
import moment from "moment";

const SchedulerTableRow = ({day, studentGroups, lessons}) => {

    const isLessonOnDate = (lesson, day) => {
        const d = moment(day).format('DD-MM-YYYY');
        const dd = moment(lesson.dateTime).format('DD-MM-YYYY');
        return d === dd;
    };

    const filteredLessons = lessons.filter(lesson => isLessonOnDate(lesson, day));

    const filterLessonSubgroupsBySubgroup = (lesson, subgroup) => {
        const filtered = lesson.studentSubgroups.filter(subgr => subgr.publicId === subgroup.publicId);
        return filtered;
    };

    const times = [
        <td>8.00-9.20</td>,
        <td>9.40-11.00</td>,
        <td>11.30-12.50</td>,
        <td>13.10-14.30</td>,
        <td>14.50-16.10</td>,
        <td>16.30-17.50</td>,
        <td>18.10-19.30</td>
    ];

    const groups = Object.values(studentGroups)[0] || [];
    const subgroups = groups.flatMap(group => group.studentSubgroups) || [];

    return (
        <>

            <tr>
                <td rowSpan="8">{moment(day).format('ll')}</td>
            </tr>

            {times.map((time, index) =>

                <tr key={time + index}>

                    {time}

                    {subgroups.map((subgr, i) =>

                        <td key={subgr.publicId}>

                            {filteredLessons.map(lesson =>
                                lesson.order === index && filterLessonSubgroupsBySubgroup(lesson, subgr).length
                                    ? lesson?.discipline?.name : '')}

                        </td>
                    )}

                </tr>
            )}

        </>
    );
};


export default SchedulerTableRow;