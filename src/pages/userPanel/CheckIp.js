import React from "react";
import { useState } from "react";
import { Button, Grid, Typography, ButtonGroup } from "@mui/material";
import axios from "axios";

import { getToken } from "../../services/LocalStorageService";
import ShowData from "./ShowData";

const CheckIp = (props) => {
  const token = getToken();
  const [toggleData, setToggleData] = useState(false);

  const [stateData, setStateData] = useState({});

  const fetchData = async () => {
    setToggleData((setToggleData) => !setToggleData);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const usState = props.ipData.region;

    const res = await axios.get(
      `http://localhost:8000/api/fetchdata/${usState}`,
      config
    );

    setStateData(res.data.user);
  };

  return !toggleData ? (
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
        onClick={fetchData}
        variant="contained"
        color="success"
        aria-label="outlined button group"
        sx={{ mt: 10 }}
        size="large">
        Fetch Data
      </Button>
    </Grid>
  ) : (
    <Grid>
      <ShowData stateData={stateData} />
    </Grid>
  );
};

export default CheckIp;
