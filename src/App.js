import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMsg, socket } from "./utils/socket-io-lib";

import { PlayArea } from "./components/PlayArea";

import BuyInModal from "./containers/BuyInModal/buyin-modal";
import PlayerControlArea from "./containers/PlayerControlArea/player-control-area";

import "./App.css";
import GameHeader from "./components/GameHeader";

class App extends Component {
  constructor(props) {
    super(props);
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
      this.receiveMsg = [...this.receiveMsg, { message, params }];
      console.log(message)
      console.log(params)
      this.props.dispatch({
        type: message,
        payload: params
      });
    });
  }

  render() {
    return (
      <div className="game">
        <GameHeader/>
        <PlayArea/>
        <PlayerControlArea />
        <BuyInModal/>
        {/*<ChatRoom />*/}
      </div>
    );
  }
}

export default connect()(App);
