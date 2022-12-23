import { Grid } from "@mui/material";
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

  // WORKING DATA LEFT

  if (loading) {
    return dataLeft.obj.map((data) => {
      return (
        <ul type="disc">
          <li
            style={{
              fontWeight: "bold",
              color: "red",
            }}>
            {data.state}
          </li>
          <li>{data.count}</li>
        </ul>
      );
    });
  } else {
    return (
      <>
        <Grid>Loading</Grid>
      </>
    );
  }
};

export default DataLeft;
