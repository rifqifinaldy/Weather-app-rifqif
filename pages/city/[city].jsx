import React, { useState } from "react";
import RFCard from "../../components/Cards/Cards";
import { WEATHER_APP_BASE_URL, WEATHER_APP_ID } from "../../utility/global";
import Image from "next/image";
import { Box, capitalize, Tab, Tabs, Typography } from "@mui/material";
import { a11yProps, TabPanel } from "../../components/Tabs/Tabs";
import Link from "next/link";

export async function getServerSideProps(context) {
  const slug = context.params.city;
  let [nowRes, hourlyRes] = await Promise.all([
    fetch(
      `${WEATHER_APP_BASE_URL}weather?lat=${context.query.lat}&lon=${context.query.lng}&&units=metric&appid=${WEATHER_APP_ID}`
    ),
    fetch(
      `${WEATHER_APP_BASE_URL}/forecast?lat=${context.query.lat}&lon=${context.query.lng}&units=metric&appid=${WEATHER_APP_ID}`
    ),
  ]);
  let [now, hourly] = await Promise.all([nowRes.json(), hourlyRes.json()]);

  if (!now || !hourly) {
    return {
      notFound: true,
    };
  }

  // Cegah generate HTML yang tidak diperlukan
  if (now.name) {
    if (now.name.toLowerCase() !== slug) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      now: now,
      forecast: hourly,
    },
  };
}

export default function City({ now, forecast }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [value, setValue] = useState(0);

  const changeMenu = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* Handle error bila Latitude dan Longitude tidak valid atau ketik mengetik url tidak valid secara manual*/
  if (now.weather) {
    return (
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
            subtitle={now.name}
            cloudiness={now.clouds.all}
            humidity={now.main.humidity}
            temperature={now.main.temp}
            pressure={now.main.pressure}
            icon={`http://openweathermap.org/img/wn/${now.weather[0].icon}@4x.png`}
            description={now.weather[0].description}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1} id="main-tabs">
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
    );
  } else {
    return (
      <>
        <Typography
          align="center"
          sx={{ color: "info.main", fontWeight: "bold" }}
          variant="h2"
        >
          {capitalize(now.message)}
        </Typography>
        <Typography sx={{ color: "info.main" }} align="center" variant="h6">
          <Link href="/">Back to Home page</Link>
        </Typography>
      </>
    );
  }
}
