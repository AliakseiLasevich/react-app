import React, {useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {requestLearnPlansByDateAndCourse, resetLearnPlans} from "../../redux/LearnPlanReducer";

const PlanerToolbar = ({currentStudentCourse, week, existingLessons, currentStudentCourseGroups}) => {

        const monday = moment(week[0]).format("YYYY-MM-DD");
        const saturday = moment(week[5]).format("YYYY-MM-DD");
        const dispatch = useDispatch();

/////////////////////////////////////////////////////////////////////////
         // Компоновка в один объект всех занятий по плану

        const learnPlan = useSelector(state => state.learnPlanReducer.allLearnPlans);

        useEffect(() => {
            dispatch(requestLearnPlansByDateAndCourse(monday, currentStudentCourse.publicId))
            return ()=>{
                dispatch(resetLearnPlans());
            }
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
                if (filteredLessons[0] === undefined) {
                    return []
                }
                disciplineLessonsOnCurrentWeek[disciplineId] = filteredLessons[0][1] || [];
                disciplineLessonsOnCurrentWeek[disciplineId].name = discipline[disciplineId].name;
            });
            return disciplineLessonsOnCurrentWeek;
        };

        const filteredPlanByDateRange = filterLessonsInDisciplineByDateRange(monday, saturday, mapDisciplinesFromPlanToFlatObjects(learnPlan));


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Компоновка в один объект всех занятий уже созданных

        const filterLessonSubgroupsByCourseSubgroups = (lesson, subgroupsInCourse) => {
            const filteredSubgroups = [];
            const lessonCopy = {...lesson};
            subgroupsInCourse.forEach(subgroupInCourse => {
                lessonCopy.studentSubgroups.forEach(subgroupInLesson => {
                    if (subgroupInCourse.publicId === subgroupInLesson.publicId) {
                        filteredSubgroups.push(subgroupInLesson)
                    }
                })
            });
            lessonCopy.studentSubgroups = filteredSubgroups;
            return lessonCopy;
        };

        const groupLessonsByDisciplines = (existingLessons, subgroupsInCourse) => {
            const lessonsGroupedByDiscipline = {};
            existingLessons.forEach(lesson => {
                if (lessonsGroupedByDiscipline[lesson.discipline.publicId] === undefined) {
                    lessonsGroupedByDiscipline[lesson.discipline.publicId] = [];
                }
                const filteredSubgroups = filterLessonSubgroupsByCourseSubgroups(lesson, subgroupsInCourse);
                lessonsGroupedByDiscipline[lesson.discipline?.publicId].push(filteredSubgroups)
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
                    counter[disciplineId][lesson.type.toLowerCase()] ? counter[disciplineId][lesson.type.toLowerCase()] += lesson.studentSubgroups.length : counter[disciplineId][lesson.type.toLowerCase()] = lesson.studentSubgroups.length;
                });
            }
            return counter;
        };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Сравнение занятий по плану и созданных

        const findDifference = (planned, existingLessons, subgroupsInCourse) => {
            const toolbar = [];

            for (const [disciplineId, plannedLessons] of Object.entries(planned)) {
                const studentSubgroupsCount = subgroupsInCourse.length;

                if (existingLessons[disciplineId] === undefined) {
                    existingLessons[disciplineId] = {lecture: 0, practical: 0, laboratory: 0};
                }

                if (plannedLessons.lecture * studentSubgroupsCount > existingLessons[disciplineId].lecture) {
                    toolbar.push(<button className="btn btn-warning mx-1 btn-sm">{plannedLessons.name}-Лекц</button>)
                }

                if (plannedLessons.practical * studentSubgroupsCount > existingLessons[disciplineId].practical) {
                    toolbar.push(<button className="btn btn-warning mx-1 btn-sm">{plannedLessons.name}-Пр</button>)
                }

                if (plannedLessons.laboratory * studentSubgroupsCount > existingLessons[disciplineId].laboratory) {
                    toolbar.push(<button className="btn btn-warning mx-1 btn-sm">{plannedLessons.name}-Лаб</button>)
                }

                console.log(`${plannedLessons.name} - Запланировано на неделю лекций: ${plannedLessons.lecture}. При кол-ве подгрупп ${studentSubgroupsCount} должно быть ${plannedLessons.lecture * studentSubgroupsCount} лекций`);
                console.log(`==Распланировано лекций: ${existingLessons[disciplineId].lecture}.`);

                console.log(`${plannedLessons.name} - Запланировано на неделю практических: ${plannedLessons.practical}. При кол-ве подгрупп ${studentSubgroupsCount} должно быть ${plannedLessons.practical * studentSubgroupsCount} практик`);
                console.log(`==Распланировано практик: ${existingLessons[disciplineId].practical}.`);

                console.log(`${plannedLessons.name} - Запланировано на неделю лаб: ${plannedLessons.laboratory}. При кол-ве подгрупп ${studentSubgroupsCount} должно быть ${plannedLessons.laboratory * studentSubgroupsCount} лаб`);
                console.log(`==Распланировано лаб: ${existingLessons[disciplineId].laboratory}.`);
            }

            return toolbar;
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

export default PlanerToolbar;