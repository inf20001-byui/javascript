// The API I selected https://www.exchangerate-api.com/ supports many other currencies,
// I simply picked the currencies I was most interested in for now but they are very easy to add.
// The other currencies supported can be found at https://www.exchangerate-api.com/docs/supported-currencies 


var button1 = document.getElementById("convert"); // Get the button element
var result = document.getElementById("result"); // Get the result element

// Create an array to store all the results when the user clicks the convert button
button1.addEventListener('click', function(event) {
    let fromCurrency = document.getElementById("startingCurrency").value; // Get the value of the starting currency
    let toCurrency = document.getElementById("newCurrency").value; // Get the value of the new currency
    let amt = document.getElementById("startingAmount").value; // Get the value of the starting amount
    
    // Log the values of fromCurrency, toCurrency, and amt to the console for debugging
    console.log(`fromCurrency: ${fromCurrency}, toCurrency: ${toCurrency}, amt: ${amt}`);

    // Error checking to make sure we are not trying to convert from and to the same currency
    if (fromCurrency === toCurrency) {
        result.innerHTML = "Cannot convert to the same currency"; // Display error message
    } else if (amt.trim() === "") { // Check if the amount is empty
        result.innerHTML = "Please enter a valid starting amount"; // Display error message
    } else {
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`) // Fetch (download) the exchange rates
        .then(function(response) { // Wait for the response
            return response.json(); // Convert the response to JSON
        }) 
        .then(function(data) { 
            let rate = data.rates[toCurrency]; // Get the exchange rate for the toCurrency
            let total = (rate * amt).toFixed(2); // Calculate the total amount in the toCurrency
            let conversion = `${amt} ${fromCurrency} = ${total} ${toCurrency}`; // Do the math

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
            updateResult(conversion); // call the updateResult function
        });
  }
});

// Function to update the result on the HTML page
function updateResult(conversion) { 
  result.innerHTML = conversion; // Display the conversion on the HTML page
  let searchResult = allResults.find(function(item) { // Search the allResults array for the conversion and set it to searchResult
    return item.conversion === conversion; // Return the conversion that matches the one we are looking for
  });
  // Log the value of searchResult to the conosle for debugging
  console.log(searchResult);
}