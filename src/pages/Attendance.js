import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { attendanceApi } from "../api/ApiCalls";

const Attendance = (props) => {
  const [savedAttendance, setSavedAttendance] = useState(false);

  useEffect(() => {
    const checkAttendance = async () => {
      const actualData = {
        userid: props.id,
      };
      const att = await attendanceApi.post("/checkattendance", actualData);
      if (Object.keys(att.data.checkDoubleAttendance).length === 0) {
        setSavedAttendance(true);
      } else {
        setSavedAttendance(false);
      }
    };
    checkAttendance();
  }, [props.id]);

  const [drop, setDrop] = useState("");
  const handleChange = (event) => {
    setDrop(event.target.value);
  };
  const markAttendance = async () => {
    const actualData = {
      name: props.name,
      email: props.email,
      userid: props.id,
      reason: drop,
    };

    await attendanceApi.post("/attendance", actualData);
    setSavedAttendance(false);
  };
  return (
    <>
      <Typography variant="h5" color="black">
        Mark Attendance
      </Typography>
      {savedAttendance ? (
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
      ) : (
        <Alert sx={{ mt: 2 }} severity="success">
          Attendance marked for the day.
        </Alert>
      )}
    </>
  );
};

export default Attendance;
