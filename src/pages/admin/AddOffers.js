import React, { useState, useEffect } from "react";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";

import _ from "lodash";

import {
  IconButton,
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
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Collapse,
  Snackbar,
  Alert,
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
  const [listOpen, setListOpen] = useState(null);

  //Snackbar & Error Handling
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "success",
  });

  const [opened, setOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ ...opened, open: false });
  };

  const { vertical, horizontal, open } = opened;

  const handleClick = (positionState) => {
    setOpen({ open: true, ...positionState });
  };

  // On Page Load Api Calls

  const apiCall = async () => {
    const res = await advertiserApi.post("/fetch");
    setAdvertisers(res.data.advertisers);
    const fetchOffer = await advertiserApi.post("/fetchoffer");
    setOffers(fetchOffer.data.offers);
    const fetchUsers = await adminApi.get("/getusers");
    setWorkers(fetchUsers.data);
    setLoading(true);
  };

  useEffect(() => {
    apiCall();
  }, []);

  // Toggle Offer On & Off

  const handleToggle = (id, toggle) => async (event) => {
    event.stopPropagation();
    const actualData = {
      id: id,
      toggle: toggle,
    };
    const res = await advertiserApi.post("/toggleoffer", actualData);
    if (res) {
      setError({
        status: true,
        msg: "Toggled Offer",
        type: "success",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    } else {
      setError({
        status: false,
        msg: "Something Went Wrong",
        type: "error",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    }
    apiCall();
  };

  // Delete Offer

  const handleDelete = (id) => async () => {
    const identity = {
      id: id,
    };

    const res = await advertiserApi.post("/deleteoffer", identity);
    if (res) {
      setError({
        status: true,
        msg: "Offer Deleted",
        type: "success",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    } else {
      setError({
        status: false,
        msg: "Something Went Wrong",
        type: "error",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    }
    apiCall();
  };

  // Delete User Inside Offer

  const handleInsideDelete = (id, identity) => async () => {
    const actualData = {
      id: id,
      identity: identity,
    };

    const res = await advertiserApi.post("/deleteinsideoffer", actualData);
    if (res) {
      setError({
        status: true,
        msg: "Deleted User From Offer",
        type: "success",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    } else {
      setError({
        status: false,
        msg: "Something Went Wrong",
        type: "error",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    }
    apiCall();
  };

  //DropDown Values

  const handleChange = (event) => {
    setAdvertiserNameDrop(event.target.value);
  };

  const handleOfferChange = (event) => {
    setOfferDrop(event.target.value);
  };

  const handleWorkerChange = (event) => {
    setWorkerDrop(event.target.value);
  };

  // Offer Submission

  const offerSubmit = async (e) => {
    e.preventDefault();
    if (offerNameField !== "" && advertiserNameDrop !== "") {
      const actualData = {
        offername: offerNameField,
        advertiser: advertiserNameDrop,
      };
      const res = await advertiserApi.post("/addoffer", actualData);
      if (res) {
        setError({
          status: true,
          msg: "Offer Added",
          type: "success",
        });
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      } else {
        setError({
          status: false,
          msg: "Something Went Wrong",
          type: "error",
        });
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      }
      setOfferNameField("");
      setAdvertiserNameDrop("");
    } else {
      setError({
        status: false,
        msg: "All Fields Are Required",
        type: "warning",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    }

    apiCall();
  };

  // Attaching User To Offer

  const attachUserSubmit = async (e) => {
    e.preventDefault();

    if (offerDrop !== "" && offerUrlField !== "" && workerDrop !== "") {
      const actualData = {
        offername: offerDrop,
        offerurl: offerUrlField,
        worker: workerDrop,
      };

      const res = await advertiserApi.post("/attachuser", actualData);
      if (res) {
        setError({
          status: true,
          msg: "Attached User To Offer",
          type: "success",
        });
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      } else {
        setError({
          status: false,
          msg: "Something Went Wrong",
          type: "error",
        });
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      }
      setOfferUrlField("");
      setWorkerDrop("");
      setOfferDrop("");
    } else {
      setError({
        status: false,
        msg: "All Fields Are Required",
        type: "warning",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    }

    apiCall();
  };

  // Click on offer list to expand & close

  const listClick = (itemId) => {
    setListOpen(itemId === listOpen ? null : itemId);
  };

  // Mapped Items in a List

  const listAdvertisers = advertisers.map((element) => {
    return (
      <MenuItem value={element._id} key={element._id}>
        {element.advertisername}
      </MenuItem>
    );
  });

  const listOffers = offers.map((element) => {
    return (
      <MenuItem key={element._id} value={element._id}>
        {element.offername}
      </MenuItem>
    );
  });

  const listUsers = worker.map((element) => {
    return (
      <MenuItem key={element._id} value={element._id}>
        {element.name}
      </MenuItem>
    );
  });

  const showOffers = offers.map((element) => {
    return (
      <List key={element._id}>
        <ListItemButton onClick={() => listClick(element._id)}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>

          <ListItemText
            primary={
              element.offername +
              " - (" +
              element.advertiser.advertisername +
              ") - " +
              element.advertiser.networkname
            }
          />
          <IconButton
            edge="start"
            aria-label="delete"
            onClick={handleDelete(element._id)}>
            <DeleteIcon />
          </IconButton>

          <Switch
            edge="end"
            onClick={handleToggle(element._id, element.toggle)}
            checked={element.toggle}
          />

          {element._id === listOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={element._id === listOpen} timeout="auto" unmountOnExit>
          {element.attachuser.map((child) => (
            <List key={child._id} component="div" disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={child.offerurl}
                  secondary={child.username}
                  primaryTypographyProps={{
                    variant: "subtitle2",
                    style: {
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
                <IconButton
                  edge="start"
                  aria-label="delete"
                  onClick={handleInsideDelete(element._id, child._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
            </List>
          ))}
        </Collapse>
      </List>
    );
  });

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ mt: 5 }}
      alignItems="center">
      <div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}>
          <Alert sx={{ mt: 7, ml: 5, width: "100%" }} severity={error.type}>
            {error.msg}
          </Alert>
        </Snackbar>
      </div>
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
            <Grid>
              <Box>
                <FormControl sx={{ minWidth: 200, ml: 5 }}>
                  <InputLabel>Offer Name</InputLabel>
                  <Select
                    value={offerDrop}
                    onChange={handleOfferChange}
                    autoWidth
                    label="Advertiser Name">
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
              <Box
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", maxWidth: 1000 }}>
                <Typography variant="h5" sx={{ ml: 5, mt: 5 }} gutterBottom>
                  Check Offers
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 800,
                    bgcolor: "background.paper",
                    ml: 5,
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader">
                  {showOffers}
                </List>
              </Box>
            </Grid>
          ) : (
            <CircularProgress sx={{ ml: 5, mt: 2 }} color="inherit" />
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default AddOffers;
