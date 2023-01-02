import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { attendanceApi } from "../api/ApiCalls";

const Attendance = (props) => {
  const [drop, setDrop] = useState("");
  const handleChange = (event) => {
    setDrop(event.target.value);
  };
  const markAttendance = async () => {
    const actualData = {
      //   name: props.name,
      //   id: props._id,
      //   reason: drop,
    };

    const att = await attendanceApi.post("", actualData);
    console.log(att);
  };
  return (
    <>
      <Typography variant="h5" color="black">
        Mark Attendance
      </Typography>

      <FormControl sx={{ mt: 2 }} variant="filled">
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={drop}
          label="Age"
          onChange={handleChange}>
          <MenuItem value="FullDay">Full Day</MenuItem>
          <MenuItem value="HalfDay">Half Day</MenuItem>
          <MenuItem value="WeekOff">Week Off</MenuItem>
          <MenuItem value="Holiday">Holiday</MenuItem>
          <MenuItem value="Overtime">Overtime</MenuItem>
        </Select>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={markAttendance}
            sx={{ mt: 3 }}>
            Mark Attendance For Today
          </Button>
        </Box>
      </FormControl>
    </>
  );
};

export default Attendance;
