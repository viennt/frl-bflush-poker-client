import React, {useEffect, useState} from "react";
import {sendMsg} from "../../utils/socket-io-lib";
import {useSelector} from "react-redux";
import {menuItems} from "../../const";

const Menu = (props) => {
    const [ showMenu , setShowMenu ] = useState(false);
    const isSittingOut = useSelector(state => state.isSittingOut,[]);
    const isTournamentGame = useSelector(state => state.isTournamentGame, []);
    const curSeatID = useSelector(state => state.curSeatID, []);

    useEffect(() => {
        if (isSittingOut && !showMenu) {
            setShowMenu(true);
        }
    },[isSittingOut, showMenu]);

    const renderListMenu = () => {
        let menu = [];
        menuItems.forEach((item,index) => {
            menu.push(
                <div key={index} className={'menu-items'}>
                    <span onClick={() => handleLinkClick(item.link)}>
                        {item.name}
                    </span>
                </div>
            )
        });
        return <div>{menu}</div>
    };

    const handleLinkClick = (link) => {
        sendMsg("leaveTable");
        window.location.assign(link);
    };

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    };

    const handleSitOutAction = () => {
        sendMsg("sitOut");
        setShowMenu(!showMenu)
    };

    const handleBackAction = () => {
        sendMsg("backIn");
        setShowMenu(!showMenu)
    };

    const handleReBuyAction = () => {
        sendMsg("rebuy");
        setShowMenu(!showMenu)
    };

    const renderButton = () => {
        if (parseFloat(curSeatID) !== 0) {
            let extraButton = null;
            if (!isSittingOut) {
                extraButton = <button
                    onClick={handleBackAction}
                    className={'menu-back-button'}
                >
                    I'm Back!
                </button>
            } else {
                extraButton = <button
                    onClick={handleSitOutAction}
                    className={'menu-sitout-button'}
                >
                    Sit out next hand
                </button>
            }
            return (
                <div className='menu__button-container'>
                    {extraButton}
                    <button
                        onClick={handleReBuyAction}
                        className={'menu-back-button'}
                    >
                        Buy Chips
                    </button>
                </div>
            )
        }
        return null
    };

    return (
        <div className={'list-menu'}>
            <span
                className={!showMenu ? 'menu-button' : 'menu-button close-button'}
                onClick={handleShowMenu}
            >
                {!showMenu ? 'Menu' : 'Close'}
            </span>
            {
                showMenu &&
                    <div className={'list-menu-section'}>
                        {!isTournamentGame && renderButton()}
                        <hr/>
                        <p className={'menu-section'}>The below options will fold your hand and cause you to leave the table</p>
                        {renderListMenu()}
                    </div>
            }
        </div>
    )
};

export default Menu;
