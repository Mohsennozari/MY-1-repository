// Base URL for the OpenWeatherMap API to fetch weather data
const url = 'https://api.openweathermap.org/data/2.5/weather';
// API key for authenticating requests to the OpenWeatherMap API
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

// When the document is fully loaded, execute the following function
$(document).ready(function() {
    // Call the weather function with the default city name 'Pune'
    weatherFn('Pune');
});

// Asynchronous function to fetch weather data for a given city name
async function weatherFn(cName) {
    // Construct the complete API request URL with query parameters
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        // Fetch the weather data from the API
        const res = await fetch(temp);
        // Parse the response data as JSON
        const data = await res.json();
        // Check if the response is successful
        if (res.ok) {
            // If successful, call the function to display the weather data
            weatherShowFn(data);
        } else {
            // If the city is not found, alert the user
            alert('City not found. Please try again.');
        }
    } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error fetching weather data:', error);
    }
}

// Function to display the weather data on the webpage
function weatherShowFn(data) {
    // Update the city name element with the name of the city from the data
    $('#city-name').text(data.name);
    // Update the date element with the current date and time using moment.js
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    // Update the temperature element with the temperature in Celsius
    $('#temperature').html(`${data.main.temp}°C`);
    // Update the description element with the weather description
    $('#description').text(data.weather[0].description);
    // Update the wind speed element with the wind speed in meters per second
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    // Update the weather icon element with the appropriate icon URL (placeholder)
    $('#weather-icon').attr('src', `...`);
    // Fade in the weather information section
    $('#weather-info').fadeIn();
}
