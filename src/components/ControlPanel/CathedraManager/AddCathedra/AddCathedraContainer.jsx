import React from "react";
import {AddCathedraActionCreator, CathedraTextUpdateActionCreator} from "../../../../redux/CathedraReducer";
import AddCathedra from "./AddCathedra";

const AddCathedraContainer = (props) => {

    let state = props.store.getState();
    window.state = state;

    let onAddCathedraClick = () => {
        let newCathedra = state.cathedraReducer.cathedraInputTextField;
        props.store.dispatch(AddCathedraActionCreator(newCathedra));
    }

    let onInputFieldChange = (body) => {
        state.cathedraInputTextField = body;
        props.store.dispatch(CathedraTextUpdateActionCreator(body));
    }

    return <AddCathedra cathedraInputTextField={state.cathedraReducer.cathedraInputTextField}
                        onAddCathedraClick={onAddCathedraClick}
                        onInputFieldChange={onInputFieldChange}
    />
}


export default AddCathedraContainer;

