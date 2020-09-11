import React from 'react';
import StudentsSubgroupForm from "./StudentsSubgroupForm";
import {FaSave, FaRegTrashAlt} from "react-icons/fa";
import StudentsGroupForm from "./StudentsGroupForm";


export default function StudentsGroupDetails(props) {
    const {studentCourse} = props;

    const [subgroupEditMode, setSubgroupEditMode] = React.useState(false);
    const [groupToEdit, setGroupToEdit] = React.useState(null);

    return (
        <div className="container bg-secondary p-2">

            <div className="row justify-content-center mb-2">
                <button className="btn btn-success align-self-center"
                        onClick={() => {
                            setGroupToEdit(true);
                        }}>
                    Добавить группу
                </button>
            </div>

            {studentCourse.studentGroups.map(studentGroup =>

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
                                    <button className="btn-outline-danger btn-sm btn mx-1">Удалить группу</button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="bg-white">
                                <td colSpan={4}>
                                    <div className="px-5 my-1">
                                        <button className="btn btn-success btn-sm m-1"
                                                onClick={() => setSubgroupEditMode(!subgroupEditMode)}>Добавить
                                            подгруппу
                                        </button>
                                        {!studentGroup.studentSubgroups.length &&
                                        <div className="alert-danger mt-1">
                                            В группе нет студентов. Добавьте подгруппу.
                                        </div>}

                                        {studentGroup.studentSubgroups.map(subgroup => (
                                            <form key={subgroup.publicId}>
                                                <div className="form-row ">
                                                    <div className="col-5 mb-1">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                            <span className="input-group-text"
                                                                  id="inputGroupPrepend">Подгруппа</span>
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   id="validationCustomUsername"
                                                                   placeholder="Username"
                                                                   aria-describedby="inputGroupPrepend"
                                                                   required
                                                                   defaultValue={subgroup.name}/>
                                                        </div>
                                                    </div>

                                                    <div className="col-5 mb-1">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"
                                                                      id="inputGroupPrepend">Кол-во студентов</span>
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   id="validationCustomUsername"
                                                                   placeholder="Username"
                                                                   aria-describedby="inputGroupPrepend"
                                                                   required
                                                                   defaultValue={subgroup.studentsCount}/>
                                                        </div>
                                                    </div>

                                                    <div className="col-2 mb-1 w-auto d-flex justify-content-around">
                                                        <button className="btn btn-warning" onClick={() => {
                                                        }}>
                                                            <FaSave/>
                                                        </button>
                                                        <button className="btn btn-danger"
                                                                onClick={() => {
                                                                }}>
                                                            <FaRegTrashAlt/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        ))}
                                    </div>
                                </td>

                            </tr>
                            </tbody>
                        </table>


                        {subgroupEditMode &&
                        <StudentsSubgroupForm editMode={subgroupEditMode}
                                              setEditMode={setSubgroupEditMode}
                                              studentGroup={studentGroup}/>}
                    </div>

                </div>
            )}

            {groupToEdit && <StudentsGroupForm groupToEdit={groupToEdit}
                                                 setGroupToEdit={setGroupToEdit}
                                                 studentCourse={studentCourse}/>
            }

        </div>


    );
}