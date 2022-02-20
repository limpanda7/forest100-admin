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
    CalendarContainer, CalenderHeaderContainer,
} from '../styledComponent/index';
import {
    weekArray,
    gridArray
} from '../constant/index'
import axios from "axios";

function Calendar() {
    const [selectedYear, setSelectedYear] = useState(2022);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [info, setInfo] = useState([]);

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
                let infoArr = [];
                for (const element of res.data) {
                    let tempObj = {};
                    tempObj['date'] = moment(element.date).format('YYYYMD');
                    tempObj['name'] = element.name || '사용불가';
                    tempObj['people'] = `${String(element.adult)}/${String(element.baby)}/${String(element.dog)}`;
                    tempObj['barbecue'] = String(element.barbecue);
                    tempObj['bedding'] = String(element.bedding)
                    tempObj['price'] = Number(element.price).toLocaleString();
                    infoArr.push(tempObj);
                }
                setInfo(infoArr);
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
                                        info={ info }
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
  