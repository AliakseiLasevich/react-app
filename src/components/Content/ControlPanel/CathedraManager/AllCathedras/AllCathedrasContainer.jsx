import {connect} from "react-redux";
import AllCathedras from "./AllCathedras";
import * as React from "react";
import {getCathedras} from "../../../../../redux/CathedraReducer";
import Cathedra from "../Cathedra/Cathedra";
import Preloader from "../../../../Common/Preloader/Preloader";


class CathedrasContainer extends React.Component {

    componentDidMount() {
        this.props.getCathedras();
    }

    render() {
        let cathedrasWithName = this.props.allCathedras.map(cathedra => <Cathedra name={cathedra.name}
                                                                                  id={cathedra.id}/>);
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <AllCathedras allCathedras={cathedrasWithName}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        allCathedras: state.cathedraReducer.allCathedras,
        isFetching: state.cathedraReducer.isFetching
    }
};

const AllCathedrasContainer = connect(mapStateToProps, {getCathedras})(CathedrasContainer);

export default AllCathedrasContainer;

