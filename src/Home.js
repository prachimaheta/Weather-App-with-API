import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image:''
  });
  const [name, setName] = useState('');
  const [error, setError] = useState(''); 
  const handleClick = () => {
    if (name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ef2c3163ed522b1cf573603fd05b736f&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = '';
          if(res.data.weather[0].main == "Clouds"){
            imagePath = "/images/cloud.png"
          }else if(res.data.weather[0].main == "Clear"){
            imagePath = "/images/clear.png"
          }else if(res.data.weather[0].main == "Rain"){
            imagePath = "/images/rain.png"
          }else if(res.data.weather[0].main == "Drizzle"){
            imagePath = "/images/drizzle.png"
          }else if(res.data.weather[0].main == "Mist"){
            imagePath = "/images/mistr.png"
          }else{
            imagePath = "/images/cloud.png"
          }
          console.log(res.data);
         
          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed, image:imagePath
          })
          setError('');
        })
        .catch((err) => {
          if(err.response.status == 404){
            setError ("Invalid City Name")
          }
          else{
            setError ('');
          }
          console.error(err);
          alert('City not found or an error occurred. Please try again.');
        });
    } else {
      alert('Please enter a city name.');
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>
            <img src="/images/search.png" alt="Search" />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={data.image} alt="" className="icon" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.png" alt="" />
              <div className="humidity">
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


