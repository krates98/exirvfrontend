import React from "react";
import { Button, Grid, Typography, ButtonGroup } from "@mui/material";
import Alert from "@mui/material/Alert";

const IpCheck = (props) => {
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

      <Button
        onClick={props.fetchData}
        variant="contained"
        color="success"
        aria-label="outlined button group"
        sx={{ mt: 5 }}
        size="large">
        {props.regionName}
      </Button>
    </Grid>
  );
};

export default IpCheck;
