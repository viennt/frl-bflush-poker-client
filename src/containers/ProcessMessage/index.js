import React from "react";
import {connect} from 'react-redux'
import { loadMessage , didFinishProcess , resetStartProcessing } from '../../actions'

class ProcessMessage extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.startProcessing === true) {
            this.props.resetStartProcessing();
            return true
        }
        if (nextProps.isProcessing === false) {
            return true
        }
        return false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let msg = this.props.receiveMsg[0];
        if (msg){
            this.props.loadMessage(msg)
                .then(() => {
                    if (msg["message"] === "pause") {
                        setTimeout(() => {
                            this.props.didFinishProcess();
                        }, parseFloat(msg['params'][0]) * 1000 )
                    } else {
                        this.props.didFinishProcess();
                    }
                })
        }
    }

    render() {
        return null
    }
}
function mapStateToProps(state) {
    return {
        startProcessing: state.startProcessing,
        isProcessing : state.isProcessing,
        receiveMsg: state.receiveMsg
    }
}
export default connect(mapStateToProps,{ loadMessage , didFinishProcess , resetStartProcessing })(ProcessMessage)
