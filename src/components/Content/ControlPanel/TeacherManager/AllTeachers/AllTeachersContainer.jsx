import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {loadTeachers} from "../../../../../redux/TeacherReducer";
import Teacher from "../Teacher/Teacher";
import style from "./AllTeachers.module.css";

const HookTeacher = (props) => {

    const [teachers, setTeachers] = useState(props.allTeachers);

    //Load data from server
    useEffect(() => {
        props.loadTeachers();
    }, []);

    // //render if allTeachers change
    // useEffect(() => {
    //     setTeachers(props.allTeachers);
    // }, [props.allTeachers]);

    let teachersComponents = props.allTeachers.map(teacher => <Teacher name={teacher.name} key={teacher.id} id={teacher.id}
                                                              cathedra={teacher.cathedra.name}/>)

    return (
        <div className={style.AllTeachers}>
            {teachersComponents}
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        allTeachers: state.teacherReducer.allTeachers
    }
};

const AllTeachers = connect(mapStateToProps, {loadTeachers})(HookTeacher);

export default AllTeachers;