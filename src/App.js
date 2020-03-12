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
import "./responsive_landscape.css";
import "./responsive_portrait.css";

import GameHeader from "./components/GameHeader";
import {assetBaseUrl} from "./const";
import { updateMessage, startProcessMsg , loadMessage } from './actions'
import {isMobile} from 'react-device-detect'
import FullScreen from 'mobile-safari-fullscreen'
import styles from './index.modle.css'
import CountDownBgTask from "./containers/CountDownBgTask";
//leave Table when close window
const closingCode = () => {
    sendMsg("leaveTable");
    return null;
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.receiveMsg = []
    }
    UNSAFE_componentWillMount() {
        sendMsg("setSession", [window.q.gtbl_id_enc]);
        this.listenLogin = setTimeout(() => {
            if (this.receiveMsg.includes("tableDetails")) {
                clearTimeout(this.listenLogin);
            } else {
                this.props.loadMessage({
                    message: "notify",
                    params: ["WARNING", "You are no longer loggedin. Please log back in to continue"],
                    custom: "notLogIn"
                })
            }
        },10000)
    }

    componentDidMount() {
        if (isMobile) {
            setTimeout(() => {
                this.setState({
                    isOpen: true
                });
                window.scrollTo(0,1);
            },1000)
        }
        window.onbeforeunload = closingCode;
        // Read res from service via Socket IO
        // socket.on("message", receiveMsg);
        socket.on("message", text => {
            let params = text.split("|"); //.map(p => Base64.Decode(p)); // we are not using b64 now
            let message = params.shift(); // message, eg. playerSitOut, clearTable

            this.receiveMsg.push(message);
            this.props.updateMessage({ message, params });
        });
    }

    render() {
        return (
            <FullScreen classNames={styles} isOpen={this.state.isOpen}>
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
                    <CountDownBgTask/>
                    {/*<ChatRoom />*/}
                </div>
            </FullScreen>
        );
    }
}
export default connect(null, { updateMessage , startProcessMsg , loadMessage })(App);
