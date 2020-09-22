import React from 'react';
import Cell from "./Cell";

const Row = ({time, timeIndex, subgroups, lessons, day}) => {
    console.log(lessons)
    return (
        <tr>
            <td>{time}</td>
            {subgroups.map((subgroup, i) =>
                <td>
                    <Cell key={subgroup.publicId} timeIndex={timeIndex} subgroup={subgroup} lessons={lessons} day={day}/>
                </td>
            )}
        </tr>
    );
};

export default Row;