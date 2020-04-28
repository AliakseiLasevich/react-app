import {connect} from "react-redux";
import {setFaculties, setIsFetching} from "../../../../../redux/FacultyReducer";
import React from "react";
import * as axios from "axios";
import Faculty from "../Faculty/Faculty";
import Faculties from "./Faculties";
import Preloader from "../../../../Common/Preloader/Preloader";
import {NavLink, Route, withRouter} from "react-router-dom";

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

        let facultiesWithName = this.props.allFaculties.map(faculty =>
            <NavLink to={"/controlPanel/facultyManager/" + faculty.id}>
                <Faculty name={faculty.name} id={faculty.id} facultyUrl={this.props.match.params.facultyUrl}/>
            </NavLink>);

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


let WithUrlDataContainerComponent = withRouter(AllFaculties);

const AllFacultiesContainer = connect(mapStateToProps, {setFaculties, setIsFetching})(WithUrlDataContainerComponent);

export default AllFacultiesContainer;




