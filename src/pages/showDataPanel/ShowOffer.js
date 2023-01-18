import React, { useEffect, useState, useCallback } from "react";

import {
  Grid,
  Snackbar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";

import { advertiserApi } from "../../api/ApiCalls";

const ShowOffer = (props) => {
  const [loading, setLoading] = useState(false);
  const [offerArray, setOfferArray] = useState([]);
  const [open, setOpen] = useState(false);

  const id = props.id;

  const apiCall = useCallback(async () => {
    const res = await advertiserApi.get("/fetchOffer/" + id);
    setOfferArray(res.data);
    setLoading(true);
  }, [id]);

  useEffect(() => {
    apiCall();
    return () => {
      //cancel any ongoing subscriptions or async tasks
    };
  }, [apiCall, id]);

  const handleClick = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const showOffer = offerArray.map((element, index) => {
    return (
      <ListItem key={element.attachuser._id} disablePadding>
        <ListItemButton
          onClick={() => handleClick(element.attachuser.offerurl)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={`OFFER ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Grid>
      {loading ? (
        <>
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}>
            <List>{showOffer}</List>
            <Snackbar
              open={open}
              onClose={() => setOpen(false)}
              autoHideDuration={200}
              message="Copied to clipboard"
            />
          </Box>
        </>
      ) : (
        <>
          <CircularProgress sx={{ ml: 5, mt: 2 }} color="inherit" />
        </>
      )}
    </Grid>
  );
};

export default ShowOffer;
