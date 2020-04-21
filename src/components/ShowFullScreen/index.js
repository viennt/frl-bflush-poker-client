import React, {useState} from "react";
import screenfull from 'screenfull'
const ShowFullScreen = (props) => {
    const [isFullScreen,setIsFullScreen] = useState(false);
    if (!screenfull.isEnabled) return null;
    return <button
        onClick={() => {
            setIsFullScreen(!isFullScreen);
            screenfull.toggle()
        }}
        style={{
            color: 'white',
            background: 'transparent',
            border: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            outline: 'none'
        }}
    >
        {
            !isFullScreen ?
            <i className="material-icons">
                fullscreen
            </i> :
            <i className="material-icons">
                fullscreen_exit
            </i>
        }
    </button>
};

export default ShowFullScreen
