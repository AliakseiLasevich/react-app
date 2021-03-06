import React, {useEffect, useState} from 'react';
import StudentsGroupForm from "./StudentsGroupForm";
import {setDeleteFunction, setDeleteMessage, setIdToDelete} from "../../redux/DeleteReducer";
import {deleteStudentGroup, requestStudentGroupsByCourseId} from "../../redux/StudentsReducer";
import {useDispatch, useSelector} from "react-redux";
import StudentsSubgroupDetails from "./StudentsSubgroupDetails";

import {HiUsers} from "react-icons/hi";

export default function StudentsGroupDetails(props) {

    const {studentCourse} = props;
    const dispatch = useDispatch();

    const [groupToEdit, setGroupToEdit] = useState(null);
    const groups = useSelector(state => state.studentsReducer.studentGroups[studentCourse.publicId] );

    const deleteGroup = (studentGroup) => {
        dispatch(setIdToDelete(studentGroup.publicId));
        dispatch(setDeleteMessage(`Удалить группу: ${studentGroup.number} на ${studentCourse.courseNumber} курсе по специальности ${studentCourse.specialty.name}`));
        dispatch(setDeleteFunction(() => {
                dispatch(deleteStudentGroup(studentGroup.publicId, studentCourse.publicId))
            }
        ))
    };

    useEffect(() => {
        dispatch(requestStudentGroupsByCourseId(studentCourse.publicId));
    }, [dispatch, studentCourse]);

    return (
        <div className="container bg-secondary p-2">
            <div className="row justify-content-center mb-2">
                <button className="btn btn-success align-self-center"
                        onClick={() => {
                            setGroupToEdit(true);
                        }}>
                    <HiUsers/>
                    <span className="mx-2">Добавить группу</span>
                </button>
            </div>

            {groups?.map(studentGroup =>
                <div key={studentGroup.publicId} className="col-12">
                    <div className="row  justify-content-center">
                        <table className="mb-3 mx-1 col-xl-11 col-lg-11">
                            <thead>
                            <tr>
                                <th className="text-center bg-white">
                                    Группа № {studentGroup.number}
                                </th>

                                <th className="bg-white">
                                    <button className="btn-outline-secondary btn-sm btn mx-1"
                                            onClick={() => {
                                                setGroupToEdit(studentGroup);
                                            }}>
                                        Изменить номер группы
                                    </button>
                                    <button className="btn-outline-danger btn-sm btn mx-1"
                                            onClick={() => {
                                                deleteGroup(studentGroup)
                                            }}>Удалить группу
                                    </button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="bg-white">
                                <td colSpan={4}>
                                    <div className="px-5 my-1">
                                        <StudentsSubgroupDetails studentGroup={studentGroup}/>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {groupToEdit && <StudentsGroupForm groupToEdit={groupToEdit}
                                               setGroupToEdit={setGroupToEdit}
                                               studentCourse={studentCourse}/>}

        </div>


    );
}