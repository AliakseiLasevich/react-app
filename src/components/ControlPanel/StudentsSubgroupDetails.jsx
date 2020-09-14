import React from 'react';
import {FaRegTrashAlt, FaSave} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {deleteStudentSubgroup, updateStudentSubgroup} from "../../redux/StudentsReducer";

const StudentsSubgroupDetails = (props) => {
    const {subgroup} = props;
    const {register, handleSubmit, errors} = useForm({});
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        data.studentGroupId = props.studentGroup.publicId;
        dispatch(updateStudentSubgroup(data, subgroup.publicId))
    };

    const deleteSubgroup = () => {
        dispatch(deleteStudentSubgroup(subgroup.publicId))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row ">
                <div className="col-5 mb-1">
                    <div className="input-group">
                        <div className="input-group-prepend">
                                                            <span className="input-group-text"
                                                                  id="inputGroupPrepend">Подгруппа</span>
                        </div>
                        <input type="text" className="form-control"
                               placeholder="Имя подгруппы"
                               aria-describedby="inputGroupPrepend"
                               required
                               defaultValue={subgroup.name}
                               name="name"
                               ref={register({required: "Введите имя подгруппы"})}/>
                    </div>
                </div>

                <div className="col-5 mb-1">
                    <div className="input-group">
                        <div className="input-group-prepend">
                                                                <span className="input-group-text"
                                                                      id="inputGroupPrepend">Кол-во студентов</span>
                        </div>
                        <input type="text" className="form-control"
                               placeholder="Кол-во студентов"
                               aria-describedby="inputGroupPrepend"
                               required
                               defaultValue={subgroup.studentsCount}
                               name="studentsCount"
                               ref={register({required: "Введите кол-во студентов в подгруппе"})}/>
                    </div>
                </div>

                <div className="col-2 mb-1 w-auto d-flex justify-content-around">
                    <button className="btn btn-warning" type="submit">
                        <FaSave/>
                    </button>
                    <button className="btn btn-danger"
                            onClick={(e) => {
                                e.preventDefault();
                                deleteSubgroup();
                            }}>
                        <FaRegTrashAlt/>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default StudentsSubgroupDetails;