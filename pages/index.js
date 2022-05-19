import Image from "next/image";
import { useEffect, useState } from "react";
import RFCard from "../components/Cards/Cards";
import { WEATHER_APP_BASE_URL, WEATHER_APP_ID } from "../utility/global";

export default function Home() {
  const [weather, setWeather] = useState({});
  // Kenapa gak di server side ? karena Latitude dan Longitude
  // tidak bisa diakses oleh geolocation secara langsung https://stackoverflow.com/questions/60399243/node-js-referenceerror-navigator-is-not-defined

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    return () => {
      console.log("Cleaning Up...");
    };
  }, []);

  // Get Request
  const getWeather = async (position) => {
    const response = await fetch(
      `${WEATHER_APP_BASE_URL}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${WEATHER_APP_ID}`
    );
    setWeather(await response.json());
  };

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
      {/* Handle error bila Browser Belum Mengizinkan Akses Lokasi */}
      {weather.weather && (
        <div className="card-content">
          <RFCard
            title="Current Weather"
            subtitle={weather.name}
            cloudiness={weather.clouds.all}
            humidity={weather.main.humidity}
            temperature={weather.main.temp}
            pressure={weather.main.pressure}
            icon={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            description={weather.weather[0].description}
          />
        </div>
      )}
    </>
  );
}
