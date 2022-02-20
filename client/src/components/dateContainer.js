import React from 'react';
import { DateDataContainer, DateContainer } from '../styledComponent/index'

function DateComponent(props) {

    return (
      <DateDataContainer>
        <DateContainer>
          { props.date }
        </DateContainer>
      </DateDataContainer>
      
    );
  }

export default DateComponent;
  