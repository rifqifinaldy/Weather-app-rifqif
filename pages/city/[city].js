import React from "react";
import RFCard from "../../components/Cards/Cards";
import { WEATHER_APP_BASE_URL, WEATHER_APP_ID } from "../../utility/global";
import Image from "next/image";

export async function getServerSideProps(context) {
  const slug = context.params.city;
  console.log(context.query);
  // Get Request metode server side
  const res = await fetch(
    `${WEATHER_APP_BASE_URL}weather?lat=${context.query.lat}&lon=${context.query.lng}&appid=${WEATHER_APP_ID}`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // Cegah generate HTML yang tidak diperlukan
  if (data) {
    if (data.name.toLowerCase() !== slug) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      data: data,
    },
  };
}

export default function City({ data }) {
  console.log(data);
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
      {data.weather && (
        <div className="card-content">
          <RFCard
            title="Current Weather"
            subtitle={data.name}
            cloudiness={data.clouds.all}
            humidity={data.main.humidity}
            temperature={data.main.temp}
            pressure={data.main.pressure}
            icon={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            description={data.weather[0].description}
          />
        </div>
      )}
    </>
  );
}
