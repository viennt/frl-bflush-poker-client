import React, {useEffect, useState} from "react";
import {sendMsg} from "../../utils/socket-io-lib";
import {useDispatch, useSelector} from "react-redux";
import {LEAVE, menuItems} from "../../const";

const Menu = (props) => {
    const [ showMenu , setShowMenu ] = useState(false);
    const isTournamentGame = useSelector(state => state.isTournamentGame, []);
    const curSeatID = useSelector(state => state.curSeatID, []);
    const playerTurn = useSelector(state => state.playerTurn, []);
    const tableDetails = useSelector(state => state.tableDetails, []);
    const myInformation = useSelector(state => state.myInformation, []);
    const emptySeat = useSelector(state => state.emptySeat,[]);
    const playerSitout = useSelector(state => state.playerSitout,[]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (playerSitout.includes(curSeatID) && parseFloat(curSeatID) !== 0 && !showMenu) {
            setShowMenu(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerSitout.join("-")]);

    const renderListMenu = () => {
        let menu = [];
        menu.push(
            <div key={'leave-game'} className={'menu-items'}>
                    <span onClick={handleLeaveGame}>
                        {LEAVE}
                    </span>
            </div>
        );
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

    const handleLeaveGame = () => {
        setShowMenu(false)
        dispatch({
            type:  "notify",
            payload: ["WARNING", "Are you sure you wish to leave?"],
            customAction: "leaveGame"
        });
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
        setShowMenu(false)
    };

    const handleBackAction = () => {
        sendMsg("backIn");
        setShowMenu(false)
    };

    const handleReBuyAction = () => {
        sendMsg("rebuy");
        setShowMenu(false)
    };

    const renderButton = () => {
        if (parseFloat(curSeatID) !== 0 && !emptySeat.includes(curSeatID)) {
            let extraButton = null;
            if (playerSitout.includes(curSeatID)) {
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
                    {parseFloat(curSeatID) !== 0 && extraButton}
                    {
                        playerTurn &&
                        !isTournamentGame &&
                        Object.keys(myInformation).length > 0 &&
                        parseFloat(tableDetails['max_buyin']) >= myInformation['chips'] &&
                        <button
                            onClick={handleReBuyAction}
                            className={'menu-back-button'}
                        >
                            Buy Chips
                        </button>}
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
                    {renderButton()}
                    <hr/>
                    <p className={'menu-section'}>The below options will fold your hand and cause you to leave the table</p>
                    {renderListMenu()}
                </div>
            }
        </div>
    )
};

export default Menu;
