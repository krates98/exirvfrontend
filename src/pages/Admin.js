import { Grid, Button, Typography } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={10}>
          <h1>Admin Panel</h1>
          <hr />
          <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
            USER WORK :
            <Button
              className="btn"
              sx={{ ml: 5 }}
              size="large"
              variant="contained">
              Today Work
            </Button>
            <Button
              className="btn"
              sx={{ ml: 2 }}
              size="large"
              color="secondary"
              variant="contained">
              Yesterday Work
            </Button>
            <Button
              className="btn"
              sx={{ ml: 2 }}
              size="large"
              color="success"
              variant="contained">
              Individual Work
            </Button>
          </Typography>
          <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
            DATA :
            <Button
              component={NavLink}
              to="/admin/dataleft"
              className="btn"
              sx={{ ml: 5 }}
              size="large"
              variant="contained">
              Data Left
            </Button>
            <Button
              className="btn"
              sx={{ ml: 2 }}
              size="large"
              color="secondary"
              variant="contained">
              UPLOAD DATA
            </Button>
          </Typography>
          <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
            ATTENDANCE :
            <Button
              className="btn"
              sx={{ ml: 5 }}
              size="large"
              variant="contained">
              Attendance
            </Button>
            <Button
              className="btn"
              sx={{ ml: 2 }}
              size="large"
              color="secondary"
              variant="contained">
              Last Month Attendance
            </Button>
          </Typography>
          <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
            SALARY :
            <Button
              className="btn"
              sx={{ ml: 5 }}
              size="large"
              variant="contained">
              Salary
            </Button>
            <Button
              className="btn"
              sx={{ ml: 2 }}
              size="large"
              color="secondary"
              variant="contained">
              Generate Salary
            </Button>
            <Button
              className="btn"
              sx={{ ml: 2 }}
              size="large"
              color="success"
              variant="contained">
              Last Month Salary
            </Button>
          </Typography>
          <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
            OFFERS :
            <Button
              className="btn"
              sx={{ ml: 5 }}
              size="large"
              variant="contained">
              Add Offers
            </Button>
            <Button
              className="btn"
              sx={{ ml: 5 }}
              size="large"
              color="secondary"
              variant="contained">
              Add Advertiser
            </Button>
          </Typography>
          <Typography sx={{ mt: 5 }} variant="h6" color="primary" gutterBottom>
            HITLIST :
            <Button
              className="btn"
              sx={{ ml: 5 }}
              size="large"
              variant="contained">
              Check Hitlist
            </Button>
            <Button
              className="btn"
              sx={{ ml: 5 }}
              color="secondary"
              size="large"
              variant="contained">
              Old Hitlist
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
