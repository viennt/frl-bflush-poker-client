export function handleShowCardParam(payload, currentShowCard) {
    let showCard = {...currentShowCard};
    if (parseFloat(payload[0]) === 0) {
        if (showCard.hasOwnProperty(payload[0])) {
            showCard[payload[0]].push(payload[1])
        } else {
            showCard[payload[0]] = [payload[1]]
        }
    } else {
        if (showCard.hasOwnProperty(payload[0])) {
            if (showCard[payload[0]].length === 2) {
                showCard[payload[0]].shift();
                showCard[payload[0]].push(payload[1])
            } else {
                showCard[payload[0]].push(payload[1])
            }
        } else {
            showCard[payload[0]] = [payload[1]]
        }
    }
    console.log('Player id: ' + payload[0] + ' has ' + showCard[payload[0]].length );
    return showCard
}

export function handleHighlightCards(payload, currentShowCard) {
    let updateHighLightCard = {...currentShowCard};
    updateHighLightCard[payload[0]] = payload[1].split("+");
    return updateHighLightCard;
}
