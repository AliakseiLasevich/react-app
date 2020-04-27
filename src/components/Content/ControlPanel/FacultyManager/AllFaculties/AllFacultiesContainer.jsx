import {connect} from "react-redux";
import {setFaculties} from "../../../../../redux/FacultyReducer";
import React from "react";
import * as axios from "axios";
import Faculty from "../Faculty/Faculty";
import Faculties from "./Faculties";


class AllFaculties extends React.Component {

    componentDidMount() {
        axios.get("http://localhost:8080/rest/faculties")
            .then(response => this.props.setFaculties(response));
    }

    render() {
        let facultiesWithName = this.props.allFaculties.map(faculty => <Faculty name={faculty.name}/>);
        return (
           <Faculties facultiesWithName={facultiesWithName} />
        )
    }
}


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