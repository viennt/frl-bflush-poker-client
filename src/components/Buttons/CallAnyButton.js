import React from "react";
import {useDispatch, useSelector} from "react-redux";

const CallAnyButton = ({show}) => {
    const playerTurn = useSelector(state => state.playerTurn,[]);

    const dispatch = useDispatch();
    const handleCallAny = () => {
        dispatch({
            type: "stackAction",
            payload: {
                name: "actionCallAny",
                payload: playerTurn ? playerTurn["call_amount"] : 0
            }
        });
    };

    if (!show) return null;
    return <button className="control-button" onClick={handleCallAny}>Call any</button>
};

export default CallAnyButton
