import React, {useState, useEffect} from "react";
import { Modal } from "react-bootstrap";
import { sendMsg } from "../../utils/socket-io-lib";
import "./buy-in-modal.css";
import {useDispatch, useSelector} from "react-redux";

const BuyInModal = props => {
  let minChip = 0;
  let maxChip = 0;
  let curChip = 0;
  let step = 0;

  const popupBuyin = useSelector(state => state.popupBuyin,[]);
  const modalShow = useSelector(state => state.modalShow,[]);
  const tableDetails = useSelector(state => state.tableDetails,[]);

  useEffect(() => {
    if (popupBuyin) {
      setBetChip(popupBuyin.min)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupBuyin]);

  const dispatch = useDispatch();
  if (popupBuyin) {
    minChip = parseFloat(popupBuyin.min);
    maxChip = parseFloat(popupBuyin.max);
    curChip = parseFloat(popupBuyin.chips);
  }
  if (tableDetails) {
    step = 10 * parseFloat(tableDetails['big_blind']);
  }

  const [betChip,setBetChip] = useState(minChip);


  const SendMessageToServer = () => {
    sendMsg("buyin", [betChip, 'N']);
  };

  const cancelReverseSeat = () => {
    sendMsg("cancelSeatReservation");
    dispatch({
      type: "SET_MODAL_SHOW",
      payload: false
    })
  };

  const waitForBigBlind = () => {
    sendMsg("buyin", [betChip,'Y'])
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

  if (popupBuyin) {
    return (
        <Modal
            {...props}
            show={modalShow}
            onHide={cancelReverseSeat}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          <Modal.Body>
            <div className="modal-title">Lets play! </div>
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
                  onClick={waitForBigBlind}
                  className="modal-chips-menu-select-btn"
              >
                Wait for Big Blind
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

export default BuyInModal;
