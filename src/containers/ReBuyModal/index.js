import React, {useState, useEffect} from "react";
import { Modal } from "react-bootstrap";
import { sendMsg } from "../../utils/socket-io-lib";
import "../BuyInModal/buy-in-modal.css";
import {useDispatch, useSelector} from "react-redux";

const ReBuyModal = props => {
    let minChip = 0;
    let maxChip = 0;
    let curChip = 0;
    let step = 0;

    const popupRebuy = useSelector(state => state.popupRebuy,[]);
    const popupRebuyModalShow = useSelector(state => state.popupRebuyModalShow,[]);
    const playerAction = useSelector(state => state.playerAction,[]);
    const tableDetails = useSelector(state => state.tableDetails,[]);

    useEffect(() => {
        if (popupRebuy && playerAction) {
            setBetChip(parseFloat(popupRebuy.min) - parseFloat(playerAction['chips']))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popupRebuy]);

    const dispatch = useDispatch();
    if (popupRebuy && playerAction) {
        minChip = parseFloat(popupRebuy.min) - parseFloat(playerAction['chips']);
        maxChip = parseFloat(popupRebuy.max) - parseFloat(playerAction['chips']);
        curChip = parseFloat(popupRebuy.chips);
    }

    if (tableDetails) {
        step = 10 * parseFloat(tableDetails['big_blind']);
    }

    const [betChip,setBetChip] = useState(minChip);


    const SendMessageToServer = () => {
        sendMsg("buyin", [betChip, 'N']);
    };

    const cancelRebuy = () => {
        sendMsg("sitOut");
        dispatch({
            type: "popupRebuyModalHide",
            payload: false
        })
    };

    const handlePlusButtonPress = () => {
        let chipsSet = parseFloat(betChip);
        if (chipsSet < parseFloat(maxChip)) {
            chipsSet += parseFloat(step);
            chipsSet = parseFloat(chipsSet.toFixed(step.toString().length-2));

            if (chipsSet > maxChip) {
                chipsSet = maxChip
            }
            setBetChip(chipsSet)
        }
    };

    const handleMinusButtonPress = () => {
        let chipsSet = parseFloat(betChip);
        if (chipsSet > 0) {
            chipsSet -= parseFloat(step);
            chipsSet = parseFloat(chipsSet.toFixed(step.toString().length-2));

            if (chipsSet < 0) {
                chipsSet = 0
            }
            setBetChip(chipsSet)
        }
    };

    if (popupRebuyModalShow) {
        return (
            <Modal
                {...props}
                show={popupRebuyModalShow}
                onHide={cancelRebuy}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="modal-title">Lets play more! </div>
                    <div className="modal-question">How many chips would you like?</div>
                    <div className="modal-introduce-table">
                        <div className="modal-introduce-table-row01">
                            <div>Minimum buy in:</div>
                            <div> Maximum buy in:</div>
                            <div className="modal-chips-text">Your total chips: </div>
                        </div>
                        <div className="modal-introduce-table-row02">
                            <div>{minChip}</div>
                            <div>{maxChip}</div>
                            <div className="modal-chips-text">{curChip}</div>
                        </div>
                    </div>
                    <div className="modal-chips-table">
                        <button
                            onClick={handleMinusButtonPress}
                            className="modal-chips-mir"
                        >
                            -
                        </button>
                        <div className="modal-chips-chips">{betChip}</div>
                        <button
                            onClick={handlePlusButtonPress}
                            className="modal-chips-plus"
                        >
                            +
                        </button>
                    </div>
                    <div className="modal-chips-menu-select">
                        <button
                            onClick={cancelRebuy}
                            className="modal-chips-menu-select-btn"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={SendMessageToServer}
                            className="modal-chips-menu-select-btn"
                        >
                            Buy
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    return null
};

export default ReBuyModal;
