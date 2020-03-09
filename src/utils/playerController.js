import {actionList, playerActionMessage, playerTurnMessage, RESERVE} from "../const";

export function handlePlayerTurn(payload) {
    let dataLayer = {
        seat: payload[0],
        total_time: payload[1],
    };
    dataLayer["call_amount"] = payload[payload.length-1];
    if (payload.length > 4) {
        dataLayer["extra_time"] = payload[2];
        dataLayer["remain_time"] = payload[3];
    } else {
        dataLayer["remain_time"] = payload[2];
    }
    return dataLayer;
}

export function generatePlayerTurnString(payload,user) {
    if (user[payload[0]] && user[payload[0]].hasOwnProperty('user_name')) {
        return playerTurnMessage.replace("user_name",user[payload[0]].user_name).replace('time_remain', payload[1])
    } else return null
}

export function generatePlayerActionStatus(payload,user) {
    if (user[payload[0]] && user[payload[0]].hasOwnProperty('user_name')) {
        return playerActionMessage.replace('user_name', user[payload[0]].user_name).replace('action_user', actionList[payload[1]]);
    } else return null;
}

export function handleEmptySeat(currentState, payload) {
    if (!currentState.includes(payload[0])) {
        currentState.push(payload[0])
    }
    return currentState
}

export function handlePlayerSitout(currentState,payload,playerBackin) {
    if (!currentState.includes(payload[0])) {
        currentState.push(payload[0])
    }
    playerBackin.remove(payload[0]);

    return {
        playerSitout: currentState,
        playerBackin: playerBackin
    };
}

export function handlePlayerBackin(currentState, payload, playerSitout) {
    if (!currentState.includes(payload[0])) {
        currentState.push(payload[0])
    }

    playerSitout.remove(payload[0]);

    return {
        playerBackin: currentState,
        playerSitout: playerSitout
    };
}

export function handlePlayerSeat(currentState, emptySeat, payload, curSeatID) {
    let curSeatIDUpdate = curSeatID;
    currentState[payload[0]] = {
        seat_id: payload[0],
        user_name: payload[1],
        chips: payload[2],
        avatar: payload[3]
    };
    emptySeat.forEach((item,index) => {
        if (parseFloat(item) === parseFloat(payload[0])) {
            emptySeat.splice(index, 1);
        }
    });

    if (payload[4]) {
        curSeatIDUpdate = payload[4]
    }

    return {
        seatPlayer: currentState,
        emptySeat: emptySeat,
        curSeatID: curSeatIDUpdate
    }
}

export function handlePlayerBetStatus (payload, currentState) {
    if (!currentState.hasOwnProperty(payload[0])) {
        currentState[payload[0]] = {}
    }
    currentState[payload[0]] = {
        ...currentState[payload[0]],
        amount: payload[1],
        chips: payload[2],
        total_pot: payload[3]
    };
    return currentState
}

export function handleResetClient (payload, currentState) {
    if (!currentState.hasOwnProperty(payload[0])) {
        currentState[payload[0]] = {}
    }
    currentState[payload[0]] = {
        ...currentState[payload[0]],
        chips: payload[1],
        amount: payload[2]
    };

    return currentState;
}

export function handleReserveSeat (payload, currentState) {
    if (!currentState.hasOwnProperty(payload[0])) {
        currentState[payload[0]] = {}
    }
    currentState[payload[0]] = {
        ...currentState[payload[0]],
        chips: RESERVE
    };

    return currentState;
}

export function handleRebuyChips (payload, currentState) {
    if (!currentState.hasOwnProperty(payload[0])) {
        currentState[payload[0]] = {}
    }
    currentState[payload[0]] = {
        ...currentState[payload[0]],
        chips: payload[1]
    };
    return currentState;
}

export function handlePlayerWinner (payload, currentState) {
    let updateWinner = {...currentState};
    if (!updateWinner.hasOwnProperty(payload[0])) {
        updateWinner[payload[0]] = {}
    }

    updateWinner[payload[0]] = {
        ...updateWinner[payload[0]],
        amount_won: payload[1],
        chips: payload[2]
    };

    Object.keys(updateWinner).forEach(key => {
        updateWinner[key]['amount'] = null;
    });

    return updateWinner;
}

export function updatePlayerInformation (state, updateId, updateInformation) {
    if (parseFloat(state.curSeatID) !== 0 && parseFloat(state.curSeatID) === parseFloat(updateId)) {
        return {
            ...state.myInformation,
            ...updateInformation
        }
    }
    return state.myInformation;
}


export function positioningPlayer (numberPlayer,curSeatID,seats) {
    let backupArray = [...seats];
    let moveArray = [];
    let leftArray = [];

    switch (numberPlayer) {
        case "2":
            if (parseFloat(curSeatID) === 1) {
                for (let i = 6; i <= 9; i++) {
                    moveArray.push(backupArray[i])
                }
                for (let j = 0; j <= 5; j++) {
                    leftArray.push(backupArray[j])
                }
                seats = [...moveArray,...leftArray];
            } else {
                for (let k = 0; k <= 4; k++) {
                    moveArray.push(backupArray[k])
                }
                for (let l = 5; l <= 9; l++) {
                    leftArray.push(backupArray[l])
                }
                seats = [...leftArray,...moveArray];
            }
            return seats;
        case "6":
            if (parseFloat(curSeatID) < 3) {
                let startMoveIndex = parseFloat(curSeatID) === 1 ? parseFloat(curSeatID) + 5 : parseFloat(curSeatID) + 7;
                let numberMoveItems = 9;
                for (let m = startMoveIndex; m <= numberMoveItems; m++) {
                    moveArray.push(backupArray[m])
                }
                let moveIndex = parseFloat(curSeatID) === 1 ? parseFloat(curSeatID) + 4 : parseFloat(curSeatID) + 6;
                for (let j = 0; j <= moveIndex; j++ ) {
                    leftArray.push(backupArray[j])
                }
                seats = [...moveArray,...leftArray];
            } else if (parseFloat(curSeatID) ===  3) {
                return seats
            }else {
                let startMoveIndex = 0;
                let numberMoveItems = 0;
                if (parseFloat(curSeatID) === 4) numberMoveItems = 1;
                if (parseFloat(curSeatID) === 5) numberMoveItems = 4;
                if (parseFloat(curSeatID) === 6) numberMoveItems = 5;

                for (let m = startMoveIndex; m < numberMoveItems; m++) {
                    moveArray.push(backupArray[m])
                }
                for (let j = numberMoveItems; j <= 9; j++ ) {
                    leftArray.push(backupArray[j])
                }
                seats = [...leftArray,...moveArray];
            }
            return seats;
        case "10":
            if (parseFloat(curSeatID) <= 5) {
                let startMoveIndex = parseFloat(curSeatID) + 5;
                let numberMoveItems = 9;
                for (let m = startMoveIndex; m <= numberMoveItems; m++) {
                    moveArray.push(backupArray[m])
                }
                for (let j = 0; j <= parseFloat(curSeatID) + 4; j++ ) {
                    leftArray.push(backupArray[j])
                }
                seats = [...moveArray,...leftArray];
            } else {
                let startMoveIndex = 0;
                let numberMoveItems = parseFloat(curSeatID) - 5;
                for (let m = startMoveIndex; m < numberMoveItems; m++) {
                    moveArray.push(backupArray[m])
                }
                for (let j = numberMoveItems; j <= 9; j++ ) {
                    leftArray.push(backupArray[j])
                }
                seats = [...leftArray,...moveArray];
            }
            return seats;
        default:
            return seats;
    }
}


export function handlePlayerActionStatusData (payload, currentState) {
    let modifyPlayerAction = {...currentState};
    modifyPlayerAction[payload[0]] = actionList[payload[1]].toUpperCase();

    return  modifyPlayerAction
}
export function handleClearPlayerActionStatus (seatPlayer) {
    let modify = {...seatPlayer};
    Object.keys(modify).forEach(key => {
        modify[key]['extra_chips'] = null
    });

    return modify;
}
//remove item from array
// eslint-disable-next-line no-extend-native
Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
