import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStudentGroups} from "../../../../redux/StudentGroupsReducer";
import StudentGroup from "./StudentGroup";

const AllStudentGroups = (props) => {

    const studentGroups = useSelector(state => state.studentGroupReducer.allStudentGroups);
    const fetching = useSelector(state => state.studentGroupReducer.isFetching);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStudentGroups());
    }, []);


    let studentGroupComponents = studentGroups.map(studentGroup => <StudentGroup key={studentGroup.id}
                                                                                 id={studentGroup.id}
                                                                                 specialtyId={studentGroup.specialtyId}
                                                                                 specialtyName={studentGroup.specialtyName}
                                                                                 course={studentGroup.course}
                                                                                 number={studentGroup.number}
                                                                                 active={studentGroup.active}/>)


    return (
        <div>
            {studentGroupComponents}
        </div>
    )
};

export default AllStudentGroups;