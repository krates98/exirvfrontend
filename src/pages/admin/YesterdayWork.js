import { Grid, Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { adminApi } from "../../api/ApiCalls";
import { DataGrid } from "@mui/x-data-grid";

const YesterdayWork = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState({});
  //   const [workers, setWorkers] = useState({});

  useEffect(() => {
    const getYesterdayWork = async () => {
      const res = await adminApi.get("/yesterdaywork");
      setRows(res.data.yesterdayWork);

      setLoading(true);
    };
    getYesterdayWork();
  }, []);

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "ipaddress", headerName: "IP", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
  ];

  return (
    <>
      {loading ? (
        <Grid
          container
          direction="row"
          justifyContent="center"
          sx={{ mt: 1 }}
          alignItems="center">
          <Box
            sx={{
              height: 520,
              width: "75%",
              mt: 2,
              mb: 10,
            }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row._id}
            />
          </Box>
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          sx={{ mt: 1 }}
          alignItems="center"
          style={{ minHeight: "90vh" }}>
          <CircularProgress color="inherit" />
        </Grid>
      )}
    </>
  );
};

export default YesterdayWork;
