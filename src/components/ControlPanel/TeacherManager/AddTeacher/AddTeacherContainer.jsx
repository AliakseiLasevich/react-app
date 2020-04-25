import React from "react";
import {connect} from "react-redux";
import AddTeacher from "./AddTeacher";
import {
    addTeacherActionCreator, updateCathedraInputField,
    updateLastNameInputField,
    updateNameInputField
} from "../../../../redux/TeacherReducer";

const mapStateToProps = (state) => {
    debugger

    return {
        nameInputField: state.teacherReducer.inputField.name,
        // lastNameInputField: state.teacherReducer.inputField.lastName
    }
};
const mapDispatchToProps = (dispatch) => {

    return {
        updateNameInputField: (name) => dispatch(updateNameInputField(name)),
        // updateLastNameInputField: (lastName) => dispatch(updateLastNameInputField(lastName)),
        // updateCathedraInputField: (cathedra) => dispatch(updateCathedraInputField(cathedra)),
        addTeacher: () => dispatch(addTeacherActionCreator())
    }
};


const AddTeacherContainer = connect(mapStateToProps, mapDispatchToProps)(AddTeacher);

export default AddTeacherContainer;