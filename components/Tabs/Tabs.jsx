import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

export const TabPanel = ({ children, value, index, id, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}` + index}
      aria-labelledby={`${id}` + index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const a11yProps = (index, id) => {
  return {
    id: `${id}` + index,
    "aria-controls": `${id}` + index,
  };
};
