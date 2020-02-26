import React from "react";
import {sendMsg} from "../../utils/socket-io-lib";
import {useDispatch, useSelector} from "react-redux";

const RaiseDetailActions = ({show,curSeatID}) => {
    const playerAction = useSelector(state => state.playerAction,[]);
    const tableDetails = useSelector(state => state.tableDetails,[]);
    const seatPlayer = useSelector(state => state.seatPlayer[curSeatID],[]);
    const setRaiseAmount = useSelector(state => state.setRaiseAmount,[]);

    let minBetAmount = tableDetails ?
        (playerAction && playerAction['check_available'] ?
            parseFloat(playerAction['reraise_amount']) : parseFloat(tableDetails['big_blind'])) : 0;
    let maxBetAmount = playerAction && playerAction['chips'] ? parseFloat(playerAction['chips']) : 100;
    let step = tableDetails && tableDetails['big_blind'] ? parseFloat(tableDetails['big_blind']) : 0.5;

    const dispatch = useDispatch();

    const actionRaise12 = () => {
        if (playerAction) {
            let amount = seatPlayer['total_pot'];
            amount = (parseFloat(amount))/2;

            sendMsg("actionRaise",[amount])
        }
    };

    const actionRaise34 = () => {
        if (playerAction) {
            let amount = seatPlayer['total_pot'];
            amount = (3*parseFloat(amount))/4;

            sendMsg("actionRaise",[amount])
        }
    };

    const actionRaisePot = () => {
        sendMsg("actionRaise",[parseFloat(seatPlayer['total_pot'])])
    };

    const actionAllIn = () => {
        sendMsg("actionAllIn")
    };

    const handlePlusButtonPress = () => {
        let chipsSet = setRaiseAmount;
        if (chipsSet < maxBetAmount) {
            chipsSet += step;

            chipsSet = parseFloat(chipsSet.toFixed(step.toString().length-2));

            if (chipsSet > maxBetAmount) {
                chipsSet = maxBetAmount
            }
            dispatch({
                type: "setRaiseAmount",
                payload: chipsSet
            })
        }
    };

    const handleMinusButtonPress = () => {
        let chipsSet = setRaiseAmount;
        if (chipsSet > 0) {
            chipsSet -= step;
            chipsSet = parseFloat(chipsSet.toFixed(step.toString().length-2));
            if (chipsSet < 0) {
                chipsSet = 0
            }
            dispatch({
                type: "setRaiseAmount",
                payload: chipsSet
            })
        }
    };

    if (!show) return null;

    return <div className='raise-detail d-flex'>
        <button className={'control-button'} onClick={actionRaise12}>1/2</button>
        <button className={'control-button'} onClick={actionRaise34}>3/4</button>
        <button className={'control-button'} onClick={actionRaisePot}>Pot</button>
        <button className={'control-button'} onClick={actionAllIn}>All in</button>
        <div className="d-flex raise-section">
            <button
                onClick={handleMinusButtonPress}
                className="raise-button"
            >
                -
            </button>
            <div className="raise-chips">{setRaiseAmount !== 0 ? setRaiseAmount : minBetAmount}</div>
            <button
                onClick={handlePlusButtonPress}
                className="raise-button"
            >
                +
            </button>
        </div>
    </div>
};

export default RaiseDetailActions;
