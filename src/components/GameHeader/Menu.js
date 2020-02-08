import React,{useState} from "react";
import {sendMsg} from "../../utils/socket-io-lib";

const Menu = (props) => {
    const [ showMenu , setShowMenu ] = useState(false);

    const renderListMenu = () => {
        let menuItems = [
            {
                name: 'Tables',
                link: "/members-area/index.html"
            },
            {
                name: 'Account',
                link: "/members-area/index.html"
            },
            {
                name: 'Genealogy',
                link: "/members-area/index.html"
            },
            {
                name: 'Cashier',
                link: "/members-area/index.html"
            },
            {
                name: 'Tokens',
                link: "/members-area/index.html"
            },
            {
                name: 'Marketing',
                link: "/members-area/index.html"
            },
            {
                name: 'Support',
                link: "/members-area/index.html"
            },
        ];
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
                        <hr/>
                        <p className={'menu-section'}>The below options will fold your hand and cause you to leave the table</p>
                        {renderListMenu()}
                    </div>
            }
        </div>
    )
};

export default Menu;
