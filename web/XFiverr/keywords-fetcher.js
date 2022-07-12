const splitedWords = Array.from(document.querySelectorAll("div.gig-card-layout h3 > a")) // get all the gig titles from the page
                    .map(e => e.title.split(" ") // split words in title
                    .slice(2)); // remove "I will" from the title of the gig
const wordCount = {}; // create a dictionary to count the words
splitedWords.forEach(words => {
    words.forEach(word => {
        if (wordCount[word.toLocaleLowerCase()]) {
            wordCount[word.toLocaleLowerCase()]++; // if the word is already in the dictionary, increment the count
        } else {
            wordCount[word.toLocaleLowerCase()] = 1; // if the word is not in the dictionary, add it with a count of 1
        }
    });
});
Object.entries(wordCount) // convert the dictionary to an array of entries
      .sort((a,b) => b[1]-a[1]) // sort the array by the count of the words
      .filter(e => (!["of", "and", "for", "in", "or", "a", "your", "with", "be", "do", "to"].includes(e[0]))) // remove the most common words
      .slice(0, 10) // get the 10 most common words
      .forEach(e => {
        const wordBox = document.createElement('span'); // create a span element to display the word
        const wordCount = document.createElement('i'); // create an italic element to display the count

        //start set some styles to the elements
        wordBox.style.display = "flex";
        wordBox.style.padding = ".25rem";
        wordBox.style.paddingLeft = ".75rem";
        wordBox.style.borderRadius = "5rem";
        wordBox.style.border = "1px solid #DDD";
        wordBox.style.height = "max-content";
        wordBox.style.alignItems = "center";
        wordCount.style.display = "flex";
        wordCount.style.justifyContent = "center";
        wordCount.style.alignItems = "center";
        wordCount.style.fontSize = ".8rem";
        wordCount.style.fontStyle = "normal";
        wordCount.style.marginLeft = ".5rem";
        wordCount.style.padding = ".25rem";
        wordCount.style.minWidth = "1.5rem";
        wordCount.style.height = "1.5rem";
        wordCount.style.borderRadius = "5rem";
        wordCount.style.background = "#DDD";
        //end set some styles to the elements

        wordBox.append(e[0]); // append the word to the span element
        wordCount.append(e[1]); // append the count to the italic element
        wordBox.appendChild(wordCount); // append the count to the word
        document.querySelector(".results-info").appendChild(wordBox); // append the word to the page in the results-info div
      }); // display the words on the page