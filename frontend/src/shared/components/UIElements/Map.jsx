// Mapbox specific imports  (PER SYSTEM, NEEDS TO BE IMPORTED ON TOP. e.g. HERE)
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

// Third party imports
import React, { useRef, useEffect, useState } from 'react';

// Initializing environmental variables
import dotenv from "dotenv";
dotenv.config();

// Token initialization
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = (props) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [longitude, setLongitude] = useState(props.center.lng);
    const [latitude, setLatitude] = useState(props.center.lat);
    const [zoom, setZoom] = useState(props.zoom);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitude, latitude],
          zoom: zoom
        });
        // Add zoom and rotation controls to the map.
        map.current.addControl(new mapboxgl.NavigationControl());

        // Add user's dynamic active geolocation control
        map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
          })
        );
        console.log(process.env.NODE_ENV)  // KEEP IN MIND!!!
        // Create a default Marker and add it to the map.
        const marker = new mapboxgl.Marker({ color: "red" })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

    }, [longitude, latitude, zoom]);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLongitude(map.current.getCenter().lng.toFixed(4));
        setLatitude(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <React.Fragment>
            <div
                style={{
                    backgroundColor: "#2a006e",
                    opacity: 0.8,
                    color: "#fff",
                    padding: '0.2rem 0.5rem',
                    fontFamily: 'monospace',
                    zIndex: 1,
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    margin: '0.2rem',
                    borderRadius: '3px'
                }}
            >
                Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
            </div>
            <div
                ref={mapContainer}
                style={{
                    height: '15rem',
                    margin: '0 auto',
                }}
            />
        </React.Fragment>
    );
}

export default Map;
