import React from "react";
import {useSelector} from 'react-redux'
import ReactHtmlParser from 'react-html-parser';
const UpdateStatusGame = (props) => {

    const allStatus = useSelector(state => state.allStatus,[]);

    const renderAllStatus = () => {
        return allStatus.map((item,index) => {
            return <div key={index} className={'item-status'}>{ReactHtmlParser(item)}</div>
        });
    };
    return (
        <div className={'update-status'}>
            {renderAllStatus()}
        </div>
    )
};

export default UpdateStatusGame
