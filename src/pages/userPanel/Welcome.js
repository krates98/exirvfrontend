import React from "react";
import { useState } from "react";
import { Button, Grid, Typography, Alert } from "@mui/material";
import { NavLink } from "react-router-dom";
import { userIp } from "../../api/ApiCalls.js";

const Welcome = (props) => {
  const [IpTest, setIpTest] = useState(true);

  const [ipAlert, setIpAlert] = useState(true);

  const checkForIp = async () => {
    const res = await userIp.get(`${props.ip}`);
    setIpTest((current) => !current);
    if (res.data.isIpUsed === null) {
      setIpAlert((current) => !current);
    }
  };

  return (
    <Grid item xs={12} sx={{ backgroundColor: "#white", p: 2, color: "white" }}>
      <Typography variant="h5" color="black">
        Welcome {props.userData.name}
      </Typography>
      {IpTest ? (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={checkForIp}
          sx={{ height: 40, mx: 12, mt: 3 }}>
          CHECK IP
        </Button>
      ) : !ipAlert ? (
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={props.checkIp}
          sx={{ height: 40, mx: 12, mt: 3 }}>
          CONTINUE
        </Button>
      ) : (
        <>
          <Alert sx={{ mt: 5 }} severity="error">
            IP Already Used
          </Alert>
          <Button
            component={NavLink}
            to="/login"
            size="large"
            variant="contained"
            sx={{ mt: 3, ml: 10 }}
            color="error">
            START OVER
          </Button>
        </>
      )}
    </Grid>
  );
};

export default Welcome;
