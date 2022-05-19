import Image from "next/image";
import { useEffect, useState } from "react";
import RFCard from "../components/Cards/Cards";
import { WEATHER_APP_BASE_URL, WEATHER_APP_ID } from "../utility/global";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [weather, setWeather] = useState({});
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
    const hourly = await fetch(
      `${WEATHER_APP_BASE_URL}/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=10&units=metric&appid=${WEATHER_APP_ID}`
    );
    const resHourly = await hourly.json();
    console.log("hourly", resHourly);
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
        <>
          <div className="card-content">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </div>
        </>
      )}
    </>
  );
}
