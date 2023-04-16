import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Alert,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { userIp, hitIps } from "../../api/ApiCalls.js";

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

  //Conversion Tracking
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (count) {
      setLoader(true);
    }
  }, [count]);

  useEffect(() => {
    const totalConversions = async () => {
      const res = await hitIps.post();

      setCount(res.data);
    };

    totalConversions();
  }, []);

  return (
    <Grid alignItems="center" justifyContent="center">
      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5" color="black">
          Welcome {props.userData.name}
        </Typography>
      </Box>

      {IpTest ? (
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={checkForIp}
            sx={{ mt: 3 }}
          >
            CHECK IP
          </Button>
        </Box>
      ) : !ipAlert ? (
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={props.checkIp}
            sx={{ height: 40, mx: 12, mt: 3 }}
          >
            CONTINUE
          </Button>
        </Box>
      ) : (
        <>
          <Alert sx={{ mt: 5 }} severity="error">
            IP Already Used {props.ip}
          </Alert>
          <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button
              component={NavLink}
              to="/login"
              size="large"
              variant="contained"
              sx={{ mt: 3 }}
              color="error"
            >
              START OVER
            </Button>
          </Box>
        </>
      )}
      <Divider sx={{ mt: 5 }} />
      <Box
        m={1}
        display="flex"
        sx={{ mt: 2 }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" color="black">
          Total Hits: {loader ? count : <CircularProgress size={20} />}
        </Typography>
      </Box>
    </Grid>
  );
};

export default Welcome;
