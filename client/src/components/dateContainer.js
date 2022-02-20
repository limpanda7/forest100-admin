import React, {useState, useEffect} from 'react';
import { DateDataContainer, DateContainer, DateContainerInfo } from '../styledComponent/index'

function DateComponent(props) {
    const [dateInfo, setDateInfo] = useState({});
    const propsDate = String(props.year) + String(props.month) + String(props.date);

    useEffect(() => {
        for (const element of props.info) {
            if (element.date === propsDate) {
                setDateInfo(element);
                return;
            }
        }
        setDateInfo({});
    }, [props])

    return (
        <DateDataContainer>
            <DateContainer>
                { props.date }
            </DateContainer>
            {
                Object.keys(dateInfo).length !== 0 &&
                    <>
                        <DateContainerInfo>{dateInfo.name}</DateContainerInfo>
                        {
                            dateInfo.name !== '사용불가' &&
                                <>
                                    <DateContainerInfo>{dateInfo.people}</DateContainerInfo>
                                    <DateContainerInfo>바:{dateInfo.barbecue}</DateContainerInfo>
                                    <DateContainerInfo>침:{dateInfo.bedding}</DateContainerInfo>
                                    <DateContainerInfo>{dateInfo.price}</DateContainerInfo>
                                </>
                        }
                    </>
            }
        </DateDataContainer>

    );
}

export default DateComponent;
  