import initialState from "../actions";

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
