import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMsg, socket } from "./utils/socket-io-lib";

import { Seat } from "./components/Seat";
import { PlayArea, PlayAreaBackground } from "./components/PlayArea";

import CardArea from "./containers/CardArea";
import BuyInModal from "./containers/BuyInModal/buyin-modal";
import PlayerControlArea from "./containers/PlayerControlArea/player-control-area";

import "./App.css";
import ChatRoom from "./components/ChatRoom";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      mgs: window.q.gtbl_id_enc, // Get the gtbl_id_enc from window output
      msgInput: [], // Send message
      paraInput: []
    };
    this.receiveMsg = []; // This varibale to store received messages from Socket IO response.
  }

  componentWillMount() {
    sendMsg("setSession", [window.q.gtbl_id_enc]);
  }

  componentDidMount() {
    // Read res from service via Socket IO
    // socket.on("message", receiveMsg);
    socket.on("message", text => {
      var params = text.split("|"); //.map(p => Base64.Decode(p)); // we are not using b64 now
      var message = params.shift(); // message, eg. playerSitOut, clearTable
      //console.log("Recevied " + message + ", with params " + params.join("; "));
      this.receiveMsg = [...this.receiveMsg, { message, params }];

      this.props.dispatch({
        type: message,
        payload: params
      });

      this.props.dispatch({
        type: "UPDATE_RECEIVE",
        payload: this.receiveMsg
      });
    });
  }

  render() {
    const { receiveMsg, modalShow, curSeatID } = this.props;
    const popupBuyin_mes = receiveMsg.filter(receive => {
      return receive.message === "popupBuyin";
    });

    return (
      <div className="game">
        <div className="game__header"/>
        <PlayArea>
          <Seat seatid="1" />
          <Seat seatid="2" />
          <Seat seatid="3" />
          <Seat seatid="4" />
          <Seat seatid="5" />
          <Seat seatid="6" />
          <Seat seatid="7" />
          <Seat seatid="8" />
          <Seat seatid="9" />
          <Seat seatid="10" />
          <PlayAreaBackground />
          <CardArea />
        </PlayArea>
        <PlayerControlArea />
        <BuyInModal
          buyin={popupBuyin_mes}
          show={modalShow}
          onHide={() =>
            this.props.dispatch({
              type: "SET_MODAL_SHOW",
              payload: false
            })
          }
        />
        <ChatRoom />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    receiveMsg: state.receiveMsg,
    modalShow: state.modalShow,
    curSeatID: state.curSeatID
  };
}

export default connect(mapStateToProps)(App);
