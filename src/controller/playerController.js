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
    return user[payload[0]].user_name + ' It is your turn, you have ' + payload[1] + ' seconds.'
}

export function generatePlayerActionStatus(payload,user) {
    let action = ["","Check","Fold","Call","Raise","All In"];
    return "Last move:" + user[payload[0]].user_name + 'has just took action: ' + action[payload[1]];
}

export function handlePlayerSeat(currentState, emptySeat, payload) {
    currentState[payload[0]] = {
        seat_id: payload[0],
        user_name: payload[1],
        chips: payload[2],
        avatar: payload[3]
    };
    emptySeat.forEach((item,index) => {
       if (item == payload[0]) {
           emptySeat.splice(index, 1);
       }
    });

    return {
        seatPlayer: currentState,
        emptySeat: emptySeat
    }
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

// eslint-disable-next-line no-extend-native
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
