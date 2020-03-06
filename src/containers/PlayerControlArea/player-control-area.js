import React, {useEffect} from "react";
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
    const stackAction = useSelector(state => state.stackAction[curSeatID], []);
    const playerTurn = useSelector(state => state.playerTurn,[]);
    const myInformation = useSelector(state => state.myInformation,[]);
    const playerAction = useSelector(state => state.playerAction,[]);

    const dispatch = useDispatch();

    let isMyTurn = parseFloat(currentPlayerTurn) === parseFloat(curSeatID) && parseFloat(curSeatID) !== 0;
    let isIphoneX = navigator.userAgent.match(/(iPhone)/);

    let show = undefined;
    if (isMyTurn) {
        if (Object.keys(playerAction).length > 0) {
            show = true;
        }
    } else {
        if (!playerSitout.includes(curSeatID) && playerTurn) {
            show = true;
        }
    }

    if (!tableDetails) {
        show = false;
    }

    if (emptySeat.includes(curSeatID)) {
        show = false;
    }

    if (playerSitout.includes(curSeatID)) {
        show = false;
    }

    if (parseFloat(curSeatID) === 0) {
        show = false;
    }

    useEffect(() => {
        // Auto send stack action
        if (isMyTurn) {
            if (stackAction) {
                let shouldSend = true;
                let payload = [];
                let name = stackAction.name;
                if (stackAction.name.includes("actionCall")) {
                    if (stackAction.name === "actionCallAny") {
                        name = "actionCall";
                        payload = [parseFloat(stackAction.payload).toFixed(2)]
                    } else {
                        shouldSend = parseFloat(stackAction.payload) <= parseFloat(playerTurn["call_amount"]);
                        if (shouldSend) {
                            payload = [parseFloat(stackAction.payload).toFixed(2)];
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isMyTurn, JSON.stringify(playerTurn), JSON.stringify(stackAction)]);

    return (
        <div className={isIphoneX ? "control-area iphoneX" : "control-area"}>
            <div
                className="control-area-container"
            >
                {show && !isMyTurn && <p className={"pre-select-action"}>Choose Next Action</p>}
                <div className={'button-container'}>
                    <FoldButton show={show} curSeatID={curSeatID}/>
                    <CheckButton show={show} curSeatID={curSeatID}/>
                    <CallButton show={show} curSeatID={curSeatID}/>
                    {isMyTurn && <RaiseButton show={show}/>}
                    {isMyTurn && <RaiseDetailActions show={show} curSeatID={curSeatID}/>}
                </div>
                {show &&
                    (!isMyTurn ?
                            <BlindTimer/> :
                            <div className={'remaining-chips'}>
                                Total chips remaining:
                                <div>{parseFloat(myInformation.chips).toFixed(2)}</div>
                            </div>
                    )
                }
            </div>
        </div>
    );
};

export default PlayerControlArea;
