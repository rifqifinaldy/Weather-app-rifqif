import { useEffect, useState } from "react";
import RFCard from "../components/Cards/Cards";
import { WEATHER_APP_BASE_URL, WEATHER_APP_ID } from "../utility/global";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "../components/Tabs/Tabs";
import { Typography } from "@mui/material";

export default function Home() {
  
  const [current, setCurrent] = useState({});
  const [forecast, setForecast] = useState({});
  const [value, setValue] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const changeMenu = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Kenapa gak di server side ? karena Latitude dan Longitude
  // tidak bisa diakses oleh geolocation secara server side https://stackoverflow.com/questions/60399243/node-js-referenceerror-navigator-is-not-defined

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // Get Request
  const getWeather = async (position) => {
    try {
      let [current, forecast] = await Promise.all([
        fetch(
          `${WEATHER_APP_BASE_URL}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${WEATHER_APP_ID}`
        ),
        fetch(
          `${WEATHER_APP_BASE_URL}/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${WEATHER_APP_ID}`
        ),
      ]);
      const hourly = await forecast.json();
      const now = await current.json();
      setCurrent(now);
      setForecast(hourly);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Handle error bila Browser Belum Mengizinkan Akses Lokasi */}
      {current.weather ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={changeMenu}
              aria-label="tabs"
              id="main-menu"
              centered={true}
              variant="fullWidth"
            >
              <Tab label="Current Weather" {...a11yProps(0)} />
              <Tab label="Forecast 5 Days / 3 Hours" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabIndex} index={0} id="main-tabs">
            <RFCard
              title="Current Weather"
              subtitle={current.name}
              cloudiness={current.clouds.all}
              humidity={current.main.humidity}
              temperature={current.main.temp}
              pressure={current.main.pressure}
              icon={`http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
              description={current.weather[0].description}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            {forecast.list.map((forecasts, i) => {
              return (
                <TabPanel value={value} key={i} index={i}>
                  <RFCard
                    title="Weather Forecast"
                    subtitle={forecast.city.name}
                    cloudiness={forecasts.clouds.all}
                    humidity={forecasts.main.humidity}
                    temperature={forecasts.main.temp}
                    pressure={forecasts.main.pressure}
                    icon={`http://openweathermap.org/img/wn/${forecasts.weather[0].icon}@4x.png`}
                    description={forecasts.weather[0].description}
                  />
                </TabPanel>
              );
            })}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="forecast"
              id="forecast"
              variant="scrollable"
            >
              {forecast.list.map((forecasts, i) => {
                // Split Tanggal dan Jam agar dapat di customize
                const dateTime = forecasts.dt_txt.split(" ");
                return (
                  <Tab
                    key={i}
                    label={
                      <>
                        <Typography variant="p">
                          {new Date(dateTime[0]).toDateString()}
                        </Typography>{" "}
                        <Typography variant="caption">{dateTime[1]}</Typography>
                      </>
                    }
                    {...a11yProps(i, "forecast-tabs")}
                  />
                );
              })}
            </Tabs>
          </TabPanel>
        </>
      ) : (
        <>
          <Typography
            sx={{ color: "info.main", fontWeight: "bold" }}
            align="center"
            variant="h4"
          >
            To Access Current Location Weather, Please Enable Your Location From
            your Browser
          </Typography>
        </>
      )}
    </>
  );
}
