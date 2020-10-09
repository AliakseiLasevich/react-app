import React, {useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {requestLearnPlansByDateAndCourse, resetLearnPlans} from "../../redux/LearnPlanReducer";
import NewLessonButton from "./NewLessonButton";

const PlanerToolbar = ({currentStudentCourse, week, existingLessons, currentStudentCourseGroups}) => {

        const monday = moment(week[0]).format("YYYY-MM-DD");
        const saturday = moment(week[5]).format("YYYY-MM-DD");
        const dispatch = useDispatch();

/////////////////////////////////////////////////////////////////////////
        // Компоновка в один объект всех занятий по плану

        const learnPlan = useSelector(state => state.learnPlanReducer.allLearnPlans);

        useEffect(() => {
            dispatch(requestLearnPlansByDateAndCourse(monday, currentStudentCourse.publicId));
            return () => {
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
                    const type = lesson.type.toLowerCase();
                    counter[disciplineId][type] ? counter[disciplineId][type] += lesson.studentSubgroups.length : counter[disciplineId][type] = lesson.studentSubgroups.length;
                });
            }
            return counter;
        };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Сравнение занятий по плану и уже созданных. Исходя из разницы добавить кнопки для добавления новых занятий

        const calculateDifference = (plannedLessons, existing, disciplineId, type, subgroupsCount) => {
            return plannedLessons[type] * subgroupsCount - existing[disciplineId][type];
        };

        const findDifference = (planned, existingLessons, subgroupsInCourse) => {
            const types = ['lecture', 'practical', 'laboratory'];
            const toolbar = [];

            for (const [disciplineId, plannedLessons] of Object.entries(planned)) {
                const studentSubgroupsCount = subgroupsInCourse.length;
                if (existingLessons[disciplineId] === undefined) {
                    existingLessons[disciplineId] = {lecture: 0, practical: 0, laboratory: 0};
                }
                types.forEach(type => {
                   const difference = calculateDifference(plannedLessons, existingLessons, disciplineId, type, studentSubgroupsCount);
                   if(difference){
                       toolbar.push(<NewLessonButton type={type}
                                                     name={plannedLessons.name}
                                                     difference={difference}/>)
                   }
                });
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