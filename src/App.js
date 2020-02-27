import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMsg, socket } from "./utils/socket-io-lib";

import { PlayArea } from "./components/PlayArea";

import BuyInModal from "./containers/BuyInModal/buyin-modal";
import ReBuyModal from "./containers/ReBuyModal";
import NotifyModal from "./containers/NotifyModal";
import GameFinishModal from "./containers/GameFinishModal";
import PlayerControlArea from "./containers/PlayerControlArea/player-control-area";
import ProcessMessage from './containers/ProcessMessage';
import Loading from './containers/Loading';

import "./App.css";
import GameHeader from "./components/GameHeader";
import {assetBaseUrl} from "./const";
import { updateMessage, currentProcessMsg, startProcessMsg , loadMessage } from './actions'

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
      console.log({message,params});
      this.props.updateMessage(this.receiveMsg);
      if (message === "startProcessQueue") {
          setTimeout(() => {
              this.props.startProcessMsg()
          },2000)
      }
    });
  }

    render() {
        return (
            <div className="game">
                <GameHeader/>
                <PlayArea/>
                <PlayerControlArea />
                <BuyInModal/>
                <ReBuyModal/>
                <NotifyModal/>
                <GameFinishModal/>
                <audio id="winnerAudio">
                    <source src={assetBaseUrl + "/sounds/winner.ogg"} type="audio/ogg"/>
                </audio>
                <ProcessMessage/>
                <Loading/>
                {/*<ChatRoom />*/}
            </div>
        );
    }
}


export default connect(null, { updateMessage , currentProcessMsg , startProcessMsg , loadMessage })(App);
