export function handleShowCardParam(payload, currentShowCard) {
    let showCard = currentShowCard;
    if (showCard.hasOwnProperty(payload[0])) {
        showCard[payload[0]].push(payload[1])
    } else {
        showCard[payload[0]] = [payload[1]]
    }
    return showCard
}
