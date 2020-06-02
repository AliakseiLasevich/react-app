import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import WeekPicker from "./WeekPicker";

const AddDiscipline = (props) => {

    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let discipline = {};
        // dispatch(postSpecialty(discipline))
    };

    return <form onSubmit={handleSubmit(onSubmit)}>

        <div>

            <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />


            <div><input type="text" name="discipline" placeholder="Дисциплина"/> Дисциплина</div>
            <div><input type="text" name="hoursSummary" placeholder="Общее кол-во часов"/>Общее кол-во часов</div>
            <div><input type="text" name="hoursCabinet" placeholder="Всего аудиторных"/>Всего аудиторных</div>
            <div><input type="text" name="hoursLecture" placeholder="Лекции"/>Лекции</div>
            <div><input type="text" name="hoursLaboratory" placeholder="Лабораторные"/>Лабораторные</div>
            <div><input type="text" name="hoursPracticalSeminary" placeholder="Практические и Семинарные"/>Практические
                и Семинарные
            </div>
            <div><input type="text" name="hoursKSRL" placeholder="КСР Л"/>КСР Л</div>
            <div><input type="text" name="hoursKSRLR" placeholder="КСР Лр"/>КСР Лр</div>
            <div><input type="text" name="hoursKSRP" placeholder="КСР П"/>КСР П</div>
            <div><input type="text" name="hoursKSRVS" placeholder="КСР Вс"/>КСР Вс</div>
            <div><input type="text" name="testCount" placeholder="Количество зачётных ед."/>Количество зачётных ед.
            </div>
            <div><input type="text" name="flow" placeholder="Поток"/>Поток</div>

            <div><input type="text" name="exam" placeholder="Экзамен"/>Экзамен</div>
            <div><input type="text" name="test" placeholder="Зачёт"/>Зачёт</div>
            <div><input type="text" name="courseProject" placeholder="Курсовой проект"/>Курсовой проект</div>
            <div><input type="text" name="courseJob" placeholder="Курсовая работа"/>Курсовая работа</div>

            <WeekPicker/>

            <input type="submit"/>

        </div>
    </form>

};

export default AddDiscipline;