import {AddCathedraActionCreator, CathedraTextUpdateActionCreator} from "../../../../../redux/CathedraReducer";
import AddCathedra from "./AddCathedra";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        cathedraInputTextField: state.cathedraReducer.cathedraInputTextField
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onAddCathedraClick: () => {
            dispatch(AddCathedraActionCreator());
        },
        onInputFieldChange: (body) => {
            dispatch(CathedraTextUpdateActionCreator(body));
        }
    }
};

const AddCathedraContainer = connect(mapStateToProps, mapDispatchToProps)(AddCathedra);

export default AddCathedraContainer;