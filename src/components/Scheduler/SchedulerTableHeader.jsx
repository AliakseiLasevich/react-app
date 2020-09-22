import React from 'react';

const SchedulerTableHeader = ({studentGroups}) => {

    const groups = Object.values(studentGroups)[0] || [];
    const subgroupsCount = groups.reduce((accumulator, group) => accumulator + group.studentSubgroups?.length, 0);

    return (
        <thead>
        <tr>
            <th rowSpan={4}>День</th>
            <th rowSpan={4}>Время</th>
            <th colSpan={subgroupsCount}># Курс</th>
        </tr>
        <tr>
            <th colSpan={subgroupsCount}>Специальность: ###</th>
        </tr>

        <tr>
            {groups.map(group =>
                <th key={group.publicId}
                    colSpan={group.studentSubgroups?.length}>
                    {group.number} Группа
                </th>
            )}
        </tr>

        <tr>
            {groups.map(gr =>
                    gr.studentSubgroups.map(subgroup =>
                        <th key={subgroup.publicId}>{subgroup.name}</th>)
            )}
        </tr>
        </thead>
    );
};

export default SchedulerTableHeader;