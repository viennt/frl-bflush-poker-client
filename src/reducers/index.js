import initialState from "../actions";
import {generatePlayerTurnString, handlePlayerTurn} from "../controller/playerTurnController";
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
    case "SET_CUR_SEAT_ID":
      return {
        ...state,
        curSeatID: action.payload
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
    case "playerTurn":
      let playerTurnAllStatus = state.allStatus;
      if (playerTurnAllStatus.length === 0) {
        playerTurnAllStatus.push(action.payload)
      } else {
        playerTurnAllStatus = [ state.allStatus[state.allStatus.length-1] , generatePlayerTurnString(action.payload) ]
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
