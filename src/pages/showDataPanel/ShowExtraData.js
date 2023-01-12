import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ShowExtraData = (props) => {
  const firstname = props.extraData.firstname;
  const lastname = props.extraData.lastname;
  const city = props.extraData.city;
  const state = props.extraData.state;
  const zip = props.extraData.zip;
  const address = props.extraData.address;
  const phone = props.extraData.phone;
  const gender = props.extraData.gender;
  const email = props.extraData.email;
  const phone1 = phone?.substring(0, 3);
  const phone2 = phone?.substring(3, 6);
  const phone3 = phone?.substring(6, 10);

  return (
    <>
      <Box>
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
      </Box>
    </>
  );
};

export default ShowExtraData;
