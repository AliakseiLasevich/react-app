import React from "react";
import {connect} from "react-redux";
import AllTeachers from "./AllTeachers";

let mapStateToProps = (state) => {
    return {
        allTeachers: state.teacherReducer.allTeachers
    }
};

let mapDispatchToProps = (dispatch) => {
    return {}
};

const AllTeacherContainer = connect(mapStateToProps, mapDispatchToProps)(AllTeachers);

export default AllTeacherContainer;