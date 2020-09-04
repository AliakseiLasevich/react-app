import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {requestLearnPlanById} from "../../../redux/LearnPlanReducer";
import moment from "moment";
import style from "./LearnPlanForm.module.css";

const LearnPlan = (props) => {

    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.learnPlanReducer.isFetching);
    const learnPlan = useSelector(state => state.learnPlanReducer.learnPlan);

    useEffect(() => {
        dispatch(requestLearnPlanById(props.match.params.learnPlanId));
    }, [dispatch]);


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
                    <th rowSpan={3} className="text-center">Дисциплина</th>
                    <th rowSpan={3}><span className={style.verticalHeader}>Общее кол-во часов</span></th>
                    <th rowSpan={3}><span className={style.verticalHeader}>Всего</span></th>
                    <th rowSpan={1} colSpan={8} className="text-center">Количество часов</th>
                    <th rowSpan={3}><span className={style.verticalHeader}>Кол-во зачётных ед.</span></th>
                    <th rowSpan={3}><span className={style.verticalHeader}>Потоки</span></th>
                    {Object.entries(learnPlan.disciplinePlan[0].lessons).map(week => (
                        <th key={`${week[0]}`} colSpan={2} rowSpan={2}>
                <span className={style.verticalHeader}>
                {moment(week[0]).format("DD.MM.YY")} - {moment(week[0]).add(6, "days").format("DD.MM.YY")}
                </span>
                        </th>))}
                    <th rowSpan={3}><span className={style.verticalHeader}>Экзамен</span></th>
                    <th rowSpan={3}><span className={style.verticalHeader}>Зачёт</span></th>
                    <th rowSpan={3}><span className={style.verticalHeader}>Курс. проект</span></th>
                    <th rowSpan={3}><span className={style.verticalHeader}>Курс. работа</span></th>
                </tr>

                <tr>
                    <th rowSpan={2}><span className={style.verticalHeader}>Всего аудиторных</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Лекции</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Лабораторные</span></th>
                    <th rowSpan={2}><span className={style.verticalHeader}>Практич.+Семинарные</span></th>
                    <th rowSpan={1} colSpan={4} className="text-center">КСР</th>
                </tr>

                <tr>
                    <th rowSpan={1}><span className={style.verticalHeader}>Л</span></th>
                    <th rowSpan={1}><span className={style.verticalHeader}>Лр</span></th>
                    <th rowSpan={1}><span className={style.verticalHeader}>П</span></th>
                    <th rowSpan={1}><span className={style.verticalHeader}>Вс</span></th>
                    {Object.entries(learnPlan.disciplinePlan[0].lessons).map(week => {
                        return (
                            <React.Fragment key={`${week}_subheader`}>
                                <th className="text-center"> Л</th>
                                <th className="text-center"> П</th>
                            </React.Fragment>)
                    })
                    }
                </tr>
                </thead>

                <tbody>
                {learnPlan.disciplinePlan.map(disciplinePlan => {
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
                                {disciplinePlan.hoursCabinet}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.hoursLecture}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.hoursLaboratory}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.hoursPracticalSeminary}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.hoursKSRLecture}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.hoursKSRLaboratory}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.hoursKSRPractical}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.hoursKSRSummary}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.testCount}
                            </td>
                            <td className={style.tableCell}>
                                {disciplinePlan.flow}
                            </td>
                            {Object.entries(learnPlan.disciplinePlan[0].lessons).map(week => {
                                    return (<React.Fragment key={`${week[1]}lessons`}>
                                            <td className={style.tableCell}>
                                                {week[1].lecture}
                                            </td>
                                            <td className={style.tableCell}>
                                                {week[1].practice}
                                            </td>
                                        </React.Fragment>
                                    )
                                }
                            )}
                            <td className={style.tableCell}>
                                <input type="checkbox" disabled={true} checked={disciplinePlan.exam ? true : false}/>
                            </td>
                            <td className={style.tableCell}>
                                <input type="checkbox" disabled={true} checked={disciplinePlan.test ? true : false}/>
                            </td>
                            <td className={style.tableCell}>
                                <input type="checkbox" disabled={true} checked={disciplinePlan.courseProject ? true : false}/>
                            </td>
                            <td className={style.tableCell}>
                                <input type="checkbox" disabled={true} checked={disciplinePlan.courseWork ? true : false}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>

            </table>
        </div>
    );
};

export default LearnPlan;