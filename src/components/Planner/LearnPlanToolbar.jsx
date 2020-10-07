import React, {useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {requestLearnPlansByDateAndCourse} from "../../redux/LearnPlanReducer";

const LearnPlanToolbar = ({currentStudentCourse, week, existingLessons, groups}) => {

        const monday = moment(week[0]).format("YYYY-MM-DD");
        const saturday = moment(week[5]).format("YYYY-MM-DD");
        const dispatch = useDispatch();

/////////////////////////////////////////////////////////////////////////
        const learnPlan = useSelector(state => state.learnPlanReducer.allLearnPlans);

        useEffect(() => {
            dispatch(requestLearnPlansByDateAndCourse(monday, currentStudentCourse.publicId))
        }, [currentStudentCourse.publicId, dispatch, monday]);

        const mapDisciplinesFromPlanToFlatObjects = (learnPlan) => learnPlan?.disciplinePlan?.map(plan => {
            return {
                [plan.discipline.publicId]: {
                    name: plan.discipline.name,
                    lessons: Object.entries(plan.lessons)
                }
            }
        });

        const filterLessonsInDisciplineByDateRange = (firstDate, lastDate, disciplines = []) => {
            const disciplineLessonsOnCurrentWeek = {};
            disciplines.forEach(discipline => {
                const ob = Object.entries(discipline);
                const filteredLessons = ob[0][1].lessons.filter(lesson => moment(lesson[0]).isSameOrAfter(firstDate) && moment(lesson[0]).isSameOrBefore(lastDate));
                const disciplineId = ob[0][0];
                disciplineLessonsOnCurrentWeek[disciplineId] = filteredLessons[0][1]
            });
            return disciplineLessonsOnCurrentWeek;
        };

        const filteredPlanByDateRange = filterLessonsInDisciplineByDateRange(monday, saturday, mapDisciplinesFromPlanToFlatObjects(learnPlan));

        console.log(filteredPlanByDateRange)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const subgroupsInCourse = groups.flatMap(group => group.studentSubgroups) || [];

        const filterLessonSubgroupsByCourseSubgroups = (lesson, subgroupsInCourse) => {
            const subs = [];
            subgroupsInCourse.forEach(subgroupInCourse => {
                lesson.studentSubgroups.forEach(subgroupInLesson => {
                    if (subgroupInCourse.publicId == subgroupInLesson.publicId) {
                        subs.push(subgroupInLesson)
                    }
                })
            });
            lesson.studentSubgroups = subs;
            return lesson;
        };


        const groupLessonsByDisciplines = (existingLessons, subgroupsInCourse) => {
            const lessonsGroupedByDiscipline = {};
            existingLessons.forEach(lesson => {
                if (lessonsGroupedByDiscipline[lesson.discipline.publicId] === undefined) {
                    lessonsGroupedByDiscipline[lesson.discipline.publicId] = [];
                }
                const z = lesson = filterLessonSubgroupsByCourseSubgroups(lesson, subgroupsInCourse)
                lessonsGroupedByDiscipline[lesson.discipline?.publicId].push(z)
            });
            return lessonsGroupedByDiscipline;
        };

        const groupedByDisciplines = groupLessonsByDisciplines(existingLessons, subgroupsInCourse);

        const calculateLessonsByTypes = (groupedLessonsByDisciplines) => {
            const counter = {};
            for (const [disciplineId, lessons] of Object.entries(groupedLessonsByDisciplines)) {
                lessons.forEach(lesson => {
                    if (counter[disciplineId] === undefined) {
                        counter[disciplineId] = {};
                    }
                    if (lesson.type === 'LECTURE') {
                        counter[disciplineId].lecture ? counter[disciplineId].lecture += lesson.studentSubgroups.length : counter[disciplineId].lecture = lesson.studentSubgroups.length;
                    } else if (lesson.type === 'PRACTICAL') {
                        counter[disciplineId].practical ? counter[disciplineId].practical += lesson.studentSubgroups.length : counter[disciplineId].practical = lesson.studentSubgroups.length;
                    } else if (lesson.type === 'LABORATORY') {
                        counter[disciplineId].laboratory ? counter[disciplineId].laboratory += lesson.studentSubgroups.length : counter[disciplineId].laboratory = lesson.studentSubgroups.length;
                    }
                });
            }
            return counter;
        };

        console.log(calculateLessonsByTypes(groupedByDisciplines))

        return (
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div> Специальность: {currentStudentCourse?.specialty && currentStudentCourse?.specialty.name}</div>
                    <div> Курс: {currentStudentCourse?.courseNumber && currentStudentCourse?.courseNumber}</div>
                    <div> План на: <strong>{monday} - {saturday}</strong></div>
                    <ul>
                        {/*{filteredPlanByDateRange &&*/}
                        {/*filteredPlanByDateRange.map((discipline, index) => <li key={discipline + index}>*/}
                        {/*    <strong> {discipline.name} </strong>:*/}
                        {/*    Лекции: {discipline.lessons[0][1].lecture} /*/}
                        {/*    Практические: {discipline.lessons[0][1].practical} /*/}
                        {/*    Лабораторные: {discipline.lessons[0][1].laboratory}*/}
                        {/*</li>)}*/}
                    </ul>
                </div>
            </div>
        );
    }
;

export default LearnPlanToolbar;