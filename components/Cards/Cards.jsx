import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { capitalize, Divider, Grid } from "@mui/material";

export default function RFCard({
  title,
  subtitle,
  description,
  icon,
  cloudiness,
  humidity,
  temperature,
  pressure,
}) {

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "65%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography align="center" component="div" variant="h5">
            {title}
          </Typography>
          <Divider>
            <Typography variant="h6" color="text.secondary" component="div">
              {subtitle}
            </Typography>
          </Divider>
          <Grid sx={{ justifyContent: "center", textAlign: "center" }} container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="p" component="div">
                Cloudiness : {cloudiness} %
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="p" component="div">
                Humidity : {humidity} %
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="p" component="div">
                Temperature : {temperature}&deg; C
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="p" component="div">
                Pressure : {pressure} hPA
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
      <Box sx={{ justifyContent: "center", pb: 1 }}>
        <Image
          src={icon}
          layout="intrinsic"
          width={150}
          height={150}
          priority="lazy"
          alt="Weather Icon"
        />
        <Typography align="center" color="text.secondary" variant="h6">
          {capitalize(description)}
        </Typography>
      </Box>
    </Card>
  );
}

