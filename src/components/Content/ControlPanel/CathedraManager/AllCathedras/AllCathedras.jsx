import React, {useEffect} from "react";
import style from "./AllCathedras.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getCathedras} from "../../../../../redux/CathedraReducer";
import Cathedra from "../Cathedra/Cathedra";
import Preloader from "../../../../Common/Preloader/Preloader";

const AllCathedras = (props) => {

    //useDispatch hook
    const dispatch = useDispatch();

    //Load data from server
    useEffect(() => {
        dispatch(getCathedras());
    }, []);

    //add boolean "isFetching" from state
    const fetching = useSelector(state => state.cathedraReducer.isFetching);

    //add all faculties from state
    const cathedras = useSelector(state => state.cathedraReducer.allCathedras);

    let cathedrasComponents = cathedras.map(cathedra => <Cathedra name={cathedra.name} active={cathedra.active}
                                                                  key={cathedra.id} id={cathedra.id}
                                                                  facultyId={cathedra.faculty.id} facultyName={cathedra.faculty.name}/>)

    return (
        <div>
            {fetching ? <Preloader/> : null}
            {cathedrasComponents}
        </div>
    )
};

export default AllCathedras;