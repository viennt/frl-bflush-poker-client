import React from "react";
import "./player-control-area.css";
import {useDispatch, useSelector} from "react-redux";

import FoldButton from "../../components/Buttons/FoldButton";
import CallButton from "../../components/Buttons/CallButton";
import CheckButton from "../../components/Buttons/CheckButton";
import RaiseButton from "../../components/Buttons/RaiseButton";
import RaiseDetailActions from "../../components/Buttons/RaiseDetailActions";
import CallAnyButton from "../../components/Buttons/CallAnyButton";
import BlindTimer from "../../components/PlayArea/BlindTimer";
import {sendMsg} from "../../utils/socket-io-lib";

const PlayerControlArea = (props) => {
    const curSeatID = useSelector(state => state.curSeatID,[]);
    const currentPlayerTurn = useSelector(state => state.currentPlayerTurn,[]);
    const tableDetails = useSelector(state => state.tableDetails,[]);
    const emptySeat = useSelector(state => state.emptySeat,[]);
    const playerSitout = useSelector(state => state.playerSitout,[]);
    const stackAction = useSelector(state => state.stackAction,[]);
    const playerTurn = useSelector(state => state.playerTurn,[]);
    const myInformation = useSelector(state => state.myInformation,[]);
    const playerAction = useSelector(state => state.playerAction,[]);
    const isSittingOut = useSelector(state => state.isSittingOut,[]);

    const dispatch = useDispatch();

    let isMyTurn = parseFloat(currentPlayerTurn) === parseFloat(curSeatID) && parseFloat(curSeatID) !== 0;


    let show = undefined;

    if (!tableDetails) {
        show = false;
    }

    if (emptySeat.includes(curSeatID)) {
        show = false;
    }

    if (playerSitout.includes(curSeatID)) {
        show = false;
    }

    if (isMyTurn) {
        if (Object.keys(playerAction).length > 0) {
            show = true;
        }
    } else {
        if (!isSittingOut && playerTurn) {
            show = true;
        }
    }

    // Auto send stack action
    if (isMyTurn) {
        if (stackAction) {
            let shouldSend = true;
            let payload = [];
            let name = stackAction.name;
            if (stackAction.name.includes("actionCall")) {
                if (stackAction.name === "actionCallAny") {
                    name = "actionCall";
                    payload = stackAction.payload
                } else {
                    shouldSend = parseFloat(stackAction.payload) <= parseFloat(playerTurn["call_amount"]);
                    if (shouldSend) {
                        payload = stackAction.payload;
                    }
                }
            }
            if (shouldSend) {
                sendMsg(name, payload);
                dispatch({
                    type: "stackAction",
                    payload: null
                })
            }
        }
    }

    return (
        <div>
            {isMyTurn && show && <p style={{color: 'white'}}>Pre-select your next action</p>}
            <div className="control-area">
                <FoldButton show={show} curSeatID={curSeatID}/>
                <CheckButton show={show} curSeatID={curSeatID}/>
                <CallButton show={show} curSeatID={curSeatID}/>
                {!isMyTurn ?
                    <CallAnyButton show={show}/> :
                    <RaiseButton show={show}/>
                }
                {isMyTurn && <RaiseDetailActions show={show} curSeatID={curSeatID}/>}
                {show &&
                    (!isMyTurn ?
                            <BlindTimer/> :
                            <div className={'remaining-chips'}>
                                Total chips remaining:
                                <div>{myInformation.chips}</div>
                            </div>
                    )
                }
            </div>
        </div>
    );
};

export default PlayerControlArea;
