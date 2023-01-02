import { CssBaseline, Grid, ThemeProvider, Box } from "@mui/material";
import theme from "./Theme";
import { getToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/userSlice";
import { ipCall } from "../api/ApiCalls";

import Welcome from "./showDataPanel/Welcome";
import CheckIp from "./showDataPanel/FetchData";

const Dashboard = () => {
  const token = getToken();
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

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        isMod: data.user.isMod,
        isAdmin: data.user.isAdmin,
      });
    }
  }, [data, isSuccess]);

  console.log(userData);

  // Store User Data in Redux Store
  const dispatch = useDispatch();
  useEffect(async () => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          id: data.user._id,
          email: data.user.email,
          name: data.user.name,
          isMod: data.user.isMod,
          isAdmin: data.user.isAdmin,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  useEffect(async () => {
    const res = await ipCall.get("");
    setIP(res.data.query);
    setIPdata(res.data);
  }, []);

  const checkIp = async () => {
    setCheckIp((current) => !current);
  };

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
