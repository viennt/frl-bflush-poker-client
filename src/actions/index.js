import {DID_FININSH_PROCESSING, CURRENT_PROCESS, START_PROCESSING, UPDATE_RECEIVE, IS_PROCESSING} from "../const";

export const updateMessage = (message) =>
    async dispatch => {
        dispatch({
            type: UPDATE_RECEIVE,
            payload: message
        })
    };

export const loadMessage = (message) =>
    async dispatch => {
        dispatch({
            type: message.message,
            payload: message.params
        })
    };


export const currentProcessMsg = (msg) =>
    async dispatch => {
        dispatch({
            type: CURRENT_PROCESS,
            payload: msg
        })
    };


export const didFinishProcess = () =>
    async dispatch => {
        dispatch({
            type: DID_FININSH_PROCESSING
        })
    };

export const startProcessMsg = () =>
    async dispatch => {
        dispatch({
            type: START_PROCESSING
        })
    };
