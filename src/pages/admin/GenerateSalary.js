import { useState, useEffect } from "react";
import { Grid, Button, CircularProgress, Divider } from "@mui/material";
import { adminApi } from "../../api/ApiCalls";

const GenerateSalary = () => {
  const [loading, setLoading] = useState(false);
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    const getSalary = async () => {
      const att = await adminApi.get("/generatesalary");
      setSalary(att.data);
      setLoading(true);
    };
    getSalary();
  }, []);

  let structuring;

  let total = 0;

  if (loading) {
    structuring = salary.map((element, i) => {
      total = total + element.total;
      return (
        <Grid container key={i} spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button variant="outlined">{element.workername}</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" color="success" sx={{ ml: 5 }}>
              {element.total}
            </Button>
          </Grid>
        </Grid>
      );
    });
  }

  return (
    <>
      {loading ? (
        <Grid container justifyContent="center">
          <Grid item sm={10}>
            <h1>Salary For This Month</h1>
            <Divider />
            {structuring}
            <Grid>
              <Button variant="outlined" color="error" sx={{ mt: 5 }}>
                Total: {total}
              </Button>
            </Grid>
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

export default GenerateSalary;
