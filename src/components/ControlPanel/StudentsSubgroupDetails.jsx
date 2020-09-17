import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteStudentSubgroup, requestStudentSubgroupsByGroupId} from "../../redux/StudentsReducer";
import {FaRegEdit, FaRegTrashAlt, FaUsers} from "react-icons/fa";
import StudentsSubgroupForm from "./StudentsSubgroupForm";
import {setDeleteFunction, setDeleteMessage, setIdToDelete} from "../../redux/DeleteReducer";


const StudentsSubgroupDetails = (props) => {

    const {studentGroup} = props;
    const dispatch = useDispatch();
    const [subgroupToEdit, setSubgroupToEdit] = useState(null);

    useEffect(() => {
        dispatch(requestStudentSubgroupsByGroupId(studentGroup.publicId));
    }, [dispatch, studentGroup]);

    const subgroups = useSelector(state => state.studentsReducer.studentSubgroups[studentGroup.publicId]);

    return (
        <>
            <button className="btn btn-success btn-sm m-1"
                    onClick={() => setSubgroupToEdit(!subgroupToEdit)}>
                <FaUsers/>
                <span className="mx-2">Добавить подгруппу</span>
            </button>

            {subgroups?.length ? "" :
                <div className="alert-danger mt-1"> В группе нет студентов. Добавьте подгруппу. </div>}

            {subgroups?.map((subgroup) =>
                <div className="input-group mb-2 mr-sm-2" key={subgroup.publicId}>
                    <div className="input-group-prepend">
                        <div className="input-group-text">Подгруппа</div>
                    </div>
                    <input type="text" className="form-control"
                           placeholder="Username" disabled value={subgroup.name}/>

                    <div className="input-group-prepend">
                        <div className="input-group-text">Количество студентов</div>
                    </div>
                    <input type="text" className="form-control"
                           placeholder="Username" disabled value={subgroup.studentsCount}/>

                    <button className="btn btn-warning" onClick={() => setSubgroupToEdit(subgroup)}>
                        <FaRegEdit/>
                    </button>

                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(setIdToDelete(subgroup.publicId));
                        dispatch(setDeleteMessage(`Удалить подгруппу: ${subgroup.name}`));
                        dispatch(setDeleteFunction(() => {
                            dispatch(deleteStudentSubgroup(subgroup.publicId, studentGroup.publicId))
                        }));
                    }}><FaRegTrashAlt/></button>
                </div>
            )}

            {subgroupToEdit &&
            <StudentsSubgroupForm subgroupToEdit={subgroupToEdit}
                                  setSubgroupToEdit={setSubgroupToEdit}
                                  studentGroup={studentGroup}/>}

        </>
    );
};

export default StudentsSubgroupDetails;