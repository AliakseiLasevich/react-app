import React, {useState} from 'react';
import {HiArrowUp} from "react-icons/hi";

const StudentGroupForm = (props) => {

    const [aCount, setACount] = useState(0);
    const [bCount, setBCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [hasSubgroups, setHasSubgroups] = useState(true);


    return (
        <div className="border p-1 m-1 justify-content-center">
            <div>Группа <strong>{props.groupNumber + 1}</strong></div>

            <div>Количество студентов:</div>

            <div className="row justify-content-center">


                <div className="col">
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="specialtyId"> Подгруппа <strong>A</strong></label>
                            <input className="form-control"
                                   ref={props.register()} name={`studentGroups[${props.groupNumber}]subgroupA`}
                                   value={aCount}
                                   onChange={(e) => setACount(+e.target.value)}
                                   disabled={!hasSubgroups}/>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="specialtyId">Подгруппа <strong>Б</strong></label>
                            <input className="form-control"
                                   ref={props.register()} name={`studentGroups[${props.groupNumber}]subgroupB`}
                                   value={bCount}
                                   onChange={(e) => setBCount(+e.target.value)}
                                   disabled={!hasSubgroups}/>
                        </div>
                    </div>
                </div>


                <div className="btn btn-success btn-sm m-1 col-1 text-center h-50 align-self-center" onClick={() => {
                    setACount(0);
                    setBCount(0);
                    setTotalCount(0);
                    setHasSubgroups(!hasSubgroups);
                }}>
                    {hasSubgroups ? "🡰" : "🡲"}
                </div>

                <div className="form-row col">
                    <div className="form-group col">
                        Всего: <input className="form-control"
                                      ref={props.register()} value={+aCount + bCount || totalCount}
                                      onChange={(e) => setTotalCount(e.target.value)}
                                      name={`studentGroups[${props.groupNumber}]total`} disabled={hasSubgroups}/>

                    </div>
                </div>
            </div>
            <div className="mx-1 btn-warning btn btn-sm" onClick={() => props.remove(props.groupNumber)}>Удалить</div>
        </div>
    );
};

export default StudentGroupForm;