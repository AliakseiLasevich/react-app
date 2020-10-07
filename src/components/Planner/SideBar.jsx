import React, {useEffect, useState} from 'react';
import WeekPicker from "../Common/WeekPicker";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {requestSpecialtiesByFacultyId, resetSpecialties} from "../../redux/SpecialtyReducer";
import {
    requestStudentCourseById,
    requestStudentCoursesByFacultyId,
    resetCurrentStudentCourse,
    resetStudentCourses
} from "../../redux/StudentsReducer";
import {requestLessonsByCourseAndDateRange} from "../../redux/LessonReducer";
import {requestLearnPlansThatDateInclude} from "../../redux/LearnPlanReducer";
import moment from "moment";

const SideBar = ({week, setWeek}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();
    const faculties = useSelector(state => state.facultyReducer.allFaculties);
    const [facultyId, setFacultyId] = useState({});

    useEffect(() => {
        dispatch(requestSpecialtiesByFacultyId(facultyId));
        return () => {
            dispatch(resetSpecialties());
            dispatch(resetCurrentStudentCourse());
        };
    }, [dispatch, facultyId]);

    const onSubmit = ({studentsCourseId}) => {
        dispatch(requestLessonsByCourseAndDateRange(studentsCourseId, week[0], week[5]));
        dispatch(requestStudentCourseById(studentsCourseId));
    };

    useEffect(() => {
        week && dispatch(requestLearnPlansThatDateInclude(moment(week[0]).format('YYYY-MM-DD')));
    }, [dispatch, week]);

    useEffect(() => {
        dispatch(requestStudentCoursesByFacultyId(facultyId));
        return () => {
            dispatch(resetStudentCourses())
        };
    }, [dispatch, facultyId]);

    const studentCourses = useSelector(state => state.studentsReducer.studentCourses);

    return (
        <div className="col-lg-3 p-2 justify-content-center bg-white m-3">
            <div>
                <div className="col-12">
                    <WeekPicker setWeek={setWeek}/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="facultyId">Факультет:</label>
                        <select className="form-control col-12" name="facultyId"
                                onChange={e => setFacultyId(e.target.value)}>
                            <option></option>
                            {faculties.map(faculty => <option key={faculty.publicId}
                                                              value={faculty.publicId}>{faculty.name}</option>)}
                        </select>
                        <div className="form-group">
                            <label htmlFor="studentsCourseId">Курс студентов:</label>
                            <select className="form-control" name="studentsCourseId"
                                    ref={register({required: "Выберите курс"})}>
                                <option></option>
                                {studentCourses.map(studentCourse => <option key={studentCourse.publicId}
                                                                             value={studentCourse.publicId}>{studentCourse.specialty.name} / {studentCourse.courseNumber} курс </option>)}
                            </select>
                            <div className="text-danger">
                                {errors.studentCourseId && errors.studentCourseId.message}
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-info col-12">Найти</button>
                </form>
            </div>
        </div>
    );
};

export default SideBar;