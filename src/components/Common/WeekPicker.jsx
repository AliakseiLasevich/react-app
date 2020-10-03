import React from 'react';
import {Helmet} from "react-helmet"
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import 'moment/locale/ru';

function getWeekDays(weekStart) {
    const days = [weekStart];
    for (let i = 1; i < 6; i += 1) {
        days.push(
            moment(weekStart)
                .add(i, 'days')
                // .add(4, 'hours')
                .toDate()
        );
    }
    return days;
}

function getWeekRange(date) {
    return {
        from: moment(date)
            .startOf('week')
            .add(4, 'hours')
            .toDate(),
        to: moment(date)
            .endOf('week')
            .add(4, 'hours')
            .toDate(),
    };
}

export default class WeekPicker extends React.Component {

    constructor(props) {
        super(props);
        // this.handleFromChange = this.handleFromChange.bind(this);
        // this.handleToChange = this.handleToChange.bind(this);
        this.state = {
            from: undefined,
            to: undefined,
            hoverRange: undefined,
            selectedDays: [],
            locale: 'ru'
        };
    }

    componentDidMount() {
        const currentDate = moment();
        this.props.setWeek(getWeekDays(getWeekRange(currentDate).from));
        this.setState({
            selectedDays: getWeekDays(getWeekRange(currentDate).from),
        });
    }

    handleDayChange = date => {
        this.props.setWeek(getWeekDays(getWeekRange(date).from));
        this.setState({
            selectedDays: getWeekDays(getWeekRange(date).from),
        });
    };

    handleDayEnter = date => {
        this.setState({
            hoverRange: getWeekRange(date),
        });
    };

    handleDayLeave = () => {
        this.setState({
            hoverRange: undefined,
        });
    };

    handleWeekClick = (weekNumber, days, e) => {
        this.setState({
            selectedDays: days,
        });
    };

    render() {
        const {hoverRange, selectedDays} = this.state;

        const daysAreSelected = selectedDays.length > 0;

        const modifiers = {
            hoverRange,
            selectedRange: daysAreSelected && {
                from: selectedDays[0],
                to: selectedDays[5],
            },
            hoverRangeStart: hoverRange && hoverRange.from,
            hoverRangeEnd: hoverRange && hoverRange.to,
            selectedRangeStart: daysAreSelected && selectedDays[0],
            selectedRangeEnd: daysAreSelected && selectedDays[5],
            sundays: {daysOfWeek: [0]},
        };

        const modifiersStyles = {
            sundays: {
                color: '#804e36',
                backgroundColor: '#f0b999',
            },
        };

        const WEEKDAYS_SHORT = {
            ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        };

        const MONTHS = {
            ru: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ],
        };
        const WEEKDAYS_LONG = {
            ru: [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
            ],
        };



        return (
            <div className="SelectedWeekExample">
                <DayPicker
                    selectedDays={selectedDays}
                    showOutsideDays
                    modifiers={modifiers}
                    onDayClick={this.handleDayChange}
                    onDayMouseEnter={this.handleDayEnter}
                    onDayMouseLeave={this.handleDayLeave}
                    onWeekClick={this.handleWeekClick}
                    firstDayOfWeek={1}
                    locale={'ru'}
                    weekdaysShort={WEEKDAYS_SHORT['ru']}
                    weekdaysLong={WEEKDAYS_LONG['ru']}
                    months={MONTHS['ru']}
                    numberOfMonths={1}
                    modifiersStyles={modifiersStyles}
                />
                <Helmet>
                    <style>{`
            .SelectedWeekExample .DayPicker-Month {
              border-collapse: separate;
            }
            .SelectedWeekExample .DayPicker-WeekNumber {
              outline: none;
            }
            .SelectedWeekExample .DayPicker-Day {
              outline: none;
              border: 1px solid transparent;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange {
              background-color: orange !important;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange {
              background-color: #fff7ba !important;
              border-top-color: #FFEB3B;
              border-bottom-color: #FFEB3B;
              border-left-color: #fff7ba;
              border-right-color: #fff7ba;
             
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeStart {
              background-color: #FFEB3B !important;
              border-left: 1px solid #FFEB3B;
              
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeEnd {
              background-color: #FFEB3B !important;
              border-right: 1px solid #FFEB3B;
               
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
            .SelectedWeekExample .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
              border-radius: 0 !important;
              color: #c71010 !important;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange:hover {
              border-radius: 0 !important;
            }
          `}</style>
                </Helmet>
            </div>
        );
    }
}