import React, { useEffect, useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";

import Container from "../Container";
import Topbar from "./components/Topbar/Topbar";
import Footer from "./components/Footer/Footer";
import { Typography } from "@mui/material";

function ChildMock({ loggedUsers }) {
  const theme = useTheme();

  const loggedUI = loggedUsers.map((user, index) => {
    return (
      <Box key={index}>
         <Typography variant="h4">Name : {user.user.name}</Typography>
      </Box>
    )
  })
  return (
    <Box p={4}>
      <Box
        width={1}
        height={1}
        minHeight={800}
        borderRadius={2}
        border={`2px solid ${theme.palette.divider}`}
        sx={{
          borderStyle: "dashed",
        }}
      >
        <Typography variant="h3" align="center">Logged In User</Typography>
      {loggedUI}
      </Box>
    </Box>
  );
}

function WithFluidLayoutAndNoSidebar({ loggedUsers }) {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  console.log(loggedUsers, "loggedUsers");
  useEffect(() => {
    setName(sessionStorage.getItem("name"));
    setId(sessionStorage.getItem("id"));
  }, []);
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
        elevation={0}
      >
        <Container maxWidth={1} paddingY={{ xs: 1, sm: 1.5 }}>
          <Topbar name={name} id={id} />
        </Container>
      </AppBar>
      <main>
        <Box height={{ xs: 58, sm: 66, md: 71 }} />
        <Box display="flex" flex="1 1 auto" overflow="hidden">
          <Box display="flex" flex="1 1 auto" overflow="hidden">
            <Box flex="1 1 auto" height="100%" overflow="auto">
              <ChildMock loggedUsers={loggedUsers} />
              <Divider />
              {/* <Container paddingY={4}>
                <Footer />
              </Container> */}
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
}

export default WithFluidLayoutAndNoSidebar;
