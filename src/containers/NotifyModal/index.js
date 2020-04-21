import React, {useEffect, useRef} from "react";
import "./notify-modal.css";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import {
    LEAVE_LINK
} from "../../const";

const NotifyModal = (props) => {
    const showNotify = useSelector(state => state.showNotify,[]);
    const notify = useSelector(state => state.notify,[]);
    const dispatch = useDispatch();

    const notifyRef = useRef(false);

    useEffect(() => {
        if (notify.time) {
            notifyRef.current = setTimeout(() => {
                dispatch({
                    type: "hideNotify",
                    payload: false
                });
            },parseFloat(notify.time) * 1000)
        }
        return () => {
            if (notifyRef.current) {
                clearTimeout(notifyRef.current)
            }
        }
        // eslint-disable-next-line
    },[showNotify]);

    const hideNotify = () => {
        dispatch({
            type: "hideNotify",
            payload: false
        });
        if (notify.customAction && notify.customAction === 'notLogIn') {
            window.location.href = LEAVE_LINK;
        }
    };

    const leaveGame = () => {
        window.location.href = LEAVE_LINK;
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
		className={notify.customAction}
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
