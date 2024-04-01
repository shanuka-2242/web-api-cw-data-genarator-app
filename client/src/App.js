import React, { useState, useEffect } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const MapComponent = ({ longitude, latitude }) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        // Initialize map when component mounts
        const initializeMap = () => {
            const newMap = L.map('map').setView([latitude, longitude], 13); // Center the map using provided longitude and latitude
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);
            setMap(newMap);
        };

        if (!map) initializeMap();
    }, [map, longitude, latitude]);

    useEffect(() => {
        // Add marker when longitude or latitude changes
        if (map && longitude !== null && latitude !== null) {
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup('Location')
                .openPopup();
        }
    }, [map, longitude, latitude]);

    return (
        <div>
            {/* Div to hold the map */}
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
        </div>
    );
};

export default MapComponent;
