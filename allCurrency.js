// The API I selected https://www.exchangerate-api.com/ supports many other currencies,
// I simply picked the currencies I was most interested in for now but they are very easy to add.
// The other currencies supported can be found at https://www.exchangerate-api.com/docs/supported-currencies 

var button2 = document.getElementById("convertAll"); // Get the button element from the HTML page
var result = document.getElementById("result"); // Get the result element from the HTML page
var allResults = []; // Create an array to store all the results when the user clicks the ShowAll button

// This function is called when the ShowAll button is clicked
button2.addEventListener("click", function(event) { // Add an event listener to the button
  let fromCurrency = document.getElementById("startingCurrency").value; // Get the value of the starting currency

  // Create an array of currencies to convert to
  // If you want to add more currencies, simply add them to the array, they can be found at https://www.exchangerate-api.com/docs/supported-currencies
  let toCurrencies = ["EUR", "USD", "GBP", "CHF", "PLN", "CAD"]; 

  let amt = document.getElementById("startingAmount").value; // Get the value of the starting amount
  
  // Log the values of fromCurrency, toCurrency, and amt to the console for debugging
  console.log(`fromCurrency: ${fromCurrency}, toCurrencies: ${toCurrencies}, amt: ${amt}`);
  
  // Check if amt is an empty string
  if (amt.trim() === "") {
    result.innerHTML = "Please enter a valid starting amount"; // Display error message
    return; // Exit from the function
  } else {

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`) // Fetch (download) the exchange rates
    .then(function(response) { // Wait for the response
      return response.json();
    }) // Convert the response to JSON
    .then(function(data) { 
      let conversionList = []; // Create an array to store the conversions
      for (let i = 0; i < toCurrencies.length; i++) { // Loop through the toCurrencies array to get the exchange rates for each currency in the array
        let toCurrency = toCurrencies[i]; // Get the currency code from the array
        let rate = data.rates[toCurrency]; // Get the exchange rate for the toCurrency from the data object
        let total = (rate * amt).toFixed(2); // Calculate the total amount in the toCurrency using the exchange rate
        let conversion = `${amt} ${fromCurrency} = ${total} ${toCurrency}`; // Do the math and store the result in a variable "conversion"
        
        // Log the values of rate, total, and conversion to the console for debugging
        console.log(`rate: ${rate}, total: ${total}, conversion: ${conversion}`);

        // Push the values of fromCurrency, toCurrency, amt, total, and conversion to the allResults array 
        allResults.push({
          fromCurrency,
          toCurrency,
          amt,
          total,
          conversion
        });

        conversionList.push(conversion); // Add the conversion to the list of conversions
      }
      
      // Join the conversion list with a line break and update the result on the page with the conversion list
      updateResult(conversionList.join("<br>"));
    });
  }
});

// Function to update the result on the page
function updateResult(conversion) { 
  result.innerHTML = conversion; // Update the result on the page
  let searchResult = allResults.find(function(item) { // Find the item in the allResults array that matches the conversion
    return item.conversion === conversion; // Return the item if the conversion matches 
  });
  
  // Log the value of searchResult to the console for debugging
  console.log(searchResult);
}
