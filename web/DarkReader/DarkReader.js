let switchButton = document.createElement('button');
let darkTheme = false;
const moonIcon = `
<svg width="800px" height="800px" enable-background="new 0 0 512 512" fill="#000000" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<path d="m275.4 500.7c-135 0-244.7-109.8-244.7-244.7 1.0658e-14 -134.9 109.8-244.7 244.7-244.7 8.2 0 16.4 0.4 24.6 1.2 7.2 0.7 13.5 5.2 16.5 11.7s2.4 14.2-1.6 20.2c-23 33.8-35.2 73.3-35.2 114.2 0 105 78.7 192.2 183.2 202.6 7.2 0.7 13.5 5.2 16.5 11.7 3.1 6.5 2.4 14.2-1.6 20.2-45.8 67.4-121.4 107.6-202.4 107.6zm-12.5-448c-106.5 6.5-191.2 95.2-191.2 203.3 1.4211e-14 112.3 91.4 203.7 203.7 203.7 56.4 0 109.6-23.4 147.8-63.7-46.2-11.7-88.1-36.8-120.8-72.6-41.1-45.2-63.8-103.6-63.8-164.6 0.1-37.1 8.4-73.2 24.3-106.1z"/>
</svg>
`;
const refreshIcon = `
<svg width="800px" height="800px" enable-background="new 0 0 512 512" fill="#000000" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<path d="m404.5 62.6 24.8-3.1c11.1-1.4 19-11.5 17.7-22.7-1.3-10.3-9.7-18.7-22.7-17.7l-74.6 9.3c-11.1 1.4-19 11.5-17.7 22.6l9.2 75.6c1.4 11.1 11.5 19.1 22.6 17.7s19.1-11.5 17.7-22.7l-3.4-28.1c70.1 52 99.2 142.2 72.3 225.7s-105.9 140.8-193.2 141c-12.9 0-21.1 8.6-21.4 19.8-0.2 11.2 7.8 20.8 21.4 20.8 104.8 0 199.7-68.9 231.9-169.2 32-99.1-2-206.4-84.6-269v-2.1316e-14z"/>
<path d="m170.7 385.3c-1.4-11.1-11.5-19.1-22.6-17.7s-19.1 11.5-17.7 22.7l3.4 28.1c-70.1-52-99.2-142.2-72.3-225.7s105.9-140.8 193.2-141c12.9 0 21.1-8.6 21.4-19.8 0.2-11.2-7.8-20.8-21.4-20.8-104.7-0.1-199.6 68.8-231.8 169.1-32 99.3 2 206.6 84.6 269.2l-24.8 3.1c-11.1 1.4-19 11.5-17.7 22.7 1.3 10.3 9.7 18.7 22.7 17.7l74.6-9.3c11.1-1.4 19-11.5 17.7-22.6l-9.3-75.7z"/>
</svg>
`;
const style = document.createElement("style");
switchButton.id = 'darkReaderSwitch';
switchButton.innerHTML = moonIcon;
style.innerHTML = `
    html body button#darkReaderSwitch {
        display: flex;
        align-items: center;
        justify-content: start;
        position: fixed;
        bottom: 20%;
        right: -45px;
        width: 10ch!important;
        height: 5ch!important;
        border-radius: 20px 0 0 20px!important;
        background: #FFF!important;
        z-index: 99999999!important;
        border: none!important;
        outline: none!important;
        cursor: pointer!important;
        transition: right 0.5s ease-in-out!important;
        padding-left: .5ch!important;
    }
    html body button#darkReaderSwitch:hover {
        right: -35px!important;
    }
    html body button#darkReaderSwitch svg {
        width: 4ch!important;
        height: 4ch!important;
        fill: #111!important;
    }
`;
switchButton.addEventListener('click', (e) => {
    if (darkTheme) {
        window.location.reload();
    } else {
        darkTheme = true;
        switchButton.innerHTML = refreshIcon;
        Array.from(document.querySelectorAll('*')).forEach((e) => {
            if (e === switchButton) return;
            if (e.tagName === 'IMG') {
                e.style.setProperty("background-color", '#111', "important");
                e.style.setProperty('border-color', '#222', 'important');
            }
            else if (e.tagName === "svg") {
                e.style.setProperty("fill", '#111', "important");
            }
            else {
                e.style.setProperty("color", e.tagName === 'A' ? '#AAA' : '#FFF', "important");
                e.style.setProperty('background', '#111', 'important');
                e.style.setProperty('border-color', '#222', 'important');
            }
        });
    }
});

document.head.appendChild(style);
document.body.appendChild(switchButton);