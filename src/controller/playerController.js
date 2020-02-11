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
    return user[payload[0]] + ' It is your turn, you have ' + payload[1] + ' seconds.'
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

export function handlePlayerSitout(currentState,payload) {
    if (!currentState.includes(payload[0])) {
        currentState.push(payload[0])
    }

    return currentState;
}

export function handlePlayerBackin(currentState, payload) {
    if (!currentState.includes(payload[0])) {
        currentState.push(payload[0])
    }

    return currentState;
}
