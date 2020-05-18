import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Teacher from "./Teacher";
import style from "./AllTeachers.module.css";
import {loadTeachers} from "../../../../redux/TeacherReducer";
import {getCathedrasWithFaculties} from "../../../../redux/CathedraReducer";
import Preloader from "../../../Common/Preloader/Preloader";

const AllTeachers = (props) => {

    //Get teachers from reducer state
    const teachers = useSelector(state => state.teacherReducer.allTeachers);

    const fetching = useSelector(state => state.teacherReducer.isFetching);

    //useDispatch hook
    const dispatch = useDispatch();

    //Load data from server
    useEffect(() => {
        dispatch(loadTeachers());
        dispatch(getCathedrasWithFaculties());
    }, []);

    //Map teachers from state to react components
    let teachersComponents = teachers.map(teacher => <Teacher name={teacher.name}
                                                              key={teacher.id}
                                                              id={teacher.id}
                                                              cathedra={teacher.cathedra.name}
                                                              cathedraId={teacher.cathedra.id}
                                                              active={teacher.active}/>)

    return (
        <div className={style.AllTeachers}>
            {fetching ? <Preloader/> : null}
            {teachersComponents}
        </div>
    )
};


export default AllTeachers;