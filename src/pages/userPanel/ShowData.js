import React from "react";
import ClipboardJS from "clipboard";
import { Box, Typography, Button } from "@mui/material";

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

  new ClipboardJS(".btn");

  return (
    <>
      <Box sx={{ width: "100%" }}>
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
            color="error"
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
          {/* <Button
            className="btn"
            data-clipboard-text={phone.substring(0, 3)}
            sx={{ ml: 2 }}
            size="large"
            variant="contained">
            {phone.substring(0, 3)}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={phone.substring(3, 6)}
            sx={{ ml: 2 }}
            size="large"
            variant="contained">
            {phone.substring(3, 6)}
          </Button>
          <Button
            className="btn"
            data-clipboard-text={phone.substring(6, 10)}
            sx={{ ml: 2 }}
            size="large"
            variant="contained">
            {phone.substring(6, 10)}
          </Button> */}
        </Typography>
      </Box>

      <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
        Address:
        <Button
          className="btn"
          data-clipboard-text={email}
          sx={{ ml: 5 }}
          size="large"
          variant="contained">
          {email}
        </Button>
      </Typography>
    </>
  );
};

export default ShowData;
