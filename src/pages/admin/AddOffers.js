import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Divider,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Alert,
  Snackbar,
} from "@mui/material";

import { adminApi } from "../../api/ApiCalls";

import { advertiserApi } from "../../api/ApiCalls";

const AddOffers = () => {
  const [advertisers, setAdvertisers] = useState([{}]);
  const [offers, setOffers] = useState([]);
  const [worker, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offerNameField, setOfferNameField] = useState("");
  const [offerUrlField, setOfferUrlField] = useState("");
  const [advertiserNameDrop, setAdvertiserNameDrop] = useState("");
  const [offerDrop, setOfferDrop] = useState("");
  const [workerDrop, setWorkerDrop] = useState("");

  const handleChange = (event) => {
    setAdvertiserNameDrop(event.target.value);
  };

  const handleOfferChange = (event) => {
    setOfferDrop(event.target.value);
  };

  const handleWorkerChange = (event) => {
    setWorkerDrop(event.target.value);
  };

  const apiCall = async () => {
    const res = await advertiserApi.post("/fetch");
    setAdvertisers(res.data.advertisers);
    const fetchOffer = await advertiserApi.post("/fetchoffer");
    setOffers(fetchOffer.data.offers);
    const fetchUsers = await adminApi.get("/getusers");
    setWorkers(fetchUsers.data);
    setLoading(true);
  };

  const offerSubmit = async (e) => {
    e.preventDefault();
    const actualData = {
      offername: offerNameField,
      advertiser: advertiserNameDrop,
    };
    await advertiserApi.post("/addoffer", actualData);

    apiCall();
    setOfferNameField("");
  };

  const attachUserSubmit = async (e) => {
    e.preventDefault();

    const actualData = {
      offername: offerDrop,
      offerurl: offerUrlField,
      worker: workerDrop,
    };

    await advertiserApi.post("/attachuser", actualData);

    apiCall();
    setOfferUrlField("");
  };

  useEffect(() => {
    apiCall();
  }, []);

  const listAdvertisers = advertisers.map((element) => {
    return (
      <MenuItem value={element || ""} key={element.advertisername}>
        {element.advertisername}
      </MenuItem>
    );
  });

  const listOffers = offers.map((element) => {
    return (
      <MenuItem value={element || ""} key={element.offername}>
        {element.offername}
      </MenuItem>
    );
  });

  const listUsers = worker.map((element) => {
    return (
      <MenuItem value={element || ""} key={element.name}>
        {element.name}
      </MenuItem>
    );
  });

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ mt: 5 }}
      alignItems="center">
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", maxWidth: 1000 }}>
        <Typography variant="h5" sx={{ ml: 5 }} gutterBottom>
          Add Offer
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          required={true}
          id="offername"
          name="offername"
          label="Offer Name"
          value={offerNameField}
          onChange={(e) => setOfferNameField(e.target.value)}
          inputProps={{ min: 0, max: 10 }}
          sx={{ ml: 5 }}
        />
        {loading ? (
          <>
            <FormControl sx={{ minWidth: 200, ml: 5 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Advertiser Name
              </InputLabel>
              <Select
                value={advertiserNameDrop}
                onChange={handleChange}
                autoWidth
                label="Advertiser Name">
                <MenuItem value="">
                  <b>None</b>
                </MenuItem>
                {listAdvertisers}
              </Select>
            </FormControl>
            <Button
              type="submit"
              size="large"
              variant="contained"
              onClick={offerSubmit}
              sx={{ ml: 5, mt: 1 }}>
              Add Offer
            </Button>
          </>
        ) : (
          <CircularProgress sx={{ ml: 5, mt: 2 }} color="inherit" />
        )}
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", maxWidth: 1000 }}>
          <Typography variant="h5" sx={{ ml: 5, mt: 5 }} gutterBottom>
            Assign Users To Offers
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {loading ? (
            <Box>
              <FormControl sx={{ minWidth: 200, ml: 5 }}>
                <InputLabel>Offer Name</InputLabel>
                <Select
                  value={offerDrop}
                  onChange={handleOfferChange}
                  autoWidth
                  label="Advertiser Name">
                  <MenuItem value="">
                    <b>None</b>
                  </MenuItem>
                  {listOffers}
                </Select>
              </FormControl>
              <TextField
                required={true}
                id="offerurl"
                name="offerurl"
                label="Offer Url"
                value={offerUrlField}
                onChange={(e) => setOfferUrlField(e.target.value)}
                inputProps={{ min: 0, max: 10 }}
                sx={{ ml: 5 }}
              />
              <FormControl sx={{ minWidth: 200, ml: 5 }}>
                <InputLabel>Worker Name</InputLabel>
                <Select
                  value={workerDrop}
                  onChange={handleWorkerChange}
                  autoWidth
                  label="Worker Name">
                  <MenuItem value="">
                    <b>None</b>
                  </MenuItem>
                  {listUsers}
                </Select>
              </FormControl>
              <Button
                type="submit"
                size="large"
                variant="contained"
                onClick={attachUserSubmit}
                sx={{ ml: 5, mt: 1 }}>
                Attach User
              </Button>
            </Box>
          ) : (
            <CircularProgress sx={{ ml: 5, mt: 2 }} color="inherit" />
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default AddOffers;
