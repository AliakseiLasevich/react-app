import {connect} from "react-redux";
import {getFaculties} from "../../../../../redux/FacultyReducer";
import React from "react";
import Faculty from "../Faculty/Faculty";
import Faculties from "./Faculties";
import Preloader from "../../../../Common/Preloader/Preloader";
import {NavLink, withRouter} from "react-router-dom";

class AllFaculties extends React.Component {

    componentDidMount() {
        this.props.getFaculties();
    }

    render() {
        let facultiesWithName = this.props.allFaculties.map(faculty =>
            <NavLink to={"/controlPanel/facultyManager/" + faculty.id}>
                <Faculty name={faculty.name} id={faculty.id} facultyUrl={this.props.match.params.facultyUrl}/>
            </NavLink>);

        // let facultyEdit = (props) => {
        //     return <div>
        //         <input value={props.name}/>
        //         <input type="button" value="Save"/>
        //     </div>;
        // };

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

const AllFacultiesContainer = connect(mapStateToProps, {getFaculties})(WithUrlDataContainerComponent);

export default AllFacultiesContainer;




