import './style.css';

// api key: 433672c6087f491083c135734242604
// Base URL: http://api.weatherapi.com/v1
// https://api.weatherapi.com/v1/current.json?key=433672c6087f491083c135734242604&q=chicago

async function getWeatherData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=433672c6087f491083c135734242604&q=${city}`
  );
  const data = await response.json();
  return data;
}

function parseData(data) {
  return {
    name: data.location.name,
    region: data.location.region,
    localtime: data.location.localtime,
    condition: {
      icon: data.current.condition.icon,
      text: data.current.condition.text,
    },
    temp_f: data.current.temp_f,
  };
}

const userSearch = document.querySelector('#search-form');

userSearch.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchValue = document.querySelector('#search').value;

  const icon = document.querySelector('.icon');
  const city = document.querySelector('.name');
  const region = document.querySelector('.region');
  const condition = document.querySelector('.condition');
  const temp = document.querySelector('.temp');

  try {
    let data = await getWeatherData(searchValue);
    data = parseData(data);
    icon.src = data.condition.icon;
    city.textContent = data.name;
    region.textContent = data.region;
    condition.textContent = data.condition.text;
    temp.textContent = `${data.temp_f}°F`;
    console.log(data);
  } catch (error) {
    console.error('Error occurred:', error);
  }
});

//default city
getWeatherData('chicago').then(console.log);
