/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FormData from "form-data";

import { authRequests } from "../../utils/axiosRequests";

import Container from "../Container";
import { useRouter } from "next/router";

function SignInForm() {
  const [userDetail, setUserDetail] = React.useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = React.useState(true);

  const router = useRouter();
  const formdata = new FormData();
  const { email, password } = userDetail;

  useEffect(() => {
    if (email.includes("@") && password.length >= 6) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

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
      const user = await authRequests(userDetail, "login", formdata);
      sessionStorage.setItem("token", user.token);
      sessionStorage.setItem("name", user.user.name);
      sessionStorage.setItem("id", user.user.id);
      alert("Successfully Logged In");
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
            sx={{
              textTransform: "uppercase",
            }}
            gutterBottom
            color="text.secondary"
            fontWeight={700}
          >
            Login
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Welcome back
          </Typography>
          <Typography color="text.secondary">
            Login to manage your account.
          </Typography>
        </Box>
        <Card sx={{ p: { xs: 4, md: 6 } }}>
          <Grid container spacing={4}>
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
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretched", sm: "center" }}
                justifyContent="space-between"
                width={1}
                marginBottom={2}
              >
                <Box marginBottom={{ xs: 1, sm: 0 }}>
                  <Typography variant="subtitle2">
                    Enter your password
                  </Typography>
                </Box>
              </Box>
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
                    Don't have an account yet?{" "}
                    <Link
                      component="a"
                      color="primary"
                      href="/signup"
                      underline="none"
                    >
                      Sign up here.
                    </Link>
                  </Typography>
                </Box>
                <Button
                  disabled={disable}
                  onClick={handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}

export default SignInForm;
