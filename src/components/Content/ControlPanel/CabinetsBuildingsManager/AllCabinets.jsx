import React, {useEffect} from "react";
import Cabinet from "./Cabinet";
import {useDispatch, useSelector} from "react-redux";
import {getCabinetsByBuildingId} from "../../../../redux/CabinetsBuildingsReducer";

const AllCabinets = (props) => {

    const dispatch = useDispatch();
    const cabinets = useSelector(state => state.cabinetsBuildingsReducer.allCabinets);

    useEffect(() => {
        props.selectedBuildingId !== null && dispatch(getCabinetsByBuildingId(props.selectedBuildingId));
    }, [dispatch, props.selectedBuildingId]);

    const cabinetComponents = cabinets.map(cabinet => <Cabinet id={cabinet.id}
                                                               key={cabinet.id}
                                                               number={cabinet.number}
                                                               maxStudents={cabinet.maxStudents}
                                                               type={cabinet.type}/>
    );

    return (
        <div>
            {props.selectedBuildingId !== null && cabinetComponents}
        </div>
    )
};

export default AllCabinets;