const api = "f55f21f82d48cb7ea402eec1af21d0c3";
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall?";

export const getWeatherData = (lat, lon) => {
  const url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${api}`;
  return fetch(url)
    .then((res) => {
      const response = res.json();
      console.log(response);
    })
    .catch((err) => console.log("Error: ", err));
};
