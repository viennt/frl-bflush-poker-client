import React, {useState} from "react";
import {useSelector} from "react-redux";

const RaiseButton = (props) => {
    const playerAction = useSelector(state => state.playerAction,[]);
    const [amount,setAmount] = useState(playerAction["reraise_amount"]);

    const handlePlusButtonPress = () => {
        let chipsSet = amount;
        chipsSet++;
        setAmount(chipsSet)
    };

    const handleMinusButtonPress = () => {
        let chipsSet = amount;
        if (chipsSet > 0) {
            chipsSet--;
            setAmount(chipsSet)
        }
    };

    const sendMessageToServer = () => {
        setAmount("actionRaise",[amount])
    };

    return <div className={'d-flex raise-section'}>
        <button className="control-button" onClick={sendMessageToServer}>Raise</button>
        <div className="d-flex">
            <button
                onClick={handleMinusButtonPress}
                className="raise-button"
            >
                -
            </button>
            <div className="raise-chips">{amount}</div>
            <button
                onClick={handlePlusButtonPress}
                className="raise-button"
            >
                +
            </button>
        </div>
    </div>
};
export default RaiseButton
