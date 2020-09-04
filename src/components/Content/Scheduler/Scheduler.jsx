import React, {useEffect, useState} from 'react';
import WeekPicker from "../../Common/WeekPicker";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {requestFaculties} from "../../../redux/FacultyReducer";
import {requestSpecialtiesByFacultyId, resetSpecialties} from "../../../redux/SpecialtyReducer";
import {requestLearnPlansWithDateInclude} from "../../../redux/LearnPlanReducer";


const Scheduler = () => {

    const dispatch = useDispatch();
    const [week, setWeek] = useState([]);
    const [facultyId, setFacultyId] = useState({});
    const [specialtyId, setSpecialtyId] = useState({});
    const [courseNumber, setCourseNumber] = useState("");
    const faculties = useSelector(state => state.facultyReducer.allFaculties);
    const specialties = useSelector(state => state.specialtyReducer.allSpecialties);
    const allLearnPlans = useSelector(state => state.learnPlanReducer.allLearnPlans);

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

    return (
        <div className="bg-light">

            <div className="bg-info p-2 text-center">
                {faculties.map(faculty => <button key={faculty.publicId} type="button"
                                                  className="btn btn-sm btn-light mx-1 disabled">{faculty.name}</button>)}

            </div>

            <div className="row px-2">
                <form className="col-8">

                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-4">
                            <label htmlFor="facultyId">Факультет:</label>
                            <select className="form-control col" name="facultyId"
                                    onChange={e => setFacultyId(e.target.value)}>
                                <option></option>
                                {faculties.map(faculty => <option key={faculty.publicId}
                                                                  value={faculty.publicId}>{faculty.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="facultyId">Специальность:</label>
                            <select className="form-control col" name="specialtyId"
                                    onChange={e => setSpecialtyId(e.target.value)}>
                                <option></option>
                                {specialties.map(specialty => <option key={specialty.publicId}
                                                                      value={specialty.publicId}>{specialty.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group col-sm-2 col-xl-1">
                            <label htmlFor="courseNumber">Курс:</label>
                            <select className="form-control col" name="courseNumber"
                                    onChange={e => setCourseNumber(e.target.value)}>
                                <option></option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>

                    </div>
                </form>

                <div className="col-3">
                    <WeekPicker setWeek={setWeek}/>
                </div>
            </div>
        </div>
    );
};

export default Scheduler;