import React, {useEffect, useMemo, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import style from "./LearnPlanForm.module.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DayPicker from "../../Common/DayPicker";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {createLearnPlan} from "../../../redux/LearnPlanReducer";
import {requestFaculties} from "../../../redux/FacultyReducer";
import {requestSpecialties, requestSpecialtiesByFacultyId, resetSpecialties} from "../../../redux/SpecialtyReducer";
import {requestDisciplines} from "../../../redux/DisciplinesReducer";

const LearnPlanForm = (props) => {

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        data.startDate = startDate.format("YYYY-MM-DD");
        data.endDate = moment(endDate).add(6, 'days').format("YYYY-MM-DD");
        debugger
        dispatch(createLearnPlan(data));
    };

    const handleClose = () => {
        props.setEditMode(false);
    };

    const {register, control, handleSubmit, errors} = useForm();
    const {fields, append, remove} = useFieldArray({
        control, name: "disciplinePlan",
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

    const [facultyId, setFacultyId] = useState({});
    const [specialtyId, setSpecialtyId] = useState({});
    const [courseNumber, setCourseNumber] = useState("");
    const faculties = useSelector(state => state.facultyReducer.allFaculties);
    const specialities = useSelector(state => state.specialtyReducer.allSpecialties);
    const disciplines = useSelector(state => state.disciplinesReducer.allDisciplines);

    useEffect(() => {
        dispatch(requestFaculties());
        dispatch(requestDisciplines());
        append([{}]);
    }, []);

    const isNumberOrEmpty = (value) => {
        return Number.isInteger(parseInt(value)) || value === "";
    };

    useEffect(() => {
        dispatch(requestSpecialtiesByFacultyId(facultyId));
        return () => {
            dispatch(resetSpecialties())
        };
    }, [dispatch, facultyId]);

    return (
        <div>
            <Dialog open={true}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth={false}>
                <DialogContent style={{minHeight: "70vh"}}>
                    <div className="container-fluid justify-content-center text-center">
                        <div className="h3">
                            Учебный план
                        </div>
                        <div className="m-1">
                            <DayPicker setFrom={setFrom}
                                       setTo={setTo}/>
                        </div>

                        <div className="input-group justify-content-center">
                            <div>
                                <label htmlFor="facultyId">Факультет:</label>
                                <select className="form-control" name="facultyId"
                                        ref={register({required: "Выберите факультет"})}
                                        value={facultyId} onChange={e => setFacultyId(e.target.value)}>
                                    <option></option>
                                    {faculties.map(faculty => <option key={faculty.publicId}
                                                                      value={faculty.publicId}>{faculty.name}</option>)}
                                </select>
                                <div className="text-danger">  {errors.facultyId && errors.facultyId.message} </div>
                            </div>
                            <div>
                                <label htmlFor="facultyId">Специализация:</label>
                                <select className="form-control" name="specialtyId"
                                        ref={register({required: "Выберите специализацию"})}
                                        value={specialtyId} onChange={e => setSpecialtyId(e.target.value)}>
                                    <option></option>
                                    {specialities.map(specialty => <option key={specialty.publicId}
                                                                           value={specialty.publicId}>{specialty.name}</option>)}
                                </select>
                                <div className="text-danger">  {errors.specialtyId && errors.specialtyId.message} </div>
                            </div>
                            <div>
                                <label htmlFor="facultyId">Курс:</label>
                                <input className="form-control" name="courseNumber"
                                       ref={register({required: "Введите номер курса"})}
                                       value={courseNumber} onChange={e => setCourseNumber(e.target.value)}>
                                </input>
                                <div
                                    className="text-danger">  {errors.courseNumber && errors.courseNumber.message} </div>
                            </div>

                        </div>

                        <div>
                            <button type="button" className="btn btn-sm btn-secondary m-1" onClick={() => append({})}>
                                Добавить дисциплину
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
                        <table>
                            <thead>
                            <tr>
                                <th rowSpan={3} className="text-center">Дисциплина</th>
                                <th rowSpan={3}><span className={style.verticalHeader}>Общее кол-во часов</span></th>
                                <th rowSpan={3}><span className={style.verticalHeader}>Всего</span></th>
                                <th rowSpan={1} colSpan={8} className="text-center">Количество часов</th>
                                <th rowSpan={3}><span className={style.verticalHeader}>Кол-во зачётных ед.</span></th>
                                <th rowSpan={3}><span className={style.verticalHeader}>Потоки</span></th>
                                {weeks.map(week => {
                                    return (
                                        <th key={`${week}_header`} colSpan={3} rowSpan={2} className="text-center">
            <span className={style.verticalHeader}>
            {`${week.format("DD.MM.YY")} - ${moment(week).add(6, "days").format("DD.MM.YY")}`}
            </span></th>)
                                })}
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
                                {weeks.map(week => {
                                    return (
                                        <React.Fragment key={`${week}_subheader`}>
                                            <th className="text-center">Лк</th>
                                            <th className="text-center">Пр</th>
                                            <th className="text-center">Лб</th>
                                        </React.Fragment>)
                                })
                                }
                            </tr>
                            </thead>

                            <tbody>
                            {fields.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <select className="form-control"
                                                name={`disciplinePlan[${index}].disciplinePublicId`}
                                                ref={register({required: "Выберите дисциплину"})}>
                                            <option></option>
                                            {disciplines.map(discipline => <option key={discipline.publicId}
                                                                                   value={discipline.publicId}>{discipline.name}</option>)}
                                        </select>
                                    </td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursSummary`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].summary`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursCabinet`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursLecture`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursLaboratory`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursPracticalSeminary`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursKSRLecture`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursKSRLaboratory`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursKSRPractical`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].hoursKSRSummary`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].testCount`}
                                               ref={register({validate: value => isNumberOrEmpty(value)})}/></td>
                                    <td><input type="text" className={style.inputField}
                                               name={`disciplinePlan[${index}].flow`}
                                               ref={register()}/></td>
                                    {weeks.map(week => {
                                        return (
                                            <React.Fragment key={`${week}_input`}>
                                                <td className={style.cellLecture}>
                                                    <input type="text"
                                                           className={style.inputField + ' ' + style.smallInputField}
                                                           name={`disciplinePlan[${index}].lessons[${moment(week).format('YYYY-MM-DD')}].lecture`}
                                                           ref={register()}/>
                                                </td>
                                                <td className={ style.cellPractice}>
                                                    <input type="text"
                                                           className={style.inputField + ' ' + style.smallInputField}
                                                           name={`disciplinePlan[${index}].lessons.${moment(week).format('YYYY-MM-DD')}.practice`}
                                                           ref={register()}/>
                                                </td>
                                                <td className={style.cellLaboratory}>
                                                    <input type="text"
                                                           className={style.inputField + ' ' + style.smallInputField}
                                                           name={`disciplinePlan[${index}].lessons.${moment(week).format('YYYY-MM-DD')}.laboratory`}
                                                           ref={register()}/>
                                                </td>
                                            </React.Fragment>)
                                    })}
                                    <td>
                                        <input type="checkbox" name={`disciplinePlan[${index}].exam`} ref={register}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name={`disciplinePlan[${index}].test`} ref={register}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name={`disciplinePlan[${index}].courseProject`}
                                               ref={register}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name={`disciplinePlan[${index}].courseWork`}
                                               ref={register}/>
                                    </td>
                                    <td>
                                        <button className="mx-1" onClick={() => remove(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="row justify-content-center">
                            <button className="btn btn-sm btn-secondary m-1">Сохранить</button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default LearnPlanForm;