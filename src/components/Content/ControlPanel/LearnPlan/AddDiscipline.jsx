import React, {useReducer} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import WeekPicker from "./WeekPicker";
import style from "./AddDiscipline.module.css";

const AddDiscipline = (props) => {


    const onSubmit = (data) => {
        console.log(data)
        // dispatch(postSpecialty(discipline))
    };


    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };


    const {register, control, handleSubmit, errors} = useForm();

    const {fields, append, remove} = useFieldArray({
        control,
        name: "discipline"
    });


    return <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>


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
                <th>
                    <button>+week</button>
                </th>
            </tr>
            </thead>


            <tbody>
            {fields.map((item, index) => (
                <tr key={item.id}>
                    <td><textarea name="text" className={style.largeInputField} name={`discipline[${index}].discipline`}
                                  ref={register}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursSummary`}
                               ref={register}/></td>
                    <td><input type="text" className={style.inputField} name={`discipline[${index}].hoursCabinet`}
                               ref={register}/></td>
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

                    <button onClick={() => remove(index)}>Delete</button>
                </tr>
            ))}


            <button type="button" onClick={() => append({})}>
                +++
            </button>

            <tr>
                <button type={"submit"}>submit</button>
            </tr>


            </tbody>
        </table>

        <div>


            <WeekPicker/>


        </div>
    </form>

};

export default AddDiscipline;