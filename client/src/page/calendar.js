import React, { useState, useEffect } from 'react';
import moment from 'moment';

import CalenderHeader from '../components/calenderHeader';
import DateComponent from '../components/dateContainer';
import {
    CalenderDateDayContainerActive,
    CalenderDateDayContainerDisable,
    CalenderDateContainer,
    CalenderWeekDayContainer,
    CalenderWeekContainer,
    CalendarContainerBody,
    CalendarContainer,
} from '../styledComponent/index';
import {
    weekArray,
    gridArray
} from '../constant/index'
import axios from "axios";

function Calendar() {
    const [selectedYear, setSelectedYear] = useState(2022);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [date, setDate] = useState([]);

    const startOfDay = moment().year(selectedYear).month(selectedMonth).startOf("month").format('ddd');
    const monthSize = parseInt(moment().year(selectedYear).month(selectedMonth).endOf("month").format('DD'));

    const startIndex = weekArray.indexOf(startOfDay)
    const endIndex = startIndex + monthSize;

    useEffect(() => {
        getReserved();

        const defaultYear = moment().format('YYYY')
        const defaultMonth = moment().format('MM')

        setSelectedYear( parseInt(defaultYear) )
        setSelectedMonth( parseInt(defaultMonth) - 1 )
    }, [])

    const getReserved = () => {
        axios.get('/api/getReserved2')
            .then((res) => {
                let tempArr = [];
                for (const element of res.data) {
                    tempArr.push(moment(element.date).format('YYYY-MM-DD'));
                }
                setDate(tempArr);
            });
    }

    const onYearSelect = ( year ) => {
        const { value } = year
        setSelectedYear( parseInt(value) )
    }

    const onMonthSelect = ( month ) => {
        const { value } = month
        setSelectedMonth( parseInt(value - 1) )
    }

    return (
        <CalendarContainer>
            <CalenderHeader
                onYearSelect = { onYearSelect }
                onMonthSelect = { onMonthSelect }
                defaultYear = { selectedYear.toString() }
                defaultMonth = { (selectedMonth + 1).toString() }
            />
            <CalendarContainerBody>
                <CalenderWeekContainer>
                    {
                        weekArray.map( ( data, i ) => <CalenderWeekDayContainer key={i}>{ data }</CalenderWeekDayContainer> )
                    }
                </CalenderWeekContainer>
                <CalenderDateContainer>
                    {
                        gridArray.map( (data, i) =>
                            i >= startIndex && i < endIndex ?
                                <CalenderDateDayContainerActive key={i}>
                                    <DateComponent
                                        date={ i - startIndex + 1 }
                                        month={ selectedMonth + 1 }
                                        year={ selectedYear }
                                    />
                                </CalenderDateDayContainerActive> :
                                <CalenderDateDayContainerDisable key={i}></CalenderDateDayContainerDisable>
                        )
                    }
                </CalenderDateContainer>
            </CalendarContainerBody>
        </CalendarContainer>
    );
}

export default Calendar;
  