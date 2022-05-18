import { Container } from "@mui/system";
import Image from "next/image";
import { useEffect } from "react";
import RFCard from "../components/Cards/Cards";

export default function Home() {

  // Kenapa gak di server side ? karena Latitude dan Longitude 
  // tidak bisa diakses oleh geolocation secara langsung https://stackoverflow.com/questions/60399243/node-js-referenceerror-navigator-is-not-defined
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  // Request API
  function getWeather(position) {
    console.log("Current Position", position.coords.latitude + "-" + position.coords.longitude);
    fetch(`https://jsonplaceholder.typicode.com/posts`)
   .then((response) => console.log(response))
   .catch((error) => console.log(error))
  }

  useEffect(() => {
    getLocation();
    return () => {};
  }, []);

  return (
    <>
      <div className="background">
        <Image
          alt="Weather-app"
          src="/images/background-cold.jpg"
          objectFit="cover"
          layout="fill"
          quality={100}
          priority={true}
        />
      </div>
      <div className="card-content">
        <RFCard />
      </div>
    </>
  );
}
