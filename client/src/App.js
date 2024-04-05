import './App.css';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTint, faWind } from '@fortawesome/free-solid-svg-icons'; 

function SriLankaMap() {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const customIcon = new Icon ({
    iconUrl: require("./img/marker.png"),
    iconSize: [26, 26]
  });

  useEffect(() => {
    const apiUrl = 'https://web-api-cw-server-app.onrender.com/weatherInfo';
    //const apiUrl = 'http://localhost:5000/weatherInfo';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const watherInformation = data;
        setWeatherInfo(watherInformation);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });
  return (
    <MapContainer center={[7.8731, 80.7718]} zoom={8}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {weatherInfo.map(weatherinfo => (
        <Marker key={weatherinfo.districtId} position={[weatherinfo.latitude, weatherinfo.longtude]} icon = {customIcon}>
          <Tooltip permanent>
            <span>
              <strong>{weatherinfo.districtName}</strong><br/>
              <FontAwesomeIcon icon={faThermometerHalf} /> Temperature: <strong>{weatherinfo.temprature}</strong><br/>
              <FontAwesomeIcon icon={faTint} /> Humidity: <strong>{weatherinfo.humidity}</strong><br/>
              <FontAwesomeIcon icon={faWind} /> Air Pressure: <strong>{weatherinfo.airpressure}</strong>
            </span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default SriLankaMap;

//JSON Template
// {
//     "_id": "65f5e6bbd35a23f2c92ba5aa",
//     "districtId": "A01",
//     "districtName": "Ampara",
//     "longtude": "81.6643",
//     "latitude": "7.2965",
//     "temprature": "27°C",
//     "humidity": "62%",
//     "airpressure": "1019hPa",
//     "createdAt": "2024-03-16T18:36:43.436Z",
//     "updatedAt": "2024-03-16T20:38:22.975Z",
//     "__v": 0
// },