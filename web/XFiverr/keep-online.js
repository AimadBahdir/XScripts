// Description: This script will keep you online on Fiverr
const onlinePing = () => {
    fetch("https://www.fiverr.com/transmitter/api/v1/online", // This is the URL that will be pinged
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // This is the data that will be sent to the server
        body: JSON.stringify({
            entity_id: document.querySelector("meta[name='user_id']").content,
            platform: window.navigator.userAgentData.mobile ? "mobile" : "web"
        })  
    }).then(e => {
        // This is the sound that will be played when the script is executed
        new Audio("https://assets.mixkit.co/sfx/preview/mixkit-long-pop-2358.mp3").play(), setTimeout(onlinePing, (2 * Math.random() + 3) * 6e4)
    })
};
// This will check if the user is logged in or not and if the user is logged in, the script will be executed
document.querySelector("meta[name='user_id']") && (new Audio("https://assets.mixkit.co/sfx/preview/mixkit-message-pop-alert-2354.mp3").play(), setTimeout(onlinePing, 25e4));