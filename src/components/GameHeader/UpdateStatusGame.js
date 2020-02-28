import React from "react";
import {useSelector} from 'react-redux'
const UpdateStatusGame = (props) => {

    const allStatus = useSelector(state => state.allStatus,[]);

    const renderAllStatus = () => {
        return allStatus.map((item,index) => {
            return <div key={index} className={'item-status'}>{item}</div>
        });
    };
    return (
        <div className={'update-status'}>
            {renderAllStatus()}
        </div>
    )
};

export default UpdateStatusGame
