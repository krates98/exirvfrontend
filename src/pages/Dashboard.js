import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import theme from "./Theme";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { setUserInfo } from "../features/userSlice";
import { getToken } from "../services/LocalStorageService";
import { ipCall } from "../api/ApiCalls";
import Welcome from "./showDataPanel/Welcome";
import CheckIp from "./showDataPanel/FetchData";

const Dashboard = () => {
  // Get Logged In User

  const token = getToken("token");
  const { data, isSuccess } = useGetLoggedUserQuery(token);

  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    isMod: "",
    isAdmin: "",
  });

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

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        admin: data.user.isAdmin,
        mod: data.user.isMod,
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
      });
    }
  }, [data, isSuccess]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          admin: data.user.isAdmin,
          mod: data.user.isMod,
          id: data.user._id,
          email: data.user.email,
          name: data.user.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

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
