import { useState, useEffect } from "react";
import { Typography, Grid, Button, CircularProgress } from "@mui/material";

import moment from "moment";

import { adminApi } from "../../api/ApiCalls";

const AttendanceCMonth = () => {
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([{}]);

  useEffect(() => {
    const getCMattendance = async () => {
      const att = await adminApi.get("/attendancemonth");
      setAttendance(att.data);
      setLoading(true);
    };
    getCMattendance();
  }, []);

  const daysd = moment().utc().add(5, "hours").add(30, "m").format("DD");
  const curm = moment().utc().add(5, "hours").add(30, "m").format("MM");
  const durm = moment().utc().add(5, "hours").add(30, "m").format("YYYY");

  let structuring;
  const arr = [];

  for (let i = 1; i <= daysd; i++) {
    if (i < 10) {
      arr.push(`0${i}/${curm}/${durm}`);
    } else {
      arr.push(`${i}/${curm}/${durm}`);
    }
  }

  if (loading) {
    structuring = attendance.map((element) => {
      return (
        <>
          <Typography
            variant="button"
            display="block"
            color="secondary"
            sx={{ mt: 3 }}
            key={element.name}>
            {/* {element.name[0].toUpperCase() + element.name.substring(1)} */}
            {element.name}
          </Typography>
          {arr.map((dates) => {
            return (
              <>
                {element.attendance.map((checkDate) => {
                  console.log(checkDate.date);
                  return dates === checkDate.date ? (
                    <Button
                      color="success"
                      variant="contained"
                      sx={{ mr: 3, mt: 3 }}
                      key={element._id + element.name}>
                      {checkDate.date}
                    </Button>
                  ) : (
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ mr: 3, mt: 3 }}
                      key={dates + element.name}>
                      {dates}
                    </Button>
                  );
                })}
              </>
            );
          })}
        </>
      );
    });
  }

  return (
    <>
      {loading ? (
        <Grid container justifyContent="center">
          <Grid item sm={10}>
            <h1>Attendance For This Month</h1>
            <div>{structuring}</div>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <CircularProgress sx={{ mt: 20 }} color="secondary" />
        </Grid>
      )}
    </>
  );
};

export default AttendanceCMonth;
