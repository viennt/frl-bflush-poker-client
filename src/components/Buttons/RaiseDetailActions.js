import React from "react";
import {sendMsg} from "../../utils/socket-io-lib";
import {useSelector} from "react-redux";

const RaiseDetailActions = (props) => {
    const mainPotStatus = useSelector(state => state.mainPotStatus,[]);
    const playerAction = useSelector(state => state.playerAction,[]);

    const actionRaise12 = () => {
        if (playerAction) {
            let amount =playerAction["chips"];
            amount = (parseInt(amount,10))/2;

            sendMsg("actionRaise",[amount])
        }
    };

    const actionRaise34 = () => {
        if (playerAction) {
            let amount =playerAction["chips"];
            amount = (3*parseInt(amount,10))/4;

            sendMsg("actionRaise",[amount])
        }
    };

    const actionRaisePot = () => {
        sendMsg("actionRaise",[parseInt(mainPotStatus,10)])
    };

    const actionAllIn = () => {
        sendMsg("actionAllIn")
    };

    return <div className='raise-detail d-flex justify-content-end'>
        <button className={'control-button'} onClick={actionRaise12}>1/2</button>
        <button className={'control-button'} onClick={actionRaise34}>3/4</button>
        <button className={'control-button'} onClick={actionRaisePot}>Pot</button>
        <button className={'control-button'} onClick={actionAllIn}>All in</button>
    </div>
};

export default RaiseDetailActions;
