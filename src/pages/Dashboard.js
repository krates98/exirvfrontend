import { CssBaseline, Grid } from "@mui/material";
import { getToken } from "../services/LocalStorageService";
// import ChangePassword from "./auth/ChangePassword";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/userSlice";
import axios from "axios";

import Welcome from "./userPanel/Welcome";
import CheckIp from "./userPanel/CheckIp";

const Dashboard = () => {
  const token = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(token);

  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });

  const [checkIpBut, setCheckIp] = useState(false);

  const [ip, setIP] = useState("");
  const [ipData, setIPdata] = useState("");

  const getData = async () => {
    const res = await axios.get("http://ip-api.com/json/");
    setIP(res.data.query);
    setIPdata(res.data);
  };

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.user.email,
        name: data.user.name,
      });
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.user.email,
          name: data.user.name,
        })
      );
    }
  }, [data, isSuccess, dispatch, getData]);

  const checkIp = () => {
    setCheckIp((setCheckIp) => !setCheckIp);
    getData();
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}>
        {!checkIpBut ? (
          <Welcome userData={userData} checkIp={checkIp} />
        ) : (
          <CheckIp ip={ip} ipData={ipData} />
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
