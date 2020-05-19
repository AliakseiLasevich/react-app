import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Specialty from "./Specialty";
import Preloader from "../../../Common/Preloader/Preloader";
import {getSpecialties} from "../../../../redux/SpecialtyReducer";

const AllSpecialties = (props) => {


    const specialties = useSelector(state => state.specialtyReducer.allSpecialties);

    const fetching = useSelector(state => state.specialtyReducer.isFetching);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getSpecialties());
    }, []);


    let specialtiesComponents = specialties.map(specialty => <Specialty name={specialty.name}
                                                                        key={specialty.id}
                                                                        id={specialty.id}
                                                                        facultyId={specialty.facultyId}
                                                                        code={specialty.code}
                                                                        active={specialty.active}/>)

    return (
        <div>
            {fetching ? <Preloader/> : null}
            {specialtiesComponents}
        </div>
    )
};


export default AllSpecialties;