import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./navbar.style";
import { TextField, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const city = [
    { id: 0, label: "Jakarta", lat: -6.2146, lng: 106.8451 },
    { id: 1, label: "Surabaya", lat: -7.2458, lng: 112.7378 },
  ];

  const search = (e, value) => {
    console.log(value);
    router.push(
      `/city/${value.label.toLowerCase()}?lat=${value.lat}&lng=${value.lng}`
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Tooltip title="Go to Current Location">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <CloudIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Weather App
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              disablePortal
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disableClearable
              onChange={(e, value) => search(e, value)}
              size="small"
              id="combo-box-demo"
              options={city}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search City...." />
              )}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
