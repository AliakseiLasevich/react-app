import React from 'react';
import moment from 'moment';
import {Helmet} from "react-helmet";

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {formatDate, parseDate} from 'react-day-picker/moment';


export default class DayPicker extends React.Component {

    constructor(props) {
        super(props);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.state = {
            from: undefined,
            to: undefined,
        };
    }

    showFromMonth() {
        const {from, to} = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }

    handleFromChange(from) {
        // Change the from date and focus the "to" input field
        this.props.setFrom(from);
        this.setState({from});
    }

    handleToChange(to) {
        this.setState({to}, this.showFromMonth);
        this.props.setTo(to);
    }

    render() {
        const {from, to} = this.state;
        const modifiers = {start: from, end: to};
        return (
            <>
                <DayPickerInput
                    value={from}
                    placeholder="Начало"
                    format="DD/MM/YY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [from, {from, to}],
                        disabledDays: {after: to},
                        toMonth: to,
                        modifiers,
                        numberOfMonths: 1,
                        onDayClick: () => this.to.getInput().focus(),
                        firstDayOfWeek: 1,
                        locale: "ru",
                        weekdaysShort: WEEKDAYS_SHORT['ru'],
                        weekdaysLong: WEEKDAYS_LONG['ru'],
                        months: MONTHS['ru']
                    }}
                    onDayChange={this.handleFromChange}
                />{' '} — {' '}
                <span className="InputFromTo-to">
          <DayPickerInput className="d-inline"
                          ref={el => (this.to = el)}
                          value={to}
                          placeholder="Конец"
                          format="DD/MM/YY"
                          formatDate={formatDate}
                          parseDate={parseDate}
                          dayPickerProps={{
                              selectedDays: [from, {from, to}],
                              disabledDays: {before: from},
                              modifiers,
                              month: from,
                              fromMonth: from,
                              numberOfMonths: 1,
                              firstDayOfWeek: 1,
                              locale: "ru",
                              weekdaysShort: WEEKDAYS_SHORT['ru'],
                              weekdaysLong: WEEKDAYS_LONG['ru'],
                              months: MONTHS['ru'],
                          }}
                          onDayChange={this.handleToChange}

          />
        </span>
                <Helmet>
                    <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
                </Helmet>
            </>
        );
    }
}
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