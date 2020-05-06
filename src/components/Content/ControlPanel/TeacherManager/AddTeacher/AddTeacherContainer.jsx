import {connect} from "react-redux";
import AddTeacher from "./AddTeacher";
import {addTeacherActionCreator, updateNameInputField} from "../../../../../redux/TeacherReducer";

const mapStateToProps = (state) => {

    return {
        nameInputField: state.teacherReducer.inputField.name,
    }
};
const mapDispatchToProps = (dispatch) => {

    return {
        updateNameInputField: (name) => dispatch(updateNameInputField(name)),
        addTeacher: () => dispatch(addTeacherActionCreator())
    }
};

const AddTeacherContainer = connect(mapStateToProps, mapDispatchToProps)(AddTeacher);

export default AddTeacherContainer;