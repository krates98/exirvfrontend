import React from "react";
import { useState } from "react";
import { Grid, Alert, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ShowData from "./ShowData";
import IpCheck from "./IpCheck";
import { stateDataApi, userIp } from "../../api/ApiCalls";

import { useSelector } from "react-redux";

const CheckIp = (props) => {
  const [toggleData, setToggleData] = useState(false);

  const [stateData, setStateData] = useState({});

  const [fetchinData, setFetchinData] = useState(false);

  const myData = useSelector((state) => state.user);

  const fetchData = async () => {
    const res = await stateDataApi
      .get(`${props.ipData.region}`)
      .catch(function (error) {
        console.log(error);
      });

    if (res.data.user) {
      setFetchinData((current) => !current);

      // Add Ip If Data Fetched & Available
      await userIp.post(`/${props.ip}/${myData.name}`);

      setStateData(res.data.user);
    }

    setToggleData((current) => !current);
  };

  return !toggleData ? (
    <IpCheck
      fetchinData={fetchinData}
      fetchData={fetchData}
      ip={props.ip}
      region={props.ipData.region}
      city={props.ipData.city}
      country={props.ipData.country}
      regionName={props.ipData.regionName}
    />
  ) : fetchinData ? (
    <Grid>
      <ShowData stateData={stateData} />
    </Grid>
  ) : (
    <>
      <Alert sx={{ mt: 5 }} severity="error">
        Data Not Found
      </Alert>
      <Button
        component={NavLink}
        to="/login"
        size="large"
        variant="contained"
        sx={{ mt: 3, ml: 0 }}
        color="error">
        START OVER
      </Button>
    </>
  );
};

export default CheckIp;
