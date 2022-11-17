import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Router from "next/router";
import axios from "axios";
import { logoutPath } from "../../../../utils/apiPaths";


function Topbar({ name, id }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenuId, setOpenMenuId] = React.useState(null);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenuId(null);
  };

  const handleReset = () => {
    axios.get(logoutPath).then((res) => {
      sessionStorage.clear()
      Router.push("/login")
    }).catch((err) => {
      alert("Something Wrong")
    })
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width={1}
    >
      <Box display="flex" alignItems="center" color="primary.dark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <Typography fontWeight={700} marginLeft={1}>
          Home
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box marginLeft={2}>
          <Button
            variant="contained"
            color="primary"
            href={name ? `/account/${id}` : "/login"}
            size="large"
          >
            {name ? name : "Login"}
          </Button>
        </Box>
        <Box marginLeft={2}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href={"/login"}
            size="large"
            onClick={handleReset}
            disabled={!name}
          >
            LogOut
          </Button>
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" } }} alignItems="center">
          <Button
            onClick={(e) => handleClick(e, "mobile-menu")}
            aria-label="Menu"
            variant="outlined"
            sx={{
              borderRadius: 2,
              minWidth: "auto",
              padding: 1,
              borderColor: alpha(theme.palette.divider, 0.2),
              marginLeft: 2,
            }}
          >
            <MenuIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Topbar;
