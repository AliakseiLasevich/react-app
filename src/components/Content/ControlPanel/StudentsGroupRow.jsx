import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import StudentsSubgroupForm from "./StudentsSubgroupForm";


export default function StudentsGroupRow(props) {
    const {studentGroup} = props;
    const [editMode, setEditMode] = React.useState(false);

    return (
        <React.Fragment style={{maxWidth: "600px"}}>
            <TableRow>
                <TableCell style={{backgroundColor: "lightGrey", width: "150px", padding: 0}} align={"center"}>
                    Группа № {studentGroup.number}
                </TableCell>

                <TableCell style={{backgroundColor: "lightGrey", padding: 0}} align={"center"}>
                    <button className="btn-light btn-sm btn mx-1">Изменить номер группы</button>
                    <button className="btn btn-sm btn-light m-1" onClick={() => setEditMode(!editMode)}>Добавить
                        подгруппу
                    </button>
                    <button className="btn-light btn-sm btn mx-1">Удалить группу</button>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={4} style={{margin: 0, padding: 0}} align={"center"}>
                    <div>
                        {!studentGroup.studentSubgroups.length &&
                        <div className="alert-danger mt-1">
                            В группе нет студентов. Добавьте подгруппу.
                        </div>}

                        {studentGroup.studentSubgroups.map(subgroup => (
                            <form>
                                <div className="form-row ">
                                    <div className="col-4 mb-1">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPrepend">Подгруппа</span>
                                            </div>
                                            <input type="text" className="form-control" id="validationCustomUsername"
                                                   placeholder="Username" aria-describedby="inputGroupPrepend" required
                                            defaultValue={subgroup.name}/>
                                        </div>
                                    </div>

                                    <div className="col-4 mb-1">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPrepend">Кол-во студентов</span>
                                            </div>
                                            <input type="text" className="form-control" id="validationCustomUsername"
                                                   placeholder="Username" aria-describedby="inputGroupPrepend" required
                                                   defaultValue={subgroup.studentsCount}/>
                                        </div>
                                    </div>

                                    <div className="col-2 mb-1 ">
                                        <div className="input-group">
                                           <button className="btn btn-info" onClick={()=>{}}>Сохранить</button>
                                        </div>
                                    </div>
                                    <div className="col-2 mb-1">
                                        <div className="input-group">
                                            <button className="btn btn-info" onClick={()=>{}}>Удалить</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ))}
                    </div>
                </TableCell>

            </TableRow>

            {editMode &&
            <StudentsSubgroupForm editMode={editMode}
                                  setEditMode={setEditMode}
                                  studentGroup={studentGroup}/>}


        </React.Fragment>


    );
}