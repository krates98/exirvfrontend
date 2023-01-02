import { Grid, Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { adminApi } from "../../api/ApiCalls";
import { DataGrid } from "@mui/x-data-grid";

const DataLeft = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState({});

  useEffect(async () => {
    const res = await adminApi.get("/dataleft");
    setRows(res.data.obj);
    setLoading(true);
  }, []);

  // MUI TABLE

  const columns = [
    { field: "state", headerName: "State", flex: 1 },
    { field: "count", headerName: "Count", flex: 1 },
  ];

  // WORKING DATA LEFT

  if (loading) {
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
            height: 520,
            mb: 10,
          }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            getRowId={(row) => row.id}
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
