import React from 'react';

const PlannerTableHeader = ({currentStudentCourseGroups, currentStudentCourse}) => {

    const subgroupsCount = currentStudentCourseGroups.reduce((accumulator, group) => accumulator + group.studentSubgroups?.length, 0);

    return (
        <thead>
        <tr>
            <th rowSpan={4}>День</th>
            <th rowSpan={4}>Время</th>
            <th colSpan={subgroupsCount}>{currentStudentCourse.courseNumber} курс</th>
        </tr>
        <tr>
            <th colSpan={subgroupsCount}>Специальность: {currentStudentCourse?.specialty?.name}</th>
        </tr>

        <tr>
            {currentStudentCourseGroups.map(group =>
                <th key={group.publicId}
                    colSpan={group.studentSubgroups?.length}>
                    {group.number} Группа
                </th>
            )}
        </tr>

        <tr>
            {currentStudentCourseGroups.map(gr =>
                    gr.studentSubgroups.map(subgroup =>
                        <th key={subgroup.publicId}>{subgroup.name}</th>)
            )}
        </tr>
        </thead>
    );
};

export default PlannerTableHeader;