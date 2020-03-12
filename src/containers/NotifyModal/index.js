import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";

const NotifyModal = (props) => {
    const showNotify = useSelector(state => state.showNotify,[]);
    const notify = useSelector(state => state.notify,[]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (notify.time) {
            setTimeout(() => {
                dispatch({
                    type: "hideNotify",
                    payload: false
                });
            },parseFloat(notify.time) * 1000)
        }
        // eslint-disable-next-line
    },[showNotify]);

    const hideNotify = () => {
        dispatch({
            type: "hideNotify",
            payload: false
        });
        if (notify.customAction && notify.customAction === 'notLogIn') {
            window.close();
        }
    };

    const leaveGame = () => {
        window.close();
    };

    if (showNotify && notify) {
        return (
            <Modal
                {...props}
                show={showNotify}
                onHide={hideNotify}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body style={{height: 'unset', width: 'unset', padding: '15px'}}>
                    <div className="modal-title">{notify.title}</div>
                    <div className="modal-message">{notify.message}</div>
                    {
                        !notify.time &&
                            <div>
                                <button className="control-button-modal" onClick={hideNotify}>
                                    {
                                        notify.customAction && notify.customAction === 'leaveGame' ?
                                            "NO" : "OK"
                                    }
                                </button>
                                {
                                    notify.customAction && notify.customAction === 'leaveGame' &&
                                    <button
                                        className="control-button-modal"
                                        onClick={leaveGame}
                                        style={{marginRight: "30px"}}
                                    >
                                        YES
                                    </button>
                                }
                            </div>
                    }
                </Modal.Body>
            </Modal>
        )
    }
    return null;

};

export default NotifyModal;
