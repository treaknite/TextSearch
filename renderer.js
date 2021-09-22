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

async function getData(seachedWord) {
    // AJAX calling

    // Adding word in base URL to make request complete
    const apiURL = apiBaseURL + searchedWord;
    // Variable to store response of API call
    const response = await fetch(apiURL);
    // Extracting and storing JSON data from response
    const jsonData = await response.json();

    console.log(jsonData);
}