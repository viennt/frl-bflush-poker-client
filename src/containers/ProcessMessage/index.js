import React from "react";
import {connect} from 'react-redux'
import { loadMessage , didFinishProcess } from '../../actions'

class ProcessMessage extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.receiveMsg.length !== this.props.receiveMsg.length &&
            nextProps.didFinishProcessing !== this.props.didFinishProcessing) {
            return true
        }
        if (nextProps.didFinishProcessing === nextProps.receiveMsg.length) {
            return false
        }
        if (nextProps.startProcessing === true) {
            return true
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let msg = this.props.receiveMsg[this.props.didFinishProcessing];
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

    render() {
        return null
    }
}
function mapStateToProps(state) {
    return {
        receiveMsg : state.receiveMsg,
        didFinishProcessing: state.didFinishProcessing,
        startProcessing: state.startProcessing
    }
}
export default connect(mapStateToProps,{ loadMessage , didFinishProcess })(ProcessMessage)
