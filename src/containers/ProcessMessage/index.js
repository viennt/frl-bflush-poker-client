import React from "react";
import {connect} from 'react-redux'
import { loadMessage , didFinishProcess } from '../../actions'

class ProcessMessage extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.isProcessing === false || nextProps.startProcessing === true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let msg = this.props.receiveMsg[0];
        if (msg){
            this.props.loadMessage(msg)
                .then(() => {
                    // if (msg["message"] === "pause") {
                    //     setTimeout(() => {
                    //         this.props.didFinishProcess();
                    //     }, parseFloat(msg['params'][0]) * 1000 )
                    // } else {
                        this.props.didFinishProcess();
                    // }
                })
        }
    }

    render() {
        return null
    }
}
function mapStateToProps(state) {
    return {
        receiveMsg : state.receiveMsg,
        startProcessing: state.startProcessing,
        isProcessing : state.isProcessing
    }
}
export default connect(mapStateToProps,{ loadMessage , didFinishProcess })(ProcessMessage)
