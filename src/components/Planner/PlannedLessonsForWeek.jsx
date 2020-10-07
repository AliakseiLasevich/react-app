import React, {useEffect} from 'react';
import {requestLearnPlansByDateAndCourse} from "../../redux/LearnPlanReducer";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";

const PlannedLessonsForWeek = ({currentStudentCourse, monday, saturday}) => {

    const dispatch = useDispatch();
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
        return disciplines.map(discipline => {
            const ob = Object.entries(discipline);
            const filteredLessons = ob[0][1].lessons.filter(lesson => moment(lesson[0]).isSameOrAfter(firstDate) && moment(lesson[0]).isSameOrBefore(lastDate));
            return {
                [ob[0]]: filteredLessons[0][1]
            }
        });
    };

    const filteredPlanByDateRange = filterLessonsInDisciplineByDateRange(monday, saturday, mapDisciplinesFromPlanToFlatObjects(learnPlan));

    return (
        <div>

        </div>
    );
};

export default PlannedLessonsForWeek;