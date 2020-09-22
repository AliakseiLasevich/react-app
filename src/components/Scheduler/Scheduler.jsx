import React, {useEffect, useState} from 'react';
import WeekPicker from "../Common/WeekPicker";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {requestFaculties} from "../../redux/FacultyReducer";
import {requestSpecialtiesByFacultyId, resetSpecialties} from "../../redux/SpecialtyReducer";
import {requestLearnPlansWithDateInclude} from "../../redux/LearnPlanReducer";
import SchedulerTable from "./SchedulerTable";
import {useForm} from "react-hook-form";
import {requestStudentCoursesByFacultyId, resetStudentCourses} from "../../redux/StudentsReducer";
import {requestLessonsByCourseAndDateRange} from "../../redux/LessonReducer";


const Scheduler = () => {

    const dispatch = useDispatch();
    const [week, setWeek] = useState([]);
    const [facultyId, setFacultyId] = useState({});
    const [studentCourseId, setStudentCourseId] = useState(null);
    const faculties = useSelector(state => state.facultyReducer.allFaculties);
    const allLearnPlans = useSelector(state => state.learnPlanReducer.allLearnPlans);
    const studentCourses = useSelector(state => state.studentsReducer.studentCourses);
    const lessons = useSelector(state => state.lessonReducer.lessons);
    const {register, handleSubmit, errors} = useForm();

    useEffect(() => {
        dispatch(requestFaculties());
    }, [dispatch]);

    useEffect(() => {
        dispatch(requestSpecialtiesByFacultyId(facultyId))
        return () => {
            dispatch(resetSpecialties())
        };
    }, [dispatch, facultyId]);

    useEffect(() => {
        week && dispatch(requestLearnPlansWithDateInclude(moment(week[0]).format('YYYY-MM-DD')));
    }, [dispatch, week]);

    useEffect(() => {
        dispatch(requestStudentCoursesByFacultyId(facultyId));
        return () => {
            dispatch(resetStudentCourses())
        };
    }, [dispatch, facultyId]);

    const facultyHasLearnPlan = (facultyId) => {
        return allLearnPlans.filter(learnPlan => learnPlan.faculty.publicId === facultyId).length;
    };

    const onSubmit = ({studentsCourseId}) => {
        dispatch(requestLessonsByCourseAndDateRange(studentsCourseId, week[0], week[5]))
        setStudentCourseId(studentsCourseId);
    };


    return (
        <div className="bg-light">
            <div className="bg-info p-2 text-center">
                {faculties.map(faculty => <button key={faculty.publicId} type="button"
                                                  className={facultyHasLearnPlan(faculty.publicId) ? "btn btn-sm btn-warning mx-1" : "btn btn-sm btn-info mx-1"}>
                    {faculty.name}
                </button>)}
            </div>

            <div className="row px-2 justify-content-center">
                <form className="col-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row justify-content-center">

                        <div className="form-group col-md-5">
                            <label htmlFor="facultyId">Факультет:</label>
                            <select className="form-control col" name="facultyId"
                                    onChange={e => setFacultyId(e.target.value)}>
                                <option></option>
                                {faculties.map(faculty => <option key={faculty.publicId}
                                                                  value={faculty.publicId}>{faculty.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="studentsCourseId">Выберите курс студентов:</label>
                            <select className="form-control" name="studentsCourseId"
                                    ref={register({required: "Выберите курс"})}>
                                <option></option>
                                {studentCourses.map(studentCourse => <option key={studentCourse.publicId}
                                                                             value={studentCourse.publicId}>{studentCourse.specialty.name} / {studentCourse.courseNumber} курс </option>)}
                            </select>
                            <div
                                className="text-danger">  {errors.studentCourseId && errors.studentCourseId.message} </div>
                        </div>

                        <button className="btn btn-sm btn-info col-4">Найти</button>
                    </div>
                </form>

                <div className="col-3">
                    <WeekPicker setWeek={setWeek}/>
                </div>
            </div>

            <SchedulerTable week={week}
                            lessons={lessons}
                            studentCourseId={studentCourseId}/>

        </div>
    );
};

export default Scheduler;