import React from "react";
import { useState } from "react";
import { Grid } from "@mui/material";

import ShowData from "./ShowData";
import IpCheck from "./IpCheck";
import { stateDataApi } from "../../api/ApiCalls";

const CheckIp = (props) => {
  const [toggleData, setToggleData] = useState(false);

  const [stateData, setStateData] = useState({});

  const [fetchinData, setFetchinData] = useState(true);

  const fetchData = async () => {
    const res = await stateDataApi.get(`${props.ipData.region}`);
    setStateData(res.data.user);

    if (res.data.user) {
      setToggleData((setToggleData) => !setToggleData);
    } else {
      setFetchinData((setFetchinData) => !setFetchinData);
    }
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
  ) : (
    <Grid>
      <ShowData stateData={stateData} />
    </Grid>
  );
};

export default CheckIp;
