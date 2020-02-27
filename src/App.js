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
    componentWillMount() {
        sendMsg("setSession", [window.q.gtbl_id_enc]);
    }

  componentDidMount() {
    // Read res from service via Socket IO
    // socket.on("message", receiveMsg);
    socket.on("message", text => {
      let params = text.split("|"); //.map(p => Base64.Decode(p)); // we are not using b64 now
      let message = params.shift(); // message, eg. playerSitOut, clearTable
      let receiveMsg = [...this.props.receiveMsg, { message, params }];
      console.log({message,params});
      this.props.updateMessage(receiveMsg);
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
function mapStateToProps(state) {
    return {
        receiveMsg: state.receiveMsg
    }
}

export default connect(mapStateToProps, { updateMessage , currentProcessMsg , startProcessMsg , loadMessage })(App);
