import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {requestLearnPlanById} from "../../../../redux/LearnPlanReducer";
import moment from "moment";
import style from "./LearnPlanForm.module.css";

const LearnPlan = (props) => {

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.learnPlanReducer.isFetching);
    const learnPlan = useSelector(state => state.learnPlanReducer.learnPlan);

    useEffect(() => {
        dispatch(requestLearnPlanById(props.match.params.learnPlanId));
    }, [dispatch]);


    const weeksHeader = useMemo(() => {
        const weeks = Object.entries(learnPlan.disciplinePlan[0].lessons);
        return weeks.map(week => (
            <th key={`${week[0]}`} colSpan={2}>
                <span className={style.verticalHeader}>
                {moment(week[0]).format("DD.MM.YY")} - {moment(week[0]).add(6, "days").format("DD.MM.YY")}
                </span>
            </th>)
        )
    }, [learnPlan]);

    const disciplinePlanRows = useMemo(() => {
        return learnPlan.disciplinePlan.map(disciplinePlan=>{
                return (
                    <tr>
                        <td className={style.tableCell}>
                            {disciplinePlan.discipline?.name}
                        </td>
                        <td className={style.tableCell}>
                            {disciplinePlan.hoursSummary}
                        </td>
                        <td className={style.tableCell}>
                            {disciplinePlan.summary}
                        </td>
                        <td className={style.tableCell}>
                            {disciplinePlan.hoursLecture}
                        </td>
                    </tr>
                )
                })



    }, [learnPlan])

    return (
        <div className="m-1 p-2">
            <div className="h3 text-center m-1"> Учебный план:</div>
            <ul className="list-group">
                <li className="list-group-item">
                    Начало: {moment(learnPlan.startDate).format("DD/MM/YY")}
                </li>
                <li className="list-group-item">
                    Конец: {moment(learnPlan.endDate).format("DD/MM/YY")}
                </li>
                <li className="list-group-item">
                    Факультет: {learnPlan.faculty?.name}
                </li>
                <li className="list-group-item">
                    Специальность: {learnPlan.specialty?.name}
                </li>
                <li className="list-group-item">
                    Курс: {learnPlan.courseNumber}
                </li>
            </ul>
            <div className="h3 text-center">Дисциплины:</div>
            <table>
                <thead>
                <tr>
                    <th rowSpan={2} className="text-center">Дисциплина</th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Общее кол-во часов</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Всего</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Всего аудиторных</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Лекции</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Лабораторные</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Практич.+Семинарные</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>КСР Л</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>КСР Лр</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>КСР П</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>КСР Вс</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Кол-во зачётных ед.</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Потоки</span></th>
                    {weeksHeader}
                    <th rowSpan={2}><span className={style.verticalHeader}>Экзамен</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Зачёт</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Курс. проект</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Курс. работа</span></th>
                </tr>
                </thead>
                <tbody>
                {disciplinePlanRows}
                </tbody>
            </table>
        </div>
    );
};

export default LearnPlan;