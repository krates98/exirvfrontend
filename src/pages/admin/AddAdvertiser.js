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
} from "@mui/material";

import { advertiserApi } from "../../api/ApiCalls";

const AddOffers = () => {
  const [advertisers, setAdvertisers] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [drop, setDrop] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const removeError = () =>
    setTimeout(() => {
      setError({
        status: false,
        msg: "",
        type: "",
      });
    }, 3000);

  const apiCall = async () => {
    const res = await advertiserApi.post("/fetch");
    setAdvertisers(res.data.advertisers);
    setLoading(true);
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleChange = (event) => {
    setDrop(event.target.value);
  };

  const advertiserSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      networkname: data.get("networkname"),
      advertisername: data.get("advertisername"),
      networkusername: data.get("networkusername"),
    };
    const res = await advertiserApi
      .post("/add", actualData)
      .catch(function (error) {
        setError({
          status: true,
          msg: "Advertiser name should be unique.",
          type: "error",
        });
      });
    apiCall();
    console.log(res.data);

    if (res.data) {
      setError({
        status: true,
        msg: "Advertiser Added",
        type: "success",
      });
      removeError();
    } else {
      setError({
        status: true,
        msg: "Network name should be unique.",
        type: "error",
      });
    }
  };

  const listItems = advertisers.map((element) => {
    return (
      <MenuItem value={element.advertisername} key={element.advertisername}>
        {element.advertisername}
      </MenuItem>
    );
  });

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ mt: 5 }}
        alignItems="center">
        <Box
          component="form"
          noValidate
          onSubmit={advertiserSubmit}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", maxWidth: 1000 }}>
          <Typography variant="h5" sx={{ ml: 5 }} gutterBottom>
            Add Advertiser
          </Typography>
          <Divider />
          <TextField
            margin="normal"
            required
            id="networkname"
            name="networkname"
            label="Network Name"
            sx={{ ml: 5 }}
          />
          <TextField
            margin="normal"
            required
            id="advertisername"
            name="advertisername"
            label="Advertiser Name"
            sx={{ ml: 5 }}
          />
          <TextField
            margin="normal"
            required
            id="networkusername"
            name="networkusername"
            label="Network Username"
            sx={{ ml: 5 }}
          />
          <Box sx={{ width: "100%", maxWidth: 1000 }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ ml: 5, mt: 5 }}>
              Add Advertiser
            </Button>
          </Box>
          {error.status ? (
            <Alert
              sx={{ mt: 5, ml: 5, width: "50%", maxWidth: 800 }}
              severity={error.type}>
              {error.msg}
            </Alert>
          ) : (
            ""
          )}
        </Box>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ mt: 3 }}
        //   onSubmit={handleSubmit}>
        alignItems="center">
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", maxWidth: 1000, mt: 5 }}>
          <Typography variant="h5" sx={{ ml: 5 }} gutterBottom>
            Delete Advertiser
          </Typography>
          <Divider sx={{ width: "100%" }} />
          {loading ? (
            <>
              <Box sx={{ ml: 5 }}>
                <FormControl sx={{ minWidth: 200, mt: 5 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Advertiser Name
                  </InputLabel>
                  <Select
                    value={drop}
                    onChange={handleChange}
                    autoWidth
                    label="Advertiser Name">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {listItems}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "100%", maxWidth: 1000 }}>
                <Button
                  type="submit"
                  size="large"
                  color="error"
                  variant="contained"
                  sx={{ ml: 5, mt: 5 }}>
                  DELETE ADVERTISER
                </Button>
              </Box>
            </>
          ) : (
            <CircularProgress sx={{ ml: 5, mt: 10 }} color="inherit" />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default AddOffers;
