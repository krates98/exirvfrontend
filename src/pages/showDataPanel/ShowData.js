import React from "react";
import { useState } from "react";
import ClipboardJS from "clipboard";
import { Box, Typography, Button, Divider, Alert } from "@mui/material";
import { NavLink } from "react-router-dom";
import ShowExtraData from "./ShowExtraData";
import { stateDataApi } from "../../api/ApiCalls";

const ShowData = (props) => {
  const firstname = props.stateData.firstname;
  const lastname = props.stateData.lastname;
  const city = props.stateData.city;
  const state = props.stateData.state;
  const zip = props.stateData.zip;
  const address = props.stateData.address;
  const phone = props.stateData.phone;
  const gender = props.stateData.gender;
  const email = props.stateData.email;
  const phone1 = phone?.substring(0, 3);
  const phone2 = phone?.substring(3, 6);
  const phone3 = phone?.substring(6, 10);

  const [fetchExtra, setFetchExtra] = useState(false);

  const [extraData, setExtraData] = useState({});

  const [extraFetchinData, setExtraFetchinData] = useState(false);

  const fetchExtraData = async () => {
    setFetchExtra((setFetchExtra) => !setFetchExtra);

    const res = await stateDataApi.get(`${state}`);

    if (res.data.user) {
      setExtraFetchinData((current) => !current);
      setExtraData(res.data.user);
    }
  };

  new ClipboardJS(".btn");

  return (
    <>
      <Box sx={{ width: "100%", mt: 5 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Name / Gender:
          <Button
            className="btn"
            data-clipboard-text={firstname}
            sx={{ ml: 5 }}
            size="large"
            variant="contained">
            {firstname}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={lastname}
            sx={{ ml: 2 }}
            size="large"
            variant="contained">
            {lastname}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={gender}
            sx={{ ml: 5 }}
            size="large"
            color="success"
            variant="contained">
            {gender}
          </Button>
        </Typography>

        <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
          Address:
          <Button
            className="btn"
            data-clipboard-text={address}
            sx={{ ml: 5 }}
            size="large"
            variant="contained">
            {address}
          </Button>
        </Typography>

        <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
          City / State / Zip :
          <Button
            className="btn"
            data-clipboard-text={city}
            sx={{ ml: 5 }}
            size="large"
            variant="contained">
            {city}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={state}
            sx={{ ml: 2 }}
            size="large"
            color="secondary"
            variant="contained">
            {state}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={zip}
            sx={{ ml: 2 }}
            size="large"
            color="success"
            variant="contained">
            {zip}
          </Button>
        </Typography>
        <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
          Phone:
          <Button
            className="btn"
            data-clipboard-text={phone}
            sx={{ ml: 5 }}
            size="large"
            color="success"
            variant="contained">
            {phone}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={phone1}
            sx={{ ml: 2 }}
            size="large"
            variant="contained">
            {phone1}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={phone2}
            sx={{ ml: 2 }}
            size="large"
            variant="contained">
            {phone2}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={phone3}
            sx={{ ml: 2 }}
            size="large"
            variant="contained">
            {phone3}
          </Button>
        </Typography>

        <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
          Email:
          <Button
            className="btn"
            data-clipboard-text={email}
            sx={{ ml: 5 }}
            size="large"
            variant="contained">
            {email}
          </Button>
        </Typography>

        {!fetchExtra ? (
          <Button
            onClick={fetchExtraData}
            size="large"
            variant="contained"
            sx={{ mt: 5, ml: 16.5 }}
            color="warning">
            FETCH EXTRA DATA
          </Button>
        ) : extraFetchinData ? (
          <Box>
            <Divider sx={{ mt: 5 }} />
            <ShowExtraData extraData={extraData} />
          </Box>
        ) : (
          <Alert sx={{ mt: 5 }} severity="error">
            Extra Data Not Found
          </Alert>
        )}
      </Box>
      <Button
        component={NavLink}
        to="/login"
        size="large"
        variant="contained"
        sx={{ mt: 5, ml: 20, mb: 5 }}
        color="error">
        START OVER
      </Button>
    </>
  );
};

export default ShowData;
