async function fetchWeatherData(city = 'London') {
  const output = document.getElementById('output');
  const spinner = document.getElementById('spinner');

  output.innerHTML = '';
  spinner.style.display = 'block';

  try {
    const response = await fetch(`/weather?city=${city}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    console.error('Fetch Error:', error);
    output.innerHTML = `<p style="color:red; text-align:center;">❌ Unable to load weather data.</p>`;
  } finally {
    spinner.style.display = 'none';
  }
}

function displayWeather(data) {
  const output = document.getElementById('output');
  output.innerHTML = `
    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
    <p>🌡️ Temperature: ${data.main.temp} °C</p>
    <p>☁️ Condition: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function searchCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
}

window.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData();
});
