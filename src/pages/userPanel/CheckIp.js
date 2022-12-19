import React from "react";
import { useEffect, useState } from "react";
import { Button, Grid, Typography, ButtonGroup } from "@mui/material";

const CheckIp = (props) => {
  const [stateData, setStateData] = useState({});

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
        <Button> {props.ipData.region}</Button>
        <Button sx={{ ml: 3 }}>{props.ipData.city}</Button>
        <Button sx={{ ml: 3 }}>{props.ipData.country}</Button>
      </ButtonGroup>
      <br />
      <Button
        variant="contained"
        color="success"
        aria-label="outlined button group"
        sx={{ mt: 10 }}
        size="large">
        Fetch Data
      </Button>
    </Grid>
  );
};

export default CheckIp;
