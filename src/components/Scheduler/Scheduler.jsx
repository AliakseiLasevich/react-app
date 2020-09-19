import React, {useEffect, useState} from 'react';
import WeekPicker from "../Common/WeekPicker";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {requestFaculties} from "../../redux/FacultyReducer";
import {requestSpecialtiesByFacultyId, resetSpecialties} from "../../redux/SpecialtyReducer";
import {requestLearnPlansWithDateInclude} from "../../redux/LearnPlanReducer";
import LearnWeek from "./LearnWeek";
import {useForm} from "react-hook-form";
import {createCathedra, updateCathedra} from "../../redux/CathedraReducer";


const Scheduler = () => {

    const dispatch = useDispatch();
    const [week, setWeek] = useState([]);
    const [facultyId, setFacultyId] = useState({});
    const [specialtyId, setSpecialtyId] = useState({});
    const [courseNumber, setCourseNumber] = useState("");
    const faculties = useSelector(state => state.facultyReducer.allFaculties);
    const specialties = useSelector(state => state.specialtyReducer.allSpecialties);
    const allLearnPlans = useSelector(state => state.learnPlanReducer.allLearnPlans);
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


    const facultyHasLearnPlan = (facultyId) => {
        return allLearnPlans.filter(learnPlan => learnPlan.faculty.publicId === facultyId).length;
    };

    const onSubmit = ({facultyId, specialtyId, courseNumber}) => {
      console.log(facultyId)
      console.log(specialtyId)
      console.log(courseNumber)
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

                        <div className="form-group col-md-4">
                            <label htmlFor="facultyId">Факультет:</label>
                            <select className="form-control col" name="facultyId"
                                    onChange={e => setFacultyId(e.target.value)} ref={register}>
                                <option></option>
                                {faculties.map(faculty => <option key={faculty.publicId}
                                                                  value={faculty.publicId}>{faculty.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="facultyId">Специальность:</label>
                            <select className="form-control col" name="specialtyId"
                                    onChange={e => setSpecialtyId(e.target.value)} ref={register}>
                                <option></option>
                                {specialties.map(specialty => <option key={specialty.publicId}
                                                                      value={specialty.publicId}>{specialty.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group col-sm-2 col-xl-1">
                            <label htmlFor="courseNumber">Курс:</label>
                            <select className="form-control col" name="courseNumber"
                                    onChange={e => setCourseNumber(e.target.value)} ref={register}>
                                <option></option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                        <button className="btn btn-sm btn-info col-4">Найти</button>
                    </div>
                </form>

                <div className="col-3">
                    <WeekPicker setWeek={setWeek}/>
                </div>
            </div>

            <LearnWeek week={week}
                       specialtyId={specialtyId}
                       courseNumber={courseNumber}/>

        </div>
    );
};

export default Scheduler;