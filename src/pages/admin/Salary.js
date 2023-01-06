import { React, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  CircularProgress,
  Button,
  Select,
  InputAdornment,
  Input,
  MenuItem,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { adminApi } from "../../api/ApiCalls";

const Salary = () => {
  const [drop, setDrop] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const getUsers = async () => {
    const res = await adminApi.get("/getusers");
    setUsers(res.data);
    setLoading(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (event) => setDrop(event.target.value);

  const onTextChange = (e) => setTextValue(e.target.value);

  const handleSubmit = async (e) => {
    const actualData = {
      name: drop,
      salary: textValue,
    };

    if (textValue.length === 0 || !drop) {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    } else {
      await adminApi.post("/updatesalary", actualData);
      getUsers();
      setTextValue("");
      setError({
        status: true,
        msg: "Salary Updated",
        type: "success",
      });
    }
  };

  const listItems = users.map((element) => {
    return (
      <MenuItem value={element.name} key={element.name}>
        {element.name[0].toUpperCase() + element.name.substring(1)}
      </MenuItem>
    );
  });

  const columns = [
    {
      field: "name",
      headerName: "First name",
      flex: 1,
      minWidth: 500,
    },
    {
      field: "salary",
      headerName: "Salary",
      minWidth: 300,
    },
  ];
  const rows = users;

  return (
    <Grid container justifyContent="center">
      <Grid item sm={10}>
        <Typography sx={{ mt: 4 }} variant="h5">
          UPDATE SALARY
        </Typography>
        <Divider sx={{ mt: 3, mb: 3 }} />
        {loading ? (
          <>
            <Box sx={{ height: 400, width: "100%", mb: 5 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row._id}
              />
            </Box>
            <Box sx={{ mb: 5 }}>
              <FormControl variant="standard" sx={{ mr: 5 }}>
                <InputLabel id="selectLabel">User Name</InputLabel>
                <Select
                  labelId="selectLabel"
                  value={drop}
                  onChange={handleChange}
                  sx={{ width: 200 }}
                  label="User Name">
                  {listItems}
                </Select>
              </FormControl>
              <FormControl sx={{ mr: 5 }} variant="standard">
                <InputLabel htmlFor="amount-label">Amount</InputLabel>
                <Input
                  onChange={onTextChange}
                  value={textValue}
                  type="number"
                  id="amount-label"
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                />
              </FormControl>
              <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
                Submit
              </Button>
              {error.status ? (
                <Alert severity={error.type} sx={{ mt: 3 }}>
                  {error.msg}
                </Alert>
              ) : (
                ""
              )}
            </Box>
          </>
        ) : (
          <CircularProgress sx={{ mt: 20 }} color="secondary" />
        )}
      </Grid>
    </Grid>
  );
};

export default Salary;
