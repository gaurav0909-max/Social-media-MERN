import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useRef } from "react";
import { useMediaQuery } from "@mui/material";
import { DRAWER_WIDTH } from "../../consts/constants";
import { ICONS } from "../../Assets/Icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FixedBottomNavigation() {
  const [value, setValue] = useState();
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  const Ipad = useMediaQuery("(min-width:900px)");
  const windowWidth = useRef(window.innerWidth);

  const navigate = useNavigate();
  const getLabel = (value) => {
    switch (value) {
      case 0:
        return "home";
      case 1:
        return "search";
      case 2:
        return "upload";
      default:
        return "";
    }
  };
  const handleNavigation = (newValue) => {
    setValue(newValue);
    const label = getLabel(newValue); // Replace getLabel with your logic to get the label based on the selected value
    navigate(`/${label}`);
  };

  return (
    <Box
      sx={{
        width: Ipad ? `calc(100% - ${DRAWER_WIDTH}px)` : windowWidth.innerWidth,
        ml: Ipad ? `${DRAWER_WIDTH}px` : null,
        mt: "10px",
        display: Ipad ? "none" : "block",
      }}
    >
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />

        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, color:'#ff0080' }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => handleNavigation(newValue)}
          >
            <BottomNavigationAction label="Home" style={{color:"#ff0080"}}   icon={<ICONS.Home />}/>
            <BottomNavigationAction label="Search"style={{color:"#ff0080"}} icon={<ICONS.Search />}/>
            <BottomNavigationAction label="Upload" style={{color:"#ff0080"}} icon={<ICONS.Upload />}/>
          </BottomNavigation>
        </Paper>
      </Box>
    </Box>
  );
}


