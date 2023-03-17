// This script will download a list of daily sayings and randomly pick one to display

//We are randomly generating a number between 0 and 99
//This allows us to select a different random saying from a list of static entries
let record = Math.floor(Math.random() * 100);

// Download list of quotes from URL and store them in the data variable
fetch('https://gist.githubusercontent.com/b1nary/ea8fff806095bcedacce/raw/6e6de20d7514b93dd69b149289264997b49459dd/enterpreneur-quotes.json')
    .then(function(response) {
        return response.json(); // Convert the response to JSON
    })
    .then(function(data) { 
        console.log(data[record]); // Log the data to the console for debugging
        let output = data[record]; // Store the data in a variable
        let article = document.createElement('article'); // Create a new article element

        let selectedSaying = document.createElement('text'); 
        selectedSaying.textContent = output.text; // Set the text content of the element to output.txt object
        console.log(output.text); // Log the saying element to the console
        article.appendChild(selectedSaying); // Append the text element to the article element defined above

        let selectedAuthor = document.createElement('h6'); 
        selectedAuthor.textContent = "- " + output.from; // Set the text content of the text element to output.from object
        console.log(output.from); // Log the author element to the console
        article.appendChild(selectedAuthor); // Append the text element to the article element defined above

        document.querySelector('#sayings').append(article); // Append the article element to the sayings div in html
    });