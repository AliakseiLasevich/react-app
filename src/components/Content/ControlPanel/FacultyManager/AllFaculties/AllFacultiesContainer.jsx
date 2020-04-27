import {connect} from "react-redux";
import {setFaculties, setIsFetching} from "../../../../../redux/FacultyReducer";
import React from "react";
import * as axios from "axios";
import Faculty from "../Faculty/Faculty";
import Faculties from "./Faculties";
import Preloader from "../../../../Common/Preloader/Preloader";

class AllFaculties extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get("http://localhost:8080/rest/faculties")
            .then(response => {
                    this.props.setFaculties(response);
                    this.props.setIsFetching(false);
                }
            );
    }

    render() {
        let facultiesWithName = this.props.allFaculties.map(faculty => <Faculty name={faculty.name}/>);
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Faculties facultiesWithName={facultiesWithName}/>
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        allFaculties: state.facultyReducer.allFaculties,
        isFetching: state.facultyReducer.isFetching
    }
};


const AllFacultiesContainer = connect(mapStateToProps, {
    setFaculties,
    setIsFetching
})(AllFaculties);

export default AllFacultiesContainer;