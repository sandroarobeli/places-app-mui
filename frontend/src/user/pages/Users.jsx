// Third party imports
import React from "react";

// Custom imports
import UsersList from "../components/UsersList";


// Temporary container for dummy data
const USERS = [
    {
      id: "u1",
      name: "Marillon Cotillard",
      image:
        "https://ca-times.brightspotcdn.com/dims4/default/3875161/2147483647/strip/true/crop/381x512+0+0/resize/840x1129!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fde%2Faa%2F9fe6971fe714e7d9b79b5806a159%2Fsdut-file-in-this-may-21-2009-fil-20160829-002",
      places: 3
    },
    {
      id: "u2",
      name: "Olga Kurylenko",
      image:
        "https://tr-images.condecdn.net/image/4lKNoX16pYJ/crop/405/f/olga-kurylenko-conde-nast-traveller-2april15-getty_.jpg",
      places: 7
    },
    {
      id: "u3",
      name: "Diane Kruger",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTM3MzY0Nzk2Ml5BMl5BanBnXkFtZTcwODQ0MTMyMw@@._V1_UY1200_CR93,0,630,1200_AL_.jpg",
      places: 1
  },
  {
    id: "u4",
    name: "Jean Paul Belmondo",
    image: "http://images6.fanpop.com/image/photos/36100000/Jean-Paul-Belmondo-image-jean-paul-belmondo-36169236-2351-2922.jpg",
    places: 69
    }
];

const Users = () => {
  return (
      <UsersList items={USERS} />
    );
};
  
export default Users;
  


