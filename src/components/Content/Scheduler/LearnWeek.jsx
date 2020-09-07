import React, {useEffect, useMemo} from 'react';
import LearnDay from "./LearnDay";
import {useDispatch} from "react-redux";
import moment from "moment";

const LearnWeek = (props) => {

    const days = useMemo(() => props.week.map(day =>
        <LearnDay key={day.toString()} day={day}/>
    ), [props.week]);

    const dispatch = useDispatch();

    useEffect(() => {
    }, [props.week]);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th rowSpan={4}>День</th>
                    <th rowSpan={4}>Время</th>
                    <th colSpan={4}># Курс</th>
                </tr>
                <tr>
                    <th colSpan={4}>Специальность: ###</th>
                </tr>
                <tr>
                    <th colSpan={2}>Группа: 1</th>
                    <th colSpan={2}>Группа: 2</th>
                </tr>
                <tr>
                    <th colSpan={1}>1а</th>
                    <th colSpan={1}>1б</th>
                    <th colSpan={1}>2а</th>
                    <th colSpan={1}>2б</th>
                </tr>
                </thead>

                <tbody>
                {props.week.map(day =>
                    <React.Fragment>
                        <tr>
                            <td >{moment(day).format('ll')}</td>
                            <tr ><td>8.00-9.20</td></tr>
                            <tr ><td>9.40-11.00</td></tr>
                            <tr ><td>11.30-12.50</td></tr>
                            <tr ><td>13.10-14.30</td></tr>
                            <tr ><td>14.50-16.10</td></tr>
                            <tr ><td>16.30-17.50</td></tr>
                            <tr ><td>18.10-19.30</td></tr>
                        </tr>
                    </React.Fragment>
                )}
                </tbody>
            </table>

            {/*{days}*/}
        </div>
    );
};

export default LearnWeek;