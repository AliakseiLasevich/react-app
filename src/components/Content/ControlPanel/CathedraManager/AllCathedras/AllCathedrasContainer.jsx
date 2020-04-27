import {connect} from "react-redux";
import AllCathedras from "./AllCathedras";
import * as React from "react";
import * as axios from "axios";
import {setCathedras} from "../../../../../redux/CathedraReducer";
import Cathedra from "../Cathedra/Cathedra";


class CathedrasContainer extends React.Component {
    componentDidMount() {
        axios.get("http://localhost:8080/rest/cathedras")
            .then(response => {
                    this.props.setCathedras(response.data);
    }
            );

    }

    render() {

        // let cathedrasWithName = this.props.allCathedras.map(cathedra => console.log(cathedra));
        let cathedrasWithName = this.props.allCathedras.map(cathedra => <Cathedra name={cathedra.name}/>);
        return (
            <AllCathedras allCathedras={cathedrasWithName}/>
        )
    }
}

let mapStateToProps = (state) => {

    return {
        allCathedras: state.cathedraReducer.allCathedras

    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setCathedras: (cathedras) => {
            dispatch(setCathedras(cathedras));
        }
    }
};

const AllCathedrasContainer = connect(mapStateToProps, mapDispatchToProps)(CathedrasContainer);

export default AllCathedrasContainer;

