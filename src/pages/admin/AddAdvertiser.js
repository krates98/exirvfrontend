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

import { DataGrid } from "@mui/x-data-grid";

import { advertiserApi } from "../../api/ApiCalls";

const AddAdvert = () => {
  const [advertisers, setAdvertisers] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [drop, setDrop] = useState("");
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

  const { vertical, horizontal, open } = opened;

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
      paymentinfo: data.get("paymentinfo"),
    };

    if (
      actualData.networkname &&
      actualData.advertisername &&
      actualData.networkusername &&
      actualData.paymentinfo !== null
    ) {
      const res = await advertiserApi.post("/add", actualData);

      apiCall();
      if (res.data.addAdvertiser) {
        setError({
          status: true,
          msg: "Advertiser Added",
          type: "success",
        });
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      } else {
        setError({
          status: true,
          msg: "Advertiser name should be unique.",
          type: "error",
        });
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      }
    } else {
      setError({
        status: true,
        msg: "All fields should be filled",
        type: "warning",
      });
      handleClick({
        vertical: "top",
        horizontal: "center",
      });
    }
    e.target.reset();
  };

  const deleteSubmit = async (e) => {
    e.preventDefault();
    const actualData = {
      advertisername: drop,
    };

    setDrop("");

    const res = await advertiserApi.post("/delete", actualData);

    apiCall();
    if (res.data.deleteAdvertiser) {
      setError({
        status: true,
        msg: "Advertiser Deleted",
        type: "error",
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
  };

  const handleClick = (positionState) => {
    setOpen({ open: true, ...positionState });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ ...opened, open: false });
  };

  const listItems = advertisers.map((element) => {
    return (
      <MenuItem value={element.advertisername} key={element.advertisername}>
        {element.advertisername}
      </MenuItem>
    );
  });

  //MUI TABLE

  const columns = [
    { field: "networkname", headerName: "Network Name", flex: 1 },
    { field: "advertisername", headerName: "Advertiser Name", flex: 1 },
    { field: "username", headerName: "Network User Name", flex: 1 },
    { field: "paymentinfo", headerName: "Payment Information", flex: 1 },
  ];

  const rows = advertisers;

  return (
    <>
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
            required={true}
            id="advertisername"
            name="advertisername"
            label="Advertiser Name"
            inputProps={{ min: 0, max: 10 }}
            sx={{ ml: 5 }}
          />
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
            id="networkusername"
            name="networkusername"
            label="Network Username"
            sx={{ ml: 5 }}
          />

          <TextField
            margin="normal"
            required
            id="paymentinfo"
            name="paymentinfo"
            label="Payment Information"
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
        </Box>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ mt: 3 }}
        alignItems="center">
        <Box sx={{ width: "100%", maxWidth: 1000, mt: 5 }}>
          <Typography variant="h5" sx={{ ml: 5 }} gutterBottom>
            Delete Advertiser
          </Typography>
          <Divider sx={{ width: "100%" }} />

          {loading ? (
            <>
              <Box sx={{ ml: 5 }} onSubmit={deleteSubmit}>
                <form>
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
                        <b>None</b>
                      </MenuItem>
                      {listItems}
                    </Select>

                    <Button
                      type="submit"
                      size="large"
                      color="error"
                      variant="contained"
                      sx={{ mt: 5, mb: 10 }}>
                      DELETE ADVERTISER
                    </Button>
                  </FormControl>
                </form>
              </Box>
              <Box sx={{ width: "100%", maxWidth: 1000, mb: 3, ml: 5 }}>
                <Typography variant="h5" gutterBottom>
                  Advertiser Info
                </Typography>
                <Divider sx={{ width: "100%", mb: 5 }} />
                <Box
                  sx={{
                    width: "100%",
                    height: 520,
                    mb: 10,
                  }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    getRowId={(row) => row._id}
                    rowsPerPageOptions={[5, 10, 20]}
                  />
                </Box>
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

export default AddAdvert;
