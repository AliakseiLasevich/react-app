import {connect} from "react-redux";
import {setFaculties} from "../../../../redux/FacultyReducer";
import AllFaculties from "./AllFaculties";

let mapStateToProps = (state) => {
    return {
        allFaculties: state.facultyReducer.allFaculties
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setFaculties: (faculties) =>{dispatch(setFaculties(faculties))}
    }
};

const AllFacultiesContainer = connect(mapStateToProps, mapDispatchToProps)(AllFaculties);

export default AllFacultiesContainer;