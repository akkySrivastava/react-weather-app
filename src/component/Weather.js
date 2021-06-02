import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import "./css/Weather.css";
import languages from "./languages";

function Weather() {
  const [dataAll, setData] = useState({});
  const [base, setBase] = useState({});
  const [cords, setCords] = useState({});
  const [search, setSearch] = useState();
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [lang, setLang] = useState("en");
  const [showDaily, setShowDaily] = useState(false);
  const [showHourly, setShowHourly] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=${lang}&appid=28041a492b1aafbce1f1146d76d56c23

  `;

      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then(displayCoords)
        .then(handleHourly);
    } else {
      alert("Enter a valid location");
    }
  };

  function displayCoords(res) {
    setCords(res.coord);
    setBase(res);
    console.log(cords);
    console.log(base);
  }

  const api = "28041a492b1aafbce1f1146d76d56c23";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall?";

  function displayResults(res) {
    setData(res);
    setHourly(dataAll.hourly);
    setDaily(res.daily);
    console.log(res);
    console.log(hourly);
    console.log(daily);
  }

  const handleHourly = () => {
    fetch(
      `${BASE_URL}lat=${cords?.lat}&lon=${cords?.lon}&lang=${lang}&units=metric&appid=${api}`
    )
      .then((res) => {
        return res.json();
      })
      .then(displayResults)
      .catch((err) => console.log("Error: ", err));
  };

  const handleDaily = () => {
    setShowDaily((show) => !show);
  };

  const handleHourlyData = () => {
    setShowHourly((show) => !show);
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function displayDay(d) {
    var date = new Date(d * 1000);
    return days[date.getDay()];
  }

  function displayTime(d) {
    var date = new Date(d * 1000);
    var hrs = date.getHours();
    var minutes = date.getMinutes();

    var formattedTime = hrs + ":" + minutes.toFixed();

    return formattedTime;
  }

  function displayDate(d) {
    var date = new Date(d * 1000);
    var years = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();

    var formattedDate = day + " " + month + " " + years;
    return formattedDate;
  }

  return (
    <div className="weather">
      <div className="weather-container">
        <div className="weather-search">
          <form onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter a location"
            />
            <select
              onChange={(e) => setLang(e.target.value)}
              defaultValue={lang}
            >
              {languages.map((langs) => (
                <option value={langs.code}>{langs.name}</option>
              ))}
            </select>
            <button onClick={handleSubmit} type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="weather-current">
          <h4>
            {base.name}, {base.sys?.country}
          </h4>
          <small>{displayDate(base.dt)}</small>
          <div className="weather-info">
            <div className="weather-icon">
              <img
                src={
                  base?.weather &&
                  `https://openweathermap.org/img/wn/${base?.weather[0]?.icon}@2x.png`
                }
                alt=""
              />
            </div>
            <div className="weather-temp">
              <p>
                {parseInt(base.main?.temp) - (273.15).toFixed()}
                <sup>°c</sup>
              </p>
              <small>
                Real feel{" "}
                <span>
                  {parseInt(base.main?.feels_like) - (273.15).toFixed()}°C ,{" "}
                  {base.weather && base.weather[0]?.description}
                </span>
              </small>
            </div>
            <div className="weather-min-max">
              <div className="weather-max">
                <ArrowDropUpIcon />
                <p>
                  {parseInt(base.main?.temp_max) - (273.15).toFixed()}
                  <sup>°c</sup>
                </p>
              </div>
              <div className="weather-max">
                <ArrowDropDownIcon />
                <p>
                  {parseInt(base.main?.temp_min) - (273.15).toFixed()}
                  <sup>°c</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-hourly-content">
          <div onClick={handleHourlyData} className="weather-hourly-data">
            <p>See hourly weather report</p>
            <div className="drop">
              <ArrowDropDownIcon />
            </div>
          </div>
          <div className="weather-hourly-container">
            {showHourly &&
              hourly?.map((_data) => (
                <div className="weather-hourly-info">
                  <p>{displayTime(new Date(_data.dt).getTime())}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${_data.weather[0]?.icon}@2x.png`}
                    alt=""
                  />
                  <p>
                    {parseInt(_data.temp.toFixed())}
                    <sup>°c</sup>
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="weather-daily-content">
          <div onClick={handleDaily} className="weather-hourly-data">
            <p>See daily weather report</p>
            <div className="drop">
              <ArrowDropDownIcon />
            </div>
          </div>
          <div className="weather-daily-container">
            {showDaily &&
              daily?.map((_daily) => (
                <>
                  <div className="weather-daily-info">
                    <img
                      src={`http://openweathermap.org/img/wn/${_daily.weather[0].icon}@2x.png
                      `}
                      alt=""
                    />
                    <div className="weather-min-max">
                      <div className="weather-max">
                        <ArrowDropUpIcon />
                        <p>
                          {parseInt(_daily.temp?.max).toFixed()}
                          <sup>°c</sup>
                        </p>
                      </div>
                      <div className="weather-max">
                        <ArrowDropDownIcon />
                        <p>
                          {parseInt(_daily.temp?.min).toFixed()}
                          <sup>°c</sup>
                        </p>
                      </div>
                    </div>
                    <p className="day">{displayDay(_daily.dt)}</p>
                    <p>{_daily.weather && _daily.weather[0].description}</p>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
