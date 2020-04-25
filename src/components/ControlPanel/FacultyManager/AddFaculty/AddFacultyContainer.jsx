import {addFacultyActionCreator, FacultyTextUpdateActionCreator} from "../../../../redux/FacultyReducer";
import {connect} from "react-redux";
import AddFaculty from "./AddFaculty";

let mapStateToProps = (state) => {
    return {
        facultyInputTextField: state.facultyReducer.facultyInputTextField
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addFaculty: () => {
            dispatch(addFacultyActionCreator());
        },
        updateInputField: (text) => {
            dispatch(FacultyTextUpdateActionCreator(text));
        }
    }
};

let AddFacultyContainer = connect(mapStateToProps, mapDispatchToProps)(AddFaculty);

export default AddFacultyContainer;

