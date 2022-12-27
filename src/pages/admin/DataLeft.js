import { Grid, Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { adminApi } from "../../api/ApiCalls";
import { DataGrid } from "@mui/x-data-grid";

const DataLeft = () => {
  const [loading, setLoading] = useState(false);
  const [dataLeft, setDataLeft] = useState({});

  useEffect(async () => {
    const res = await adminApi.get("/dataleft");
    setDataLeft(res.data);
    setLoading(true);
  }, []);

  // MUI TABLE

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "count", headerName: "Count", flex: 1 },
  ];

  // WORKING DATA LEFT

  if (loading) {
    const rows = dataLeft.obj;

    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ mt: 1 }}
        alignItems="center">
        <Box
          sx={{
            width: "75%",
            height: 1000,
            mb: 10,
          }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={52}
            rowsPerPageOptions={[52]}
          />
        </Box>
      </Grid>
    );
  } else {
    return (
      <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          sx={{ mt: 1 }}
          alignItems="center"
          style={{ minHeight: "90vh" }}>
          <CircularProgress color="inherit" />
        </Grid>
      </>
    );
  }
};

export default DataLeft;
