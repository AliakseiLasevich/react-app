import React from 'react';
import Cell from "./Cell";

const LearnDayRow = ({time, timeIndex, subgroups, lessons, day}) => {

    return (
        <tr>
            <td>{time}</td>
            {subgroups.map((subgroup, i) =>
                <td key={subgroup+i}>
                    <Cell key={subgroup.publicId} timeIndex={timeIndex} subgroup={subgroup} lessons={lessons} day={day}/>
                </td>
            )}
        </tr>
    );
};

export default LearnDayRow;