import {
    generatePlayerActionStatus,
    generatePlayerTurnString,
    handleEmptySeat,
    handlePlayerBackin,
    handlePlayerBetStatus,
    handlePlayerSeat,
    handlePlayerSitout,
    handlePlayerTurn,
    handlePlayerWinner,
    handleRebuyChips,
    handleReserveSeat,
    handleResetClient,
    updatePlayerInformation
} from "../utils/playerController";
import {handleHighlightCards, handleShowCardParam} from "../utils/showCardController";
import {DID_FININSH_PROCESSING, CURRENT_PROCESS, UPDATE_RECEIVE, START_PROCESSING} from "../const";

const initialState = {
    mgs: [],
    receiveMsg: [],
    curSeatID: 0,
    modalShow: false,
    isSittingOut: false,
    updateChat:[],
    updateStatus:[],
    criticalError:[],
    notify: {},
    showNotify: false,
    popupBuyin: null,
    seatPlayer:{},
    emptySeat:[],
    playerDealer: 0,
    playerAction:{},
    playerTurn: null,
    showCard:{},
    highlightCards: 0,
    playerWinner:[],
    playerActionStatus:[],
    playerBetStatus: {},
    mainPotStatus: null,
    updateBlinds: null,
    buyinSuccessful:[],
    tableDetails: null,
    connectionEstablished:[],
    reserveSeat:[],
    clearTable:[],
    reEstablishPos:[],
    showActions:false,
    resetClient:[],
    playerSitout:[],
    playerBackin:[],
    pause:[],
    updateStream:[],
    rebuyChips:[],
    gameFinished: null,
    showGameFinished: false,
    redrawTable:[],
    mySeat:[],
    sitOutPlayer:[],
    disconnectionTimer:[],
    cancelBuyin:[],
    popupRebuy:[],
    allStatus: [],
    isTournamentGame: false,
    stackAction: {},
    popupRebuyModalShow: false,
    currentPlayerTurn: 0,
    setRaiseAmount: 0,
    myInformation: {},
    currentProcess: null,
    startProcessing: false,
    isProcessing: false,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case DID_FININSH_PROCESSING:
            let didFinishProcessing = [...state.receiveMsg];
            didFinishProcessing.shift();
            return {
                ...state,
                receiveMsg: didFinishProcessing,
                isProcessing: false
            };
        case CURRENT_PROCESS:
            return {
                ...state,
                currentProcess: action.payload
            };
        case START_PROCESSING:
            return {
                ...state,
                startProcessing: true
            };
        case UPDATE_RECEIVE:
            let receive = [...state.receiveMsg];
            receive.push(action.payload);
            return {
                ...state,
                receiveMsg: receive
            };
        case "SET_MODAL_SHOW":
            return {
                ...state,
                modalShow: action.payload
            };

        //Quang case
        case "updateChat":
            let update = state.updateChat;
            update.push({
                username: action.payload[0],
                content: action.payload[1]
            });

            return {
                ...state,
                updateChat: update
            };
        case "updateStatus":
            let updateStatusAllStatus = state.allStatus;
            if (updateStatusAllStatus.length === 0) {
                updateStatusAllStatus.push(action.payload)
            } else {
                updateStatusAllStatus = [ state.allStatus[state.allStatus.length-1] , action.payload ]
            }

            return {
                ...state,
                updateStatus: action.payload,
                allStatus: updateStatusAllStatus,
            };
        case "updateStatusQueued":
            let updateStatusQueuedAllStatus = state.allStatus;
            if (updateStatusQueuedAllStatus.length === 0) {
                updateStatusQueuedAllStatus.push(action.payload)
            } else {
                updateStatusQueuedAllStatus = [ state.allStatus[state.allStatus.length-1] , action.payload ]
            }

            return {
                ...state,
                updateStatusQueued: action.payload,
                allStatus: updateStatusQueuedAllStatus,
            };
        case "criticalError" :
            let criticalErrorAllStatus = state.allStatus;
            if (criticalErrorAllStatus.length === 0) {
                criticalErrorAllStatus.push(action.payload)
            } else {
                criticalErrorAllStatus = [ state.allStatus[state.allStatus.length-1] , action.payload ]
            }

            return {
                ...state,
                criticalError: action.payload,
                allStatus: criticalErrorAllStatus,
            };
        case "playerActionStatus":
            let playerActionStatus = state.allStatus;
            if (playerActionStatus.length === 0) {
                playerActionStatus.push(action.payload)
            } else {
                playerActionStatus = [ state.allStatus[state.allStatus.length-1] , generatePlayerActionStatus(action.payload,state.seatPlayer)]
            }

            return {
                ...state,
                playerActionStatus: action.payload,
                allStatus: playerActionStatus
            };
        case "playerTurn":
            let playerTurnAllStatus = state.allStatus;
            if (playerTurnAllStatus.length === 0) {
                playerTurnAllStatus.push(action.payload)
            } else {
                playerTurnAllStatus = [ state.allStatus[state.allStatus.length-1] , generatePlayerTurnString(action.payload,state.seatPlayer) ]
            }
            return {
                ...state,
                playerTurn: handlePlayerTurn(action.payload),
                currentPlayerTurn: action.payload[0],
                allStatus: playerTurnAllStatus,
            };
        case "showCard":
            let showCard = handleShowCardParam(action.payload,state.showCard);
            return {
                ...state,
                showCard: showCard,
                stackAction: {}
            };
        case "seatPlayer":
            let seatPlayer = handlePlayerSeat(state.seatPlayer,state.emptySeat,action.payload);
            let modalShow = state.modalShow;
            if (state.modalShow) {
                modalShow = false;
            }
            let playerInfor = updatePlayerInformation(
                state,
                action.payload[0],
                {
                    user_name: action.payload[1],
                    chips: action.payload[2],
                    avatar: action.payload[3]
                });
            return {
                ...state,
                ...seatPlayer,
                modalShow: modalShow,
                myInformation: playerInfor
            };
        case "emptySeat":
            let emptySeat = handleEmptySeat(state.emptySeat,action.payload);
            let stackActionUpdate = {...state.stackAction};
            if (parseFloat(action.payload) === parseFloat(state.curSeatID)) {
                stackActionUpdate[state.curSeatID] = null
            }
            return {
                ...state,
                emptySeat : emptySeat,
                stackActionUpdate : stackActionUpdate,
            };
        case "playerSitout":
            let playerSitout = handlePlayerSitout(state.playerSitout,action.payload,state.playerBackin);
            return {
                ...state,
                ...playerSitout,
                isSittingOut: parseFloat(action.payload[0]) === parseFloat(state.curSeatID)
            };
        case "playerBackin":
            let playerBackin = handlePlayerBackin(state.playerBackin,action.payload,state.playerSitout);
            return {
                ...state,
                ...playerBackin,
                isSittingOut: !(parseFloat(action.payload[0]) === parseFloat(state.curSeatID))
            };
        case "reEstablishPos":
            return {
                ...state,
                reEstablishPos: action.payload[0]
            };
        case "clearTable":
            return {
                ...state,
                showCard: {},
                playerDealer: 0,
                playerTurn: null,
                playerAction:{},
                highlightCards: 0,
                playerWinner:[],
                playerActionStatus:[],
                playerBetStatus: {},
                mainPotStatus: null,
                stackAction: {}
            };
        case "mainPotStatus":
            return {
                ...state,
                mainPotStatus: action.payload[0]
            };
        case "popupBuyin":
            return {
                ...state,
                popupBuyin: {
                    min: action.payload[0],
                    max: action.payload[1],
                    chips: action.payload[2]
                }
            };
        case "popupRebuy":
            return {
                ...state,
                popupRebuyModalShow: true,
                popupRebuy: {
                    min: action.payload[0],
                    max: action.payload[1],
                    chips: action.payload[2]
                }
            };
        case "buyinSuccessful":
            return {
                ...state,
                curSeatID: action.payload[0]
            };
        case "showActions":
            let showActions = false;
            if (action.payload[0] === "Y") {
                showActions = true;
            }
            return {
                ...state,
                showActions
            };
        case "tableDetails":
            return {
                ...state,
                tableDetails: {
                    name: action.payload[0],
                    small_blind: action.payload[1],
                    big_blind: action.payload[2],
                    max_buyin: action.payload[3],
                    real_money: action.payload[4],
                    tournament_id: action.payload[5],
                    live_video: action.payload[6],
                    max_players: action.payload[7],
                    blinds_timer: action.payload[8],
                    in_progress: action.payload[9]
                },
                isTournamentGame: action.payload[5] !== "N" && action.payload[5] !== "" && action.payload[5] !== null
            };
        case "playerAction":
            return {
                ...state,
                playerAction:{
                    check_available: action.payload[0] === "Y",
                    call_amount: action.payload[1],
                    chips: action.payload[2],
                    reraise_amount: action.payload[3]
                }
            };
        case "stackAction":
            let stackAction = {...state.stackAction};
            stackAction[state.curSeatID] = action.payload;
            return {
                ...state,
                stackAction: stackAction
            };
        case "playerDealer":
            return {
                ...state,
                playerDealer: action.payload[0]
            };
        case "cancelBuyin":
            window.close();
            return {
                ...initialState
            };
        case "popupRebuyModalHide":
            return {
                ...state,
                popupRebuyModalShow: false
            };
        case "notify":
            return {
                ...state,
                showNotify: true,
                notify: {
                    title: action.payload[0],
                    message: action.payload[1]
                }
            };
        case "hideNotify":
            return {
                ...state,
                showNotify: false
            };
        case "gameFinished":
            return {
                ...state,
                showGameFinished: true,
                gameFinished: {
                    title: action.payload[0],
                    message: action.payload[1]
                }
            };
        case "hideGameFinished":
            return {
                ...state,
                showGameFinished: false
            };
        case "playerBetStatus":
            let playerBetStatus = handlePlayerBetStatus(action.payload, state.seatPlayer);
            let mainPotStatus = parseFloat(state.mainPotStatus);
            if (parseFloat(action.payload[3]) > 0) {
                mainPotStatus += parseFloat(action.payload[3]);
            }
            let playerInformationUpdated = updatePlayerInformation(
                state,
                action.payload[0],
                {
                    chips: action.payload[2],
                });
            return {
                ...state,
                seatPlayer: playerBetStatus,
                mainPotStatus: mainPotStatus,
                myInformation: playerInformationUpdated
            };
        case "resetClient":
            let resetClient = handleResetClient(action.payload, state.seatPlayer);
            return {
                ...state,
                curSeatID: action.payload[0],
                seatPlayer: resetClient,
                myInformation: {
                    ...state.myInformation,
                    seat: action.payload[0],
                    chips: action.payload[1],
                    bet: action.payload[2]
                }
            };
        case "reserveSeat":
            let reserveSeat = handleReserveSeat(action.payload, state.seatPlayer);
            return {
                ...state,
                seatPlayer: reserveSeat
            };
        case "rebuyChips":
            let rebuyChips = handleRebuyChips(action.payload, state.seatPlayer);
            let insertInformation = updatePlayerInformation(state, action.payload[0], { chips: action.payload[1]})
            return {
                ...state,
                seatPlayer: rebuyChips,
                myInformation: insertInformation
            };
        case "highlightCards":
            let highlightCardsInShowCards = handleHighlightCards(action.payload, state.showCard);
            return {
                ...state,
                showCard: highlightCardsInShowCards,
                highlightCards: action.payload[0]
            };
        case "removeHightlightCard":
            return {
                ...state,
                highlightCards: 0
            };

        case "playerWinner":
            let playerWinner = handlePlayerWinner(action.payload, state.seatPlayer);

            if (action.payload[3] === "Y") {
                let x = document.getElementById("winnerAudio");
                x.play();
            }

            return {
                ...state,
                seatPlayer: playerWinner,
                stackAction: {}
            };
        case "setRaiseAmount":
            return {
                ...state,
                setRaiseAmount: action.payload
            };
        case "updateBlinds":
            return {
                ...state,
                updateBlinds: {
                    small_blind_amount: action.payload[0],
                    big_blind_amount: action.payload[1],
                    time_remaining: action.payload[2]
                }
            };
        default:
            let customData = {};
            customData[action.type] = action.payload;
            return {...state, ...customData};
    }
}

export default rootReducer;
