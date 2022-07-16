// listen for keypresses and type the correct character
document.body.addEventListener("keydown", (event) => {
    if (![8, 9, 13, 16, 17, 18, 20, 27, 37, 38, 39, 40, 225].includes(event.keyCode)) // ignore special keys (backspace, tab, enter, shift, ctrl, alt, capslock, esc, arrow keys, altgr)
    {
        const inputField = document.querySelector(".txtInput"); // get the input field
        const typedChar = getTypingText()[inputField.value.length]; // get the character that should be typed
        if (typedChar !== undefined) // if the character that should be typed is not undefined
            inputField.value += typedChar; // type the correct character in the input field
        event.preventDefault(); // prevent the character from being typed in the input field
    }
});

// Returns the text that is currently being typed
const getTypingText = () => {
    const allTexts = getAllTexts(); // get all the texts
    if (allTexts.length > 2) // if there are more than 2 texts (the first one is the text that is currently being typed, the second one is the text that is not yet typed)
        return allTexts.slice(allTexts[0].includes(" ") ? 1 : 0, allTexts.length - 1).join("")+allTexts[allTexts.length - 1][0]; // return the text that is currently being typed
    else if (allTexts.length === 2) // if there are exactly 2 texts (the first one is the text that is currently being typed, the second one is the text that is not yet typed)
        return allTexts[0]+allTexts[1][0]; // return the text that is currently being typed
    return ""; // return an empty string if there are no texts or if there is only one text
}

// Returns all the text that is currently being typed and the text that is not yet typed (in an array)
const getAllTexts = () => {
    const textElem = document.querySelectorAll(".gameView table.inputPanel > tbody > tr"); // get the text elements
    if (textElem.length > 1) // if there are more than 1 text elements (the first one is the text that is currently being typed, the second one is the text that is not yet typed)
    {
        const texts = Array.from(textElem[0].querySelectorAll("tbody > tr > td > div > div > span")); // get the text elements that are currently being typed
        if (texts.length > 0) // if there are text elements that are currently being typed
            return texts.map(text => text.innerText); // return the text that is currently being typed and the text that is not yet typed (in an array)
    }
    return []; // return an empty array if there are no text elements or if there are no text elements that are currently being typed
}
