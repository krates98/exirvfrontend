import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import theme from "./Theme";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ipCall } from "../api/ApiCalls";
import Welcome from "./showDataPanel/Welcome";
import CheckIp from "./showDataPanel/FetchData";

const Dashboard = () => {
  const [checkIpBut, setCheckIp] = useState(false);

  const [ip, setIP] = useState("");
  const [ipData, setIPdata] = useState("");

  useEffect(() => {
    const checkIpCall = async () => {
      const res = await ipCall.get("");
      setIP(res.data.ip);
      setIPdata(res.data);
    };
    checkIpCall();
  }, []);

  const checkIp = async () => {
    setCheckIp((current) => !current);
  };

  const userData = useSelector((state) => state.user);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "90vh" }}>
          {!checkIpBut ? (
            <Welcome ip={ip} userData={userData} checkIp={checkIp} />
          ) : (
            <CheckIp ip={ip} ipData={ipData} />
          )}
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
