import React from "react";
import {useSelector} from "react-redux";
import "./loading.css";

const Loading = (props) => {
    const startProcessing = useSelector(state => state.startProcessing,[]);

    if (!startProcessing) return null;

    return <div className="loading">Loading&#8230;</div>
};

export default Loading
