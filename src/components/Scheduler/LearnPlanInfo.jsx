import React from 'react';
import moment from 'moment';

const LearnPlanInfo = ({learnPlans, currentStudentCourse, week, existingLessons, groups}) => {

    const monday = moment(week[0]).format("YYYY-MM-DD");
    const saturday = moment(week[5]).format("YYYY-MM-DD");
    const filterLearnPlansByCourseSelected = learnPlans.filter(learnPlan => learnPlan.studentCourse.publicId === currentStudentCourse.publicId)[0] || {};

    let disciplinesLessons = filterLearnPlansByCourseSelected?.disciplinePlan?.map(plan => {
        return {
            name: plan.discipline.name,
            disciplineId: plan.discipline.publicId,
            lessons: Object.entries(plan.lessons)
        }
    });

    const filterLessonsInDisciplineByDateRange = (firstDate, lastDate, disciplines) => {
        if (disciplines !== undefined) {
            disciplines.forEach(discipline => {
                const filteredLessons = discipline.lessons.filter(lesson => moment(lesson[0]).isSameOrAfter(monday) && moment(lesson[0]).isSameOrBefore(saturday));
                discipline.lessons = filteredLessons;
            });
        }
        return disciplines;
    };

    const filtered = filterLessonsInDisciplineByDateRange(monday, saturday, disciplinesLessons);

    const subgroups = groups.flatMap(group => group.studentSubgroups) || [];


    const calculateExistingLessons = (lessons, subgr) => {
        const calculated = {};
        lessons.forEach(lesson => {
            const count = lesson.studentSubgroups.length;
            if (calculated[lesson.discipline.publicId] && isSubgroupInLesson(subgr, lesson.studentSubgroups)) {
                calculated[lesson.discipline.publicId] += count
            } else {
                calculated[lesson.discipline.publicId] = count;
            }
        });
        return calculated;
    };

    const isSubgroupInLesson = (subgroups, lessonSubgroups) => {
        const subgroupsIds = subgroups.map(subgroup => subgroup.publicId);
        const lessonSubgroupsIds = lessonSubgroups.map(subgroup => subgroup.publicId);
        lessonSubgroupsIds.forEach(groupId => {
            if (subgroupsIds.includes(groupId)) {
                return true;
            }
        })
    };

    console.log(calculateExistingLessons(existingLessons, subgroups))
    
    return (
        <div className="row justify-content-center">
            <div className="col-auto">
                <div> Специальность: {currentStudentCourse?.specialty && currentStudentCourse?.specialty.name}</div>
                <div> Курс: {currentStudentCourse?.courseNumber && currentStudentCourse?.courseNumber}</div>
                <div> План на: <strong>{monday} - {saturday}</strong></div>
                <ul>
                    {filtered &&
                    filtered.map((discipline, index) => <li key={discipline + index}>
                        <strong> {discipline.name} </strong>:
                        Лекции: {discipline.lessons[0][1].lecture} /
                        Практические: {discipline.lessons[0][1].practical} /
                        Лабораторные: {discipline.lessons[0][1].laboratory}
                    </li>)}
                </ul>
            </div>
        </div>
    );
};

export default LearnPlanInfo;