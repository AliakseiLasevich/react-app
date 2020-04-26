import React from "react";
import style from "./AllFaculties.module.css";
import * as axios from 'axios';
import Faculty from "../Faculty/Faculty";

class AllFaculties extends React.Component {

    constructor(props) {
        super(props);

        axios.get("http://localhost:8080/rest/faculties")
            .then(response => this.props.setFaculties(response));
    }

    render() {
        let facultiesWithName = this.props.allFaculties.map(faculty => <Faculty name={faculty.name}/>);
        return (
            <div className={style.AllFaculties}>
                {facultiesWithName}
            </div>
        )
    }
}

export default AllFaculties;