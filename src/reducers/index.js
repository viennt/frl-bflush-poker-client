import initialState from "../actions";
import {
  generatePlayerActionStatus,
  generatePlayerTurnString,
  handleEmptySeat, handlePlayerBackin,
  handlePlayerSeat, handlePlayerSitout,
  handlePlayerTurn
} from "../controller/playerController";
import {handleShowCardParam} from "../controller/showCardController";

// Create Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MSG":
      return {
        ...state,
        mgs: action.payload
      };
    case "UPDATE_RECEIVE":
      return {
        ...state,
        receiveMsg: action.payload
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
      let playerActionStatus = state.playerActionStatus;
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
        allStatus: playerTurnAllStatus,
      };
    case "showCard":
      let showCard = handleShowCardParam(action.payload,state.showCard);
      return {
        ...state,
        showCard
      };
    case "seatPlayer":
      let seatPlayer = handlePlayerSeat(state.seatPlayer,state.emptySeat,action.payload);
      if (state.modalShow) {
        state.modalShow = false;
      }
      return {
        ...state,
        ...seatPlayer
      };
    case "emptySeat":
      let emptySeat = handleEmptySeat(state.emptySeat,action.payload);
      return {
        ...state,
        emptySeat
      };
    case "playerSitout":
      let playerSitout = handlePlayerSitout(state.playerSitout,action.payload,state.playerBackin);
      return {
        ...state,
        ...playerSitout,
        isSittingOut: action.payload[0] == state.curSeatID
      };
    case "playerBackin":
      let playerBackin = handlePlayerBackin(state.playerBackin,action.payload,state.playerSitout);
      return {
        ...state,
        ...playerBackin,
        isSittingOut: !(action.payload[0] == state.curSeatID)
      };
    case "reEstablishPos":
      return {
        ...state,
        reEstablishPos: action.payload[0]
      };
    case "resetClient":
      return {
        ...state,
        curSeatID: action.payload[0]
      };
    // case "clearTable":
    //   console.log('this')
    //   return {
    //     ...initialState
    //   };
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
      return {
        ...state,
        stackAction: action.payload
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
      //end Quang case

      //Vien Case


      //end Vien case
    default:
      let customData = {};
      customData[action.type] = action.payload;
      return {...state, ...customData};
  }
};

export default reducer;
