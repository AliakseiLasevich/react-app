import React, {useReducer, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import WeekPicker from "./WeekPicker";
import style from "./AddDiscipline.module.css";

const AddDiscipline = (props) => {

    // react-hook-form on submit button
    const onSubmit = (data) => {
       alert("submit")
        console.log(data)
    };

    // react-hook-form hook for multiple input fields
    const {register, control, handleSubmit, errors} = useForm();

    // react-hook-form hook for multiple input fields to one array
    const {fields, append, remove} = useFieldArray({
        control,
        name: "discipline"
    });

    //show/hide weeks selector
    const [addWeekMode, setAddWeekMode] = useState(false);


    const datesCount = {count: 0};

    function datesReducer(state, action) {
        switch (action.type) {
            case 'increment':
                return {count: state.count + 1};
            case 'decrement':
                return {count: state.count - 1};
            default:
                throw new Error();
        }
    }

    const [state, datesDispatch] = useReducer(datesReducer, datesCount);


    const dateFields = () => {
        for (let i = 0; i < state.count; i++) {
            console.log(state.count)
        }
    };

    let createInputs = count => {
        let arr = []
        for (let i = 0; i < count; i++) {
            arr.push(<div>ALOE</div>)
        }
        return(<div>
            {arr.map(input=>input)}
        </div>)
    }


    return <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
        {/*{createInputs(state.count)}*/}
        Count: {state.count}
        <button onClick={() => {
            datesDispatch({type: 'decrement'});
            dateFields();
        }}>-
        </button>

        <button onClick={() => {
            datesDispatch({type: 'increment'});
            dateFields();
        }}>+
        </button>


        <table>
            <thead>
            <tr>
                <th><span>Дисциплина</span></th>
                <th><span className={style.verticalHeader}>Общее кол-во часов</span></th>
                <th><span className={style.verticalHeader}>Всего</span></th>
                <th><span className={style.verticalHeader}>Всего аудиторных</span></th>
                <th><span className={style.verticalHeader}>Лекции</span></th>
                <th><span className={style.verticalHeader}>Лабораторные</span></th>
                <th><span className={style.verticalHeader}>Практич.+Семинарные</span></th>
                <th><span className={style.verticalHeader}>Л</span></th>
                <th><span className={style.verticalHeader}>Лр</span></th>
                <th><span className={style.verticalHeader}>П</span></th>
                <th><span className={style.verticalHeader}>Вс</span></th>
                <th><span className={style.verticalHeader}>Кол-во зачётных ед.</span></th>
                <th><span className={style.verticalHeader}>Потоки</span></th>
                <th><span className={style.verticalHeader}>Экзамен</span></th>
                <th><span className={style.verticalHeader}>Зачёт</span></th>
                <th><span className={style.verticalHeader}>Курс. проект</span></th>
                <th><span className={style.verticalHeader}>Курс. работа</span></th>

                {/*<th><span className={style.verticalHeader}>{weeks}</span></th>*/}

            </tr>
            </thead>


            <tbody>
            {fields.map((item, index) => (
                <tr key={item.id}>
                    <td><textarea name="text" className={style.largeInputField} name={`discipline[${index}].discipline`}
                                  ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].summary`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursSummary`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursCabinet`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursLecture`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursLaboratory`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField}
                               name={`discipline[${index}].hoursPracticalSeminary`} ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursKSRL`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursKSRLR`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursKSRP`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursKSRVS`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].testCount`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].flow`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].exam`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].test`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].courseProject`}
                               ref={register()}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].courseWork`}
                               ref={register()}/></td>

                    <td>
                        <button onClick={() => remove(index)}>Delete</button>
                    </td>

                </tr>

            ))}

            </tbody>
        </table>


        <button type="button" onClick={() => append({})}>
            +++
        </button>

        <button onClick={() => console.log("add date")}>Add date</button>

        <button type={"submit"}>submit</button>

        <button onClick={() => setAddWeekMode(!addWeekMode)}>+week</button>

        {addWeekMode && <WeekPicker prprp={"MANUAL PROPS"}/>}

    </form>

};

export default AddDiscipline;