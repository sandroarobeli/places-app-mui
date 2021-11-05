// Third party imports
import React from "react";
import { useParams } from "react-router-dom";


// Custom imports
import PlaceList from "../components/PlaceList";


// Temporary container for dummy data
const PLACES = [
    {
      id: "p1",
      title: "Empire state building",
      description: "One of the most skyscrapers in the world",
      imageUrl:
        "https://media.istockphoto.com/photos/new-york-city-skyline-picture-id486334510?k=6&m=486334510&s=612x612&w=0&h=qMsSuzsZcCtSEZyhnEsJsQvRSx-feldCQAOR9D9mVas=",
      address: "20 W 34th St, New York, NY 10001",
      creator: "u1",
      location: {
        lat: 40.7484,
        lng: -73.9857
      }
    },
    {
      id: "p2",
      title: "Leaning tower of Pisa",
      description: "Leaning tower structure in the city of Pisa,Italy",
      imageUrl:
        "https://cdn.britannica.com/88/80588-050-8D944BFE/Leaning-Tower-of-Pisa-Italy.jpg",
      address: "Piazza del Duomo, 56126 Pisa PI, Italy",
      creator: "u1",
      location: {
        lat: 43.723,
        lng: 10.3966
      }
    },
    {
      id: "p3",
      title: "Le Louvre",
      description: "The Louvre museum in Paris, France",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Louvre_Courtyard%2C_Looking_West.jpg/805px-Louvre_Courtyard%2C_Looking_West.jpg",
      address: "Rue de Rivoli, 75001 Paris, France",
      creator: "u2",
      location: {
        lat: 48.8606,
        lng: 2.3376
      }
    }
];
  
const UserPlaces = (props) => {
    // Access to the dynamic segments
    const userId = useParams().userId;
  
    const uploadedPlaces = PLACES.filter((place) => place.creator === userId);
    
  return (
    <PlaceList items={uploadedPlaces} />
    );
  };
  
  export default UserPlaces;
  

