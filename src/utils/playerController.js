import {actionList, playerActionMessage, playerTurnMessage, RESERVE, WINNER} from "../const";

export function handlePlayerTurn(payload) {
    return {
        seat: payload[0],
        total_time: payload[1],
        extra_time: payload[2],
        remain_time: payload[3],
        call_amount: payload[4]
    }
}

export function generatePlayerTurnString(payload,user) {
    return playerTurnMessage.replace("user_name",user[payload[0]].user_name).replace('time_remain', payload[1])
}

export function generatePlayerActionStatus(payload,user) {
    return playerActionMessage.replace('user_name',user[payload[0]].user_name).replace('action_user',actionList[payload[1]]);
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

export function handlePlayerSeat(currentState, emptySeat, payload) {
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

    return {
        seatPlayer: currentState,
        emptySeat: emptySeat
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
    if (!currentState.hasOwnProperty(payload[0])) {
        currentState[payload[0]] = {}
    }

    currentState[payload[0]] = {
        ...currentState[payload[0]],
        amount_won: payload[1],
        chips: payload[3] === 'Y' ? WINNER : payload[2]
    };

    return currentState;
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
