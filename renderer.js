// API's Website URL: https://dictionaryapi.dev/

// Variables for our word and api call
let searchedWord;  // Variable to store searched word
let apiBaseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";    // Variable to store base part of API url for GET request

// Varibles for HTML elements
let inputWord = document.getElementById("word-search");
let wordSearchBtn = document.getElementById("search-button");

// Creating event listner on word search-box
wordSearchBtn.addEventListener("click", function(event) {
    // To prevent refreshing of page
    event.preventDefault();
    // Taking input word
    searchedWord = inputWord.value;

    // Checking for empty string and returning
    // Otherwise calling method to get JSON data
    if (searchedWord === '') {
        alert("Word is required!");
        return;
    }

    // Converting word string to lower case
    searchedWord = searchedWord.toLowerCase();
    // Calling method for getting JSON data
    getData(searchedWord);
})

async function getData(searchedWord) {
    // AJAX calling

    // Adding word in base URL to make request complete
    const apiURL = apiBaseURL + searchedWord;
    // Variable to store response of API call
    const response = await fetch(apiURL);
    // Extracting and storing JSON data from response
    const jsonData = await response.json();

    getMeaning(jsonData);
    getAntonyms(jsonData);
    getSynonyms(jsonData);
    getExamples(jsonData);
    console.log(jsonData[0].meanings[0]);
}


async function getMeaning(jsonData) {
    // Calling method to display meaning,origin and phonetics
    document.getElementById("searched-word").innerHTML = searchedWord;
    document.getElementById("phonetics-text").innerHTML = jsonData[0].phonetics[0].text;
    document.getElementById("origin-of-word").innerHTML = "origin: " + jsonData[0].origin;
    document.getElementById("phonetics-audio").src = 'https:' + jsonData[0].phonetics[0].audio;

    document.getElementById("meaning-subcontainer1").innerHTML = "1. " + jsonData[0].meanings[0].definitions[0].definition;
    document.getElementById("meaning-subcontainer2").innerHTML = "2. " + jsonData[0].meanings[1].definitions[0].definition;

}

async function getSynonyms(jsonData) {
    if (jsonData[0].meanings[0].definitions[0].synonyms.length > 0) {
        document.getElementById("synonyms-parts-of-speech").innerText = "Synonyms";
        var parent = document.getElementById("synonyms-parts-of-speech");
        var child = document.createElement("p");
        child.innerText = jsonData[0].meanings[0].definitions[0].synonyms.slice(0,3).join(", ");
        parent.appendChild(child);
        //document.getElementById("synonyms-parts-of-speech").innerHTML = jsonData[0].meanings[0].definitions[0].synonyms.slice(0,3).join(", ");
    }
    else {
        document.getElementById("synonyms-parts-of-speech").innerHTML = "No synonyms found";
    }
}

async function getAntonyms(jsonData) {
    if (jsonData[0].meanings[0].definitions[0].antonyms.length > 0) {
        document.getElementById("antonyms-parts-of-speech").innerText = "Antonyms";
        var parent = document.getElementById("antonyms-parts-of-speech");
        var child = document.createElement("p");
        child.innerText = jsonData[0].meanings[0].definitions[0].antonyms.slice(0,3).join(", ");
        parent.appendChild(child);
    }
    else{
        document.getElementById("antonyms-parts-of-speech").innerText = "No antonyms found";
    }
}

async function getExamples(jsonData) {
    if (jsonData[0].meanings[0].definitions[0].example || jsonData[0].meanings[0].definitions[1].example !== " ") {
        document.getElementById("example-parts-of-speech").innerText = "Examples";
        var parent = document.getElementById("example-parts-of-speech");
        var child = document.createElement("p");
        child.innerText = jsonData[0].meanings[0].definitions[0].example;
        parent.appendChild(child);
        console.log(jsonData[0].meanings[0].definitions[0].example);
    }
    else {
        document.getElementById("example-parts-of-speech").innerText = "No examples found";
    }
}