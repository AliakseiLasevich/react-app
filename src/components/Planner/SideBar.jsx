import React, {useEffect, useState} from 'react';
import WeekPicker from "../Common/WeekPicker";
import {useDispatch, useSelector} from "react-redux";
import {requestSpecialtiesByFacultyId, resetSpecialties} from "../../redux/SpecialtyReducer";
import {
    requestStudentCourseById,
    requestStudentCoursesByFacultyId,
    resetCurrentStudentCourse,
    resetStudentCourses
} from "../../redux/StudentsReducer";
import {requestLessonsByCourseAndDateRange} from "../../redux/LessonReducer";

const SideBar = ({week, setWeek}) => {
    const dispatch = useDispatch();
    const faculties = useSelector(state => state.facultyReducer.allFaculties);
    const studentCourses = useSelector(state => state.studentsReducer.studentCourses);
    const [facultyId, setFacultyId] = useState(null);
    const [studentsCourseId, setStudentsCourseId] = useState(null);

    useEffect(() => {
        dispatch(requestSpecialtiesByFacultyId(facultyId));
        return () => {
            dispatch(resetSpecialties());
            dispatch(resetCurrentStudentCourse());
        };
    }, [dispatch, facultyId]);

    useEffect(() => {
        dispatch(requestLessonsByCourseAndDateRange(studentsCourseId, week[0], week[5]));
        dispatch(requestStudentCourseById(studentsCourseId));
    }, [dispatch, studentsCourseId, week]);

    useEffect(() => {
        dispatch(requestStudentCoursesByFacultyId(facultyId));
        return () => {
            dispatch(resetStudentCourses())
        };
    }, [dispatch, facultyId]);


    return (
        <div className="col-lg-3 p-2 justify-content-center bg-white m-3">
            <div>

                <div className="col-12">
                    <WeekPicker setWeek={setWeek}/>
                </div>

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
                                onChange={(e) => setStudentsCourseId(e.target.value)}>
                            <option></option>
                            {studentCourses.map(studentCourse => <option key={studentCourse.publicId}
                                                                         value={studentCourse.publicId}>{studentCourse.specialty.name} / {studentCourse.courseNumber} курс </option>)}
                        </select>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SideBar;