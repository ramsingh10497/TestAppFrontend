import { Typography, Box } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import WithFluidLayoutAndNoSidebar from "../components/WithFluidLayoutAndNoSidebar/WithFluidLayoutAndNoSidebar";
import styles from "../styles/Home.module.css";
import { loggedUsersFetchPath } from "../utils/apiPaths";

export default function Home() {
  const [loggedUsers, setLoggedUser] = useState([]);
  useEffect(() => {
    axios
    .get(loggedUsersFetchPath)
    .then((res) => {
      const id = sessionStorage.getItem('id');
      let response = res.data
      let filteredData = response?.filter((item) => {
        return item.id != id
      })
      setLoggedUser(filteredData)
    })
    .catch((err) => {
      console.log(err, "husdi");
    });
  },[])

  return (
    <Box className={styles.container}>
      <Head>
        <title>HomePage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <WithFluidLayoutAndNoSidebar loggedUsers={loggedUsers} />
      </Box>
    </Box>
  );
}
