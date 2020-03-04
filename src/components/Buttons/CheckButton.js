import React from "react";
import {sendMsg} from "../../utils/socket-io-lib";
import {useDispatch, useSelector} from "react-redux";

const CheckButton = ({show,curSeatID}) => {
    const playerTurn = useSelector(state => state.playerTurn,[]);
    const playerAction = useSelector(state => state.playerAction,[]);
    const seatPlayer = useSelector(state => state.seatPlayer[curSeatID],[]);
    const currentPlayerTurn = useSelector(state => state.currentPlayerTurn,[]);
    const stackAction = useSelector(state => state.stackAction[curSeatID],[]);

    let isMyTurn = parseFloat(currentPlayerTurn) === parseFloat(curSeatID);

    const dispatch = useDispatch();

    let amount = 0;
    if (seatPlayer && seatPlayer['amount']) {
        amount = seatPlayer['amount']
    }
    const sendMessageToServer = () => {
        if (isMyTurn) {
            sendMsg("actionCheck")
        } else {
            dispatch({
                type: "stackAction",
                payload: {
                    name: "actionCheck"
                }
            })
        }
    };

    let disabled = isMyTurn ?
        (!(playerAction && playerAction['check_available'])) :
        (playerTurn && (parseFloat(playerTurn['call_amount']) > parseFloat(amount)));

    if (!show) return null;
    return <button
        disabled={disabled}
        className={stackAction && stackAction.name === 'actionCheck' ? "control-button selected" : "control-button"}
        onClick={sendMessageToServer}>
        Check
    </button>
};

export default CheckButton;
