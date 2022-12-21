import React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, Typography, ButtonGroup } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";

const IpCheck = (props) => {
  // useEffect(async () => {
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   const res = await axios.get(
  //     `http://localhost:8000/api/fetchdata/${state}`,
  //     config
  //   );
  // }, []);
  return (
    <Grid
      item
      xs={12}
      align="center"
      sx={{ backgroundColor: "#white", p: 1, color: "black" }}>
      <Typography variant="h5" color="black">
        Your IP Is {props.ip}
      </Typography>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        sx={{ mt: 2 }}>
        <Button>{props.region}</Button>
        <Button sx={{ ml: 3 }}>{props.city}</Button>
        <Button sx={{ ml: 3 }}>{props.country}</Button>
      </ButtonGroup>
      <br />
      {props.fetchinData ? (
        <Button
          onClick={props.fetchData}
          variant="contained"
          color="success"
          aria-label="outlined button group"
          sx={{ mt: 10 }}
          size="large">
          {props.regionName}
        </Button>
      ) : (
        <Alert sx={{ mt: 5 }} severity="error">
          Data Not Found
        </Alert>
      )}
    </Grid>
  );
};

export default IpCheck;
