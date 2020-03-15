import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import {
    LEAVE_LINK
} from "../../const";

const GameFinishModal = (props) => {
    const showGameFinished = useSelector(state => state.showGameFinished,[]);
    const gameFinished = useSelector(state => state.gameFinished,[]);
    const dispatch = useDispatch();

    const returnToLobby = () => {
        window.location.href = LEAVE_LINK;
    };

    const hideGameFinish = () => {
        dispatch({
            type: "hideGameFinished",
            payload: false
        });
        returnToLobby();
    };

    if (showGameFinished && gameFinished) {
        return (
            <Modal
                {...props}
                show={showGameFinished}
                onHide={hideGameFinish}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body style={{height: 'unset', width: 'unset', padding: '15px'}}>
                    <div className="modal-title">{gameFinished.title}</div>
                    <div className="modal-message">{gameFinished.message}</div>
                    <button className="control-button-modal" onClick={returnToLobby}>Return to Lobby</button>
                </Modal.Body>
            </Modal>
        )
    }
    return null;
};

export default GameFinishModal;
