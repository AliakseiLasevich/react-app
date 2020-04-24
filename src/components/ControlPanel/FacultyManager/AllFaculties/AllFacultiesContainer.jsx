import React from "react";
import {connect} from "react-redux";
import AllFaculties from "./AllFaculties";

let mapStateToProps = (state) => {
    return {
        allFaculties: state.facultyReducer.allFaculties
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
    }
};

const AllFacultiesContainer = connect(mapStateToProps, mapDispatchToProps)(AllFaculties);

export default AllFacultiesContainer;