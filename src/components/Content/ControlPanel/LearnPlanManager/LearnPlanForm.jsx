import React, {useEffect, useMemo, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import style from "./LearnPlanForm.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DayPicker from "../../../Common/DayPicker";
import moment from "moment";

const LearnPlanForm = (props) => {

    const onSubmit = (data) => {
        props.setEditMode(false);
    };

    const handleClose = () => {
        props.setEditMode(false);
    };

    const {register, control, handleSubmit, errors} = useForm();
    const {fields, append, remove} = useFieldArray({
        control,
        name: "discipline",
    });

    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [weeks, setWeeks] = useState([]);

    let startDate = useMemo(() => moment(from).startOf('isoWeek'), [from]);
    let endDate = useMemo(() => moment(to).startOf('isoWeek'), [to]);
    const totalWeeks = useMemo(() => endDate.diff(startDate, "weeks") + 1, [endDate, startDate]);

    const calculateWeeks = () => {
        setWeeks(prevState => []);
        for (let i = 0, j = 0; i < totalWeeks; i++, j += 7) {
            setWeeks(prevState => [...prevState, moment(startDate).add(j, "days")])
        }
    };

    useEffect(() => {
        calculateWeeks(startDate)
    }, [startDate, endDate]);


    useEffect(() => {
        append([{}, {}, {}]);
    }, [append]);

    const weeksHeader = useMemo(() => weeks.map(week => <th key={week}><span
        className={style.verticalHeader}>{`${week.format("DD.MM.YY")} - ${moment(week).add(6, "days").format("DD.MM.YY")}`}</span>
    </th>), [weeks]);


    //TODO прикрутить образующиеся инпуты к правильной дисциплине
    const weeksInput = useMemo(() => weeks.map(week =>
        <td>
            <input type="text" className={style.inputField} name={`discipline[0].week${week}`} ref={register()}/>
        </td>), [weeks]);

    return (
        <div>
            <Dialog open={true}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth={false}>
                <DialogContent style={{minHeight: "70vh"}}>
                    <div className="container-fluid justify-content-center text-center">
                        <div className="h3">
                            График
                        </div>
                        <div className="m-1">
                            <DayPicker setFrom={setFrom}
                                       setTo={setTo}/>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
                        <table>
                            <thead>
                            <tr>
                                <th><span>Дисциплина</span></th>
                                <th><span className={style.verticalHeader}>Общее кол-во часов</span></th>
                                <th><span className={style.verticalHeader}>Всего</span></th>
                                <th><span className={style.verticalHeader}>Всего аудиторных</span></th>
                                <th><span className={style.verticalHeader}>Лекции</span></th>
                                <th><span className={style.verticalHeader}>Лабораторные</span></th>
                                <th><span className={style.verticalHeader}>Практич.+Семинарные</span></th>
                                <th><span className={style.verticalHeader}>Л</span></th>
                                <th><span className={style.verticalHeader}>Лр</span></th>
                                <th><span className={style.verticalHeader}>П</span></th>
                                <th><span className={style.verticalHeader}>Вс</span></th>
                                <th><span className={style.verticalHeader}>Кол-во зачётных ед.</span></th>
                                <th><span className={style.verticalHeader}>Потоки</span></th>
                                <th><span className={style.verticalHeader}>Экзамен</span></th>
                                <th><span className={style.verticalHeader}>Зачёт</span></th>
                                <th><span className={style.verticalHeader}>Курс. проект</span></th>
                                <th><span className={style.verticalHeader}>Курс. работа</span></th>
                                {weeksHeader}
                            </tr>
                            </thead>
                            <tbody>
                            {fields.map((item, index) => (
                                <tr key={item.id}>
                                    <td><textarea className={style.textArea}
                                                  type="text"
                                                  name={`discipline[${index}].discipline`}
                                                  ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].summary`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursSummary`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursCabinet`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursLecture`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursLaboratory`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursPracticalSeminary`} ref={register()}/>
                                    </td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursKSRL`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursKSRLR`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursKSRP`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].hoursKSRVS`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].testCount`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].flow`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].exam`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].test`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].courseProject`}
                                               ref={register()}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`discipline[${index}].courseWork`}
                                               ref={register()}/></td>

                                    {weeksInput}

                                    <td>
                                        <button onClick={() => remove(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button type="button" className="btn btn-sm btn-secondary m-1" onClick={() => append({})}>
                            Добавить дисциплину
                        </button>
                        <button className="btn btn-secondary btn-sm">Сохранить</button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )

};

export default LearnPlanForm;