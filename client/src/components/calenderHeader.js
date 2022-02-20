import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {
    CalendarContainer,
    CalenderHeaderContainer,
    DropdownContainer
} from '../styledComponent/index';

import { yearOptions, monthOptions } from '../constant/index';


function CalenderHeader( props ) {
    

    const onYearSelect = ( date ) => {
        props.onYearSelect( date )
    }

    const onMonthSelect = ( date ) => {
        props.onMonthSelect( date )
    }

    return (
        <>
        <div>
            <p>성인/유아/반려견</p>
            <p>바 = 바베큐</p>
            <p>침 = 추가침구</p>
        </div>
      <CalenderHeaderContainer>
          <DropdownContainer>
            <Dropdown 
                options={yearOptions} 
                onChange={onYearSelect} 
                value={props.defaultYear} 
            />
            <Dropdown 
                options={monthOptions} 
                onChange={onMonthSelect} 
                value={props.defaultMonth} 
            />
          </DropdownContainer>
      </CalenderHeaderContainer>
            </>
    );
  }
  
  export default CalenderHeader;
  