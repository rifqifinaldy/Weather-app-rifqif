import { useState, useEffect } from "react";
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
import { cityCoordinate } from "../../utility/city";

export default function Navbar() {
  const router = useRouter();
  const [clear, setClear] = useState(false);
  const search = (e, value) => {
    router.push(
      `/city/${value.label.toLowerCase()}?lat=${value.lat}&lng=${value.lng}`
    );
  };

  // Clear Search value jika kembali ke homepage
  const handleClear = () => {
    setClear(!clear);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <a onClick={(e) => handleClear()}>
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
            </a>
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
              id="combo-box-demo"
              size="small"
              disablePortal={true}
              disableClearable={true}
              key={clear}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => search(e, value)}
              options={cityCoordinate}
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
