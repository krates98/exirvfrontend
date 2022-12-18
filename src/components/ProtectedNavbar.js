import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";

import { getToken, removeToken } from "../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
import { unsetUserToken } from "../features/authSlice";

const ProtectedNavbar = () => {
  const token = getToken("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(unsetUserToken({ token: null }));
    dispatch(unsetUserInfo({ name: "", email: "" }));
    removeToken("token");
    navigate("/login");
  };

  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Geek-Shop
            </Typography>

            <Button
              component={NavLink}
              to="/login"
              onClick={handleLogout}
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "#6d1b7b" : "" };
              }}
              sx={{ color: "white", textTransform: "none" }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default ProtectedNavbar;
