import {connect} from "react-redux";
import AllCathedras from "./AllCathedras";


let mapStateToProps = (state) => {
    return {
        allCathedras: state.cathedraReducer.allCathedras
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
};

const AllCathedrasContainer = connect(mapStateToProps, mapDispatchToProps)(AllCathedras);

export default AllCathedrasContainer;

