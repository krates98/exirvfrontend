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

  const daysThisMonth = moment().daysInMonth();
  // const daysd = moment().utc().add(5, "hours").add(30, "m").format("DD");
  const curm = moment().utc().add(5, "hours").add(30, "m").format("MM");
  const durm = moment().utc().add(5, "hours").add(30, "m").format("YYYY");

  let structuring;
  const arr = [];

  for (let i = 1; i <= daysThisMonth; i++) {
    if (i < 10) {
      arr.push(`0${i}/${curm}/${durm}`);
    } else {
      arr.push(`${i}/${curm}/${durm}`);
    }
  }

  // if (loading) {
  //   structuring = attendance.map((element) => {
  //     return (
  //       <>
  //         <Typography
  //           sx={{ mt: 5 }}
  //           variant="button"
  //           display="block"
  //           key={element.name}>
  //           {element.name}
  //         </Typography>
  //         {element.attendance.map((dates) => {
  //           return (
  //             <Button sx={{ mr: 3, mt: 1 }} key={element._id}>
  //               {dates.date}
  //             </Button>
  //           );
  //         })}
  //       </>
  //     );
  //   });
  // }

  if (loading) {
    structuring = attendance.map((element) => {
      return (
        <>
          <Typography variant="h5" sx={{ mt: 5 }} key={element.name}>
            {element.name[0].toUpperCase() + element.name.substring(1)}
          </Typography>
          {arr.map((dates) => {
            return (
              <>
                {element.attendance.map((checkDate) => {
                  return dates === checkDate.date ? (
                    <Button
                      color="success"
                      variant="contained"
                      sx={{ mr: 3, mt: 3 }}
                      key={element._id}>
                      {checkDate.date}
                    </Button>
                  ) : (
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ mr: 3, mt: 3 }}
                      key={dates}>
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
          <CircularProgress color="secondary" />
        </Grid>
      )}
    </>
  );
};

export default AttendanceCMonth;
