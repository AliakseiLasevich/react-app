import React from "react";
import {connect} from "react-redux";
import {getTeachers} from "../../../../../redux/TeacherReducer";
import Teacher from "../Teacher/Teacher";


class HookTeacher extends React.Component {


    componentDidMount() {
        this.props.getTeachers();
        console.log(this.props.allTeachers)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let teacherz = this.props.allTeachers.map(teacher => <Teacher name={teacher.name}/>)
        return (
            <div>
               {teacherz}

            </div>
        )
    }

};

let mapStateToProps = (state) => {
    return {
        allTeachers: state.teacherReducer.allTeachers
    }
};

const TeachersWithHooks = connect(mapStateToProps, {getTeachers})(HookTeacher);

export default TeachersWithHooks;