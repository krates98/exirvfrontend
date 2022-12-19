import React from "react";

import { Button, Grid, Typography } from "@mui/material";

const Welcome = (props) => {
  return (
    <Grid item xs={12} sx={{ backgroundColor: "#white", p: 2, color: "white" }}>
      <Typography variant="h5" color="black">
        Welcome {props.userData.name}
      </Typography>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={props.checkIp}
        sx={{ height: 40, mx: 12, mt: 3 }}>
        CHECK IP
      </Button>
    </Grid>
  );
};

export default Welcome;
