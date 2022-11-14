/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import FormData from "form-data";

import { authRequests } from "../../utils/axiosRequests";

import Container from "../Container";

function SignUpForm() {
  const [userDetail, setUserDetail] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: 0,
    mobile: 0,
    zipcode: 0,
  });
  const formdata = new FormData();

  const router = useRouter();
  const { name, email, password, phone, mobile, zipcode } = userDetail;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleFile = (event) => {
    const files = Array.from(event.target.files);
    const [file] = files;
    // formdata.append(
    //   "picture",
    //   "/home/ram/Pictures/Screenshot from 2022-10-29 11-12-18.png"
    // );
  };

  const handleSubmit = async () => {
    try {
      const user = await authRequests(userDetail, "register", formdata);
      sessionStorage.setItem("token", user.token);
      alert("Successfully registered")
      router.push("/");
    } catch (error) {
      console.log(error, "error");
      alert(error);
    }
  };

  return (
    <Box bgcolor="alternate.main">
      <Container maxWidth={800}>
        <Box marginBottom={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Create an account
          </Typography>
        </Box>
        <Card sx={{ p: { xs: 4, md: 6 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your name
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                fullWidth
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your email
              </Typography>
              <TextField
                label="Email *"
                variant="outlined"
                name="email"
                fullWidth
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your password
              </Typography>
              <TextField
                label="Password *"
                variant="outlined"
                name="password"
                type="password"
                fullWidth
                value={password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your phone number
              </Typography>
              <TextField
                label="Phone"
                variant="outlined"
                name="phone"
                type="number"
                fullWidth
                value={phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your mobile number
              </Typography>
              <TextField
                label="Mobile *"
                variant="outlined"
                name="mobile"
                type="number"
                fullWidth
                value={mobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your zipcode
              </Typography>
              <TextField
                label="Zipcode *"
                variant="outlined"
                name="zipcode"
                type="number"
                fullWidth
                value={zipcode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Select profile pic
              </Typography>
              <TextField
                // label="Profile"
                variant="outlined"
                name="picture"
                type="file"
                fullWidth
                onChange={handleFile}
              />
            </Grid>
            <Grid item container xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretched", sm: "center" }}
                justifyContent="space-between"
                width={1}
                maxWidth={600}
                margin="0 auto"
              >
                <Box marginBottom={{ xs: 1, sm: 0 }}>
                  <Typography variant="subtitle2">
                    Already have an account?{" "}
                    <Link
                      component="a"
                      color="primary"
                      href="/login"
                      underline="none"
                    >
                      Login.
                    </Link>
                  </Typography>
                </Box>
                <Button onClick={handleSubmit} size="large" variant="contained">
                  Sign up
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}

export default SignUpForm;
