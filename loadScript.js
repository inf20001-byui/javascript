 // Load a script dynamically based on the button clicked

function loadScript(scriptName) {
    // Create a new script element
    const script = document.createElement("script");
    script.src = scriptName; // Set the source of the script to the scriptName parameter
    script.async = true; // Set the script to load asynchronously

    // Add the script element to the head of the document
    document.head.appendChild(script);
}

// Get the buttons from the HTML page
const convertButton = document.getElementById("convert"); // Get the "Convert" button element from the HTML page
const convertAllButton = document.getElementById("convertAll"); // Get the "Show All" button element from the HTML page

// Add event listeners to the buttons
convertButton.addEventListener("click", function() {
    // Load the single currency script when the "Convert" button is clicked
    loadScript("singleCurrency.js");

    // Remove the all currency script when the "Convert" button is clicked to prevent duplicate results
    const allCurrencyScript = document.querySelector('script[src="allCurrency.js"]');
    if (allCurrencyScript) {
        allCurrencyScript.remove();
    }
});

convertAllButton.addEventListener("click", function() {
    // Load the all currency script when the "Show All" button is clicked
    loadScript("allCurrency.js");

    // Remove the single currency script when the "Show All" button is clicked to prevent duplicate results
    const singleCurrencyScript = document.querySelector('script[src="singleCurrency.js"]');
    if (singleCurrencyScript) {
        singleCurrencyScript.remove();
    }
});