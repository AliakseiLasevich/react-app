import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {loadTeachers} from "../../../../../redux/TeacherReducer";
import Teacher from "../Teacher/Teacher";

const HookTeacher = (props) => {

    const [teachers, setTeachers] = useState(props.allTeachers);

    //Load data from server
    useEffect(() => {
        props.loadTeachers();
    }, []);

    //render if allTeachers change
    useEffect(() => {
        alert("props changed")
        setTeachers(props.allTeachers);
    }, [props.allTeachers]);
    
    let teachersComponents = teachers.map(teacher => <Teacher name={teacher.name} key={teacher.id} id={teacher.id}
                                                              cathedra={teacher.cathedra.name}/>)

    return (
        <div>
            {teachersComponents}
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        allTeachers: state.teacherReducer.allTeachers
    }
};

const TeachersWithHooks = connect(mapStateToProps, {loadTeachers})(HookTeacher);

export default TeachersWithHooks;