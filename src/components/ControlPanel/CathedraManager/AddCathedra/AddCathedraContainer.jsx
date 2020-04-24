import {AddCathedraActionCreator, CathedraTextUpdateActionCreator} from "../../../../redux/CathedraReducer";
import AddCathedra from "./AddCathedra";
import {connect} from "react-redux";

// const AddCathedraContainer = (props) => {
//
//     let state = props.store.getState();
//
//     let onAddCathedraClick = () => {
//         let newCathedra = state.cathedraReducer.cathedraInputTextField;
//         props.store.dispatch(AddCathedraActionCreator(newCathedra));
//     }
//
//     let onInputFieldChange = (body) => {
//         state.cathedraInputTextField = body;
//         props.store.dispatch(CathedraTextUpdateActionCreator(body));
//     }
//
//     return <AddCathedra cathedraInputTextField={state.cathedraReducer.cathedraInputTextField}
//                         onAddCathedraClick={onAddCathedraClick}
//                         onInputFieldChange={onInputFieldChange}
//     />
// }

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