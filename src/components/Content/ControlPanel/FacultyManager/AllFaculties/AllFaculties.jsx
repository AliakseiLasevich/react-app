import {useDispatch, useSelector} from "react-redux";
import {loadFaculties} from "../../../../../redux/FacultyReducer";
import React, {useEffect} from "react";
import Faculty from "../Faculty/Faculty";
import Preloader from "../../../../Common/Preloader/Preloader";
import style from "./AllFaculties.module.css"

const AllFaculties = () => {

    //useDispatch hook
    const dispatch = useDispatch();

    //Load data from server
    useEffect(() => {
        dispatch(loadFaculties());
    }, []);

    //add boolean "isFetching" from state
    const fetching = useSelector(state => state.facultyReducer.isFetching);

    //add all faculties from state
    const faculties = useSelector(state => state.facultyReducer.allFaculties);

    let facultiesComponents = faculties.map(faculty => <Faculty name={faculty.name} id={faculty.id} active={faculty.active} key={faculty.id}/>);

    return (
        <div className={style.AllFaculties}>
            {fetching ? <Preloader/> : null}
            {facultiesComponents}
        </div>
    )
};

export default AllFaculties;




