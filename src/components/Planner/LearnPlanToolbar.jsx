import React, {useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {requestLearnPlansByDateAndCourse} from "../../redux/LearnPlanReducer";

const LearnPlanToolbar = ({currentStudentCourse, week, existingLessons, currentStudentCourseGroups}) => {

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
                disciplineLessonsOnCurrentWeek[disciplineId] = filteredLessons[0][1];
                disciplineLessonsOnCurrentWeek[disciplineId].name = discipline[disciplineId].name;
            });
            return disciplineLessonsOnCurrentWeek;
        };

        const filteredPlanByDateRange = filterLessonsInDisciplineByDateRange(monday, saturday, mapDisciplinesFromPlanToFlatObjects(learnPlan));

        // console.log(filteredPlanByDateRange)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const filterLessonSubgroupsByCourseSubgroups = (lesson, subgroupsInCourse) => {
            const subs = [];
            const lessonCopy = {...lesson};
            subgroupsInCourse.forEach(subgroupInCourse => {
                lessonCopy.studentSubgroups.forEach(subgroupInLesson => {
                    if (subgroupInCourse.publicId == subgroupInLesson.publicId) {
                        subs.push(subgroupInLesson)
                    }
                })
            });
            lessonCopy.studentSubgroups = subs;
            return lessonCopy;
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

        const findAllSubgroupsInCourse = (groups) => groups.flatMap(group => group.studentSubgroups) || [];

        const groupedByDisciplines = groupLessonsByDisciplines(existingLessons, findAllSubgroupsInCourse(currentStudentCourseGroups));

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

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const findDifference = (planned, existingLessons, subgroupsInCourse) => {
            const toolbar = [];

            for (const [disciplineId, plannedLessons] of Object.entries(planned)) {
                const studentSubgroupsCount = subgroupsInCourse.length;

                if (existingLessons[disciplineId] === undefined) {
                    existingLessons[disciplineId] = {lecture: 0, practical: 0, laboratory: 0};
                }

                if (plannedLessons.lecture * studentSubgroupsCount > existingLessons[disciplineId].lecture) {
                    toolbar.push(<button className="btn btn-warning mx-1">{plannedLessons.name}-Лекц</button>)
                }

                if (plannedLessons.practical * studentSubgroupsCount > existingLessons[disciplineId].practical) {
                    toolbar.push(<button className="btn btn-warning mx-1">{plannedLessons.name}-Пр</button>)
                }

                if (plannedLessons.laboratory * studentSubgroupsCount > existingLessons[disciplineId].laboratory) {
                    toolbar.push(<button className="btn btn-warning mx-1">{plannedLessons.name}-Лаб</button>)
                }

                // console.log(`${plannedLessons.name} - Запланировано на неделю лекций: ${plannedLessons.lecture}. При кол-ве подгрупп ${studentSubgroupsCount} должно быть ${plannedLessons.lecture * studentSubgroupsCount} лекций`);
                // console.log(`Распланировано лекций: ${existingLessons[disciplineId].lecture}.`);
            }

            return toolbar;
        };

        const createButtonToAddLesson = (plannedLessons, type, studentSubgroupsCount, existingLessons) => {

        };


        return (
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div> Специальность: {currentStudentCourse?.specialty && currentStudentCourse?.specialty.name}</div>
                    <div> Курс: {currentStudentCourse?.courseNumber && currentStudentCourse?.courseNumber}</div>
                    <div> План на: <strong>{monday} - {saturday}</strong></div>

                    {
                        findDifference(filteredPlanByDateRange, calculateLessonsByTypes(groupedByDisciplines), findAllSubgroupsInCourse(currentStudentCourseGroups))
                    }

                </div>
            </div>
        );
    }
;

export default LearnPlanToolbar;