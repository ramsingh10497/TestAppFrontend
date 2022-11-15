import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { userUpdate } from "../../utils/axiosRequests"
import FormData from "form-data";

import Container from "../Container";

function UserCard({ user }) {
  const theme = useTheme();
  const {name, email, phone, mobile, zipcode, picture} = user || {}
  const [userDetail, setUserDetail] = useState({
    name: name ,
    email: email,
    password: "",
    phone: phone,
    mobile: mobile,
    zipcode: zipcode,
  });

  const formdata = new FormData();
  const router = useRouter();

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
    const id = sessionStorage.getItem("id")
    try {
      const user = await userUpdate(id, userDetail, formdata);
      sessionStorage.setItem("name", user?.user?.name);
      alert("Successfully Saved");
      // router.push("/");
    } catch (error) {
      console.log(error, "error");
      alert(error);
    }
  };

  return (
    <Box bgcolor="alternate.main">
      <Container maxWidth={800}>
        <Card
          sx={{
            p: { xs: 2, md: 2 },
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTop: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            User details
          </Typography>
          <Divider sx={{ marginY: 4 }} />
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                  Update your name
                </Typography>
                <TextField
                  variant="outlined"
                  name="name"
                  type="text"
                  fullWidth
                  size="small"
                  value={userDetail.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                  Update your email
                </Typography>
                <TextField
                  variant="outlined"
                  name="email"
                  fullWidth
                  size="small"
                  value={userDetail.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                  Update your password
                </Typography>
                <TextField
                  variant="outlined"
                  name="password"
                  type="password"
                  fullWidth
                  size="small"
                  value={userDetail.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                  Update your phone number
                </Typography>
                <TextField
                  variant="outlined"
                  name="phone"
                  type="number"
                  fullWidth
                  size="small"
                  value={userDetail.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                  Update your mobile number
                </Typography>
                <TextField
                  variant="outlined"
                  name="mobile"
                  type="number"
                  fullWidth
                  size="small"
                  value={userDetail.mobile}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                  Update your Zipcode number
                </Typography>
                <TextField
                  variant="outlined"
                  name="zipcode"
                  type="number"
                  fullWidth
                  size="small"
                  value={userDetail.zipcode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                  Update your profile pic
                </Typography>
                <TextField
                  variant="outlined"
                  name="picture"
                  type="file"
                  fullWidth
                  size="small"
                  onChange={handleFile}
                />
              </Grid>
              <Grid item container xs={12}>
                <Button onClick={handleSubmit} size="large" variant="contained" type="submit">
                  Save changes
                </Button>
              </Grid>
            </Grid>
        </Card>
      </Container>
    </Box>
  );
}

export default UserCard;
