export const assetBaseUrl = "https://www.dev-b.bflush.com/engine/0.1";
export const playerTurnMessage = "user_name It is your turn, you have time_remain seconds.";
export const playerActionMessage = "Last move: user_name has just taken action: action_user";
export const actionList = ["","Check","Folded","Call","Raise","All In"];
export const RESERVE = "RESERVE";
export const WINNER = "WINNER";
export const playerSitout = 'PLAYER SITTING OUT';


export const CURRENT_PROCESS = 'CURRENT_PROCESS';
export const DID_FININSH_PROCESSING = 'DID_FININSH_PROCESSING';
export const UPDATE_RECEIVE = 'UPDATE_RECEIVE';
export const START_PROCESSING = 'START_PROCESSING';
export const RESET_START_PROCESSING = 'RESET_START_PROCESSING';

export const seatMap =
    {
        2: { 1:5, 2:10 },
        6: { 1:1, 2:4, 3:5, 4:6, 5:9, 6:10 },
        10: { 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10 }
    };

export const LEAVE = "Leave";
export const LEAVE_LINK = "/members_area/index.html";

export const menuItems = [
    {
        name: 'Account',
        link: "/members_area/home_summary.html"
    },
    {
        name: 'Genealogy',
        link: "/members_area/genealogy.html"
    },
    {
        name: 'Cashier',
        link: "/members_area/cashier_deposit.html"
    },
    {
        name: 'Tokens',
        link: "/members_area/buy_tokens.html"
    },
    {
        name: 'Marketing',
        link: "/members_area/friend.html"
    },
    {
        name: 'Support',
        link: "/members_area/support.html"
    },
];
