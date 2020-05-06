import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Teacher from "../Teacher/Teacher";
import style from "./AllTeachers.module.css";
import {loadTeachers} from "../../../../../redux/TeacherReducer";

const AllTeachers = (props) => {

    //useDispatch hook
    const dispatch = useDispatch();

    //Load data from server
    useEffect(() => {
        dispatch(loadTeachers())
    }, []);

    //Get teachers from reducer state
    const teachers = useSelector(state => state.teacherReducer.allTeachers);

    //Map teachers from state to react components
    let teachersComponents = teachers.map(teacher => <Teacher name={teacher.name} key={teacher.id} id={teacher.id}
                                                              cathedra={teacher.cathedra.name}/>)

    return (
        <div className={style.AllTeachers}>
            {teachersComponents}
        </div>
    )
};


export default AllTeachers;