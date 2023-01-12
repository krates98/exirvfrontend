import { Grid, Button, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={10}>
          <Typography sx={{ mt: 2 }} variant="h4" color="primary" gutterBottom>
            Admin Panel
          </Typography>

          <hr />
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography
                  sx={{ mt: 0.5 }}
                  variant="h6"
                  color="primary"
                  gutterBottom>
                  USER WORK :
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/todaywork"
                  className="btn"
                  size="large"
                  variant="contained">
                  Today Work
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/yesterdayWork"
                  className="btn"
                  size="large"
                  color="secondary"
                  variant="contained">
                  Yesterday Work
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography
                  sx={{ mt: 0.5 }}
                  variant="h6"
                  color="primary"
                  gutterBottom>
                  DATA :
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/dataleft"
                  className="btn"
                  size="large"
                  variant="contained">
                  Data Left
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/uploaddata"
                  className="btn"
                  size="large"
                  color="secondary"
                  variant="contained">
                  UPLOAD DATA
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography
                  sx={{ mt: 0.5 }}
                  variant="h6"
                  color="primary"
                  gutterBottom>
                  ATTENDANCE :
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/attendancemonth"
                  className="btn"
                  size="large"
                  variant="contained">
                  Attendance
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/attendancelmonth"
                  className="btn"
                  size="large"
                  color="secondary"
                  variant="contained">
                  L/M Attendance
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                  SALARY :
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/salary"
                  className="btn"
                  size="large"
                  variant="contained">
                  Salary
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/generatesalary"
                  className="btn"
                  size="large"
                  color="secondary"
                  variant="contained">
                  Generate Salary
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/lastmonthsalary"
                  className="btn"
                  size="large"
                  color="success"
                  variant="contained">
                  L/M Salary
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                  OFFERS :
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/addoffers"
                  className="btn"
                  size="large"
                  variant="contained">
                  Add Offers
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={NavLink}
                  to="/admin/addadvertiser"
                  className="btn"
                  size="large"
                  color="secondary"
                  variant="contained">
                  Add Advertiser
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6" color="primary" gutterBottom>
                  HITLIST :
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button className="btn" size="large" variant="contained">
                  Check Hitlist
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  className="btn"
                  color="secondary"
                  size="large"
                  variant="contained">
                  Old Hitlist
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
