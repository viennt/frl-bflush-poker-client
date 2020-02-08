export function handlePlayerTurn(payload) {
    return {
        seat: payload[0],
        total_time: payload[1],
        extra_time: payload[2],
        remain_time: payload[3],
        call_amount: payload[4]
    }
}

export function generatePlayerTurnString(payload,user='me') {
    return user + ' It is your turn, you have ' + payload[1] + ' seconds.'
}
