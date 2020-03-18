import React from "react";
import {useDispatch, useSelector} from "react-redux";

const RaiseDetailActions = ({show,curSeatID}) => {
    const playerAction = useSelector(state => state.playerAction,[]);
    const tableDetails = useSelector(state => state.tableDetails,[]);
    const seatPlayer = useSelector(state => state.seatPlayer[curSeatID],[]);
    const setRaiseAmount = useSelector(state => state.setRaiseAmount[curSeatID],[]);
    const updateBlinds = useSelector(state => state.updateBlinds,[]);
    const minRaiseAmount = useSelector(state => state.minRaiseAmount[curSeatID],[]);

    let maxBetAmount = 100;
    let step = 0.5;

    const dispatch = useDispatch();
    console.log(setRaiseAmount);
    if (playerAction && tableDetails) {
        maxBetAmount = parseFloat(playerAction['chips']);
        step = parseFloat(tableDetails['big_blind']);
        if (updateBlinds) {
            step = parseFloat(updateBlinds['big_blind_amount']);
        }
    }

    const actionRaise12 = () => {
        if (playerAction) {
            let amount = seatPlayer['total_pot'];
            amount = (parseFloat(amount))/2;
            dispatch({
                type: "setRaiseAmount",
                payload: parseFloat(amount).toFixed(2)
            });
        }
    };

    const actionRaise34 = () => {
        if (playerAction) {
            let amount = seatPlayer['total_pot'];
            amount = (3*parseFloat(amount))/4;
            dispatch({
                type: "setRaiseAmount",
                payload: parseFloat(amount).toFixed(2)
            });
        }
    };

    const actionRaisePot = () => {
        dispatch({
            type: "setRaiseAmount",
            payload: parseFloat(seatPlayer['total_pot']).toFixed(2)
        });
    };

    const actionAllIn = () => {
        dispatch({
            type: "setRaiseAmount",
            payload: parseFloat(setRaiseAmount).toFixed(2)
        });
    };

    const handlePlusButtonPress = () => {
        let chipsSet = parseFloat(setRaiseAmount);
        if (chipsSet < maxBetAmount) {
            chipsSet += step;

            chipsSet = parseFloat(chipsSet).toFixed(2);

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
        let chipsSet = parseFloat(setRaiseAmount);
        if (chipsSet > parseFloat(minRaiseAmount)) {
            chipsSet -= step;
            chipsSet = parseFloat(chipsSet).toFixed(2);
            if (chipsSet < parseFloat(minRaiseAmount)) {
                chipsSet = parseFloat(minRaiseAmount).toFixed(2)
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
            <div
                className="raise-chips">
                {parseFloat(setRaiseAmount).toFixed(2)}
            </div>
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
