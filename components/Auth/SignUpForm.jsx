/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
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
  const userState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    mobile: "",
    zipcode: "",
  }
  const [userDetail, setUserDetail] = useState({...userState});
  const [disable, setDisable] = useState(true);
  const formdata = new FormData();

  const router = useRouter();
  const { name, email, password, phone, mobile, zipcode } = userDetail;

  useEffect(() => {
    if (email.includes("@") && password.length >= 6 && mobile.length == 10 && zipcode.length == 5) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password, mobile, zipcode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const user = await authRequests(userDetail, "register", formdata);
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("name", user.user.name);
      sessionStorage.setItem("id", user.user.id);
      alert("Successfully registered");
      setUserDetail({...userState})
      router.push("/login");
    } catch (error) {
      console.log(error, "error");
      setUserDetail({...userState})
      alert(error);
    }
  };

  return (
    <Box bgcolor="alternate.main">
      <Container maxWidth={800}>
        <Box marginBottom={2}>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your name
              </Typography>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                fullWidth
                size="small"
                value={name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your email
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
                size="small"
                required
                error={!email.includes("@")}
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your password
              </Typography>
              <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                fullWidth
                size="small"
                required
                error={password.length <= 0}
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
                size="small"
                value={phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your mobile number
              </Typography>
              <TextField
                label="Mobile"
                variant="outlined"
                name="mobile"
                type="number"
                fullWidth
                required
                error={mobile.length <= 9 || mobile.length > 10}
                size="small"
                value={mobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                Enter your zipcode
              </Typography>
              <TextField
                label="Zipcode"
                variant="outlined"
                name="zipcode"
                type="number"
                fullWidth
                size="small"
                required
                error={!zipcode.length === 6}
                value={zipcode}
                onChange={handleChange}
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
                <Button
                  disabled={disable}
                  onClick={handleSubmit}
                  size="large"
                  variant="contained"
                >
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
