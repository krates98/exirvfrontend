import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import { useNavigate, NavLink } from "react-router-dom";

import { getToken, removeToken } from "../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { unsetUserInfo } from "../features/userSlice";
import { unsetUserToken } from "../features/authSlice";

const Navbar = () => {
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
              Exirv
            </Typography>

            <Button
              component={NavLink}
              to="/"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "#6d1b7b" : "" };
              }}
              sx={{ color: "white", textTransform: "none", ml: 1 }}>
              Home
            </Button>

            <Button
              component={NavLink}
              to="/contact"
              style={({ isActive }) => {
                return { backgroundColor: isActive ? "#6d1b7b" : "" };
              }}
              sx={{ color: "white", textTransform: "none", ml: 1 }}>
              Contact
            </Button>

            {token ? (
              <>
                <Button
                  component={NavLink}
                  to="/dashboard"
                  style={({ isActive }) => {
                    return { backgroundColor: isActive ? "#6d1b7b" : "" };
                  }}
                  sx={{ color: "white", textTransform: "none", ml: 1 }}>
                  Dashboard
                </Button>
                <Button
                  component={NavLink}
                  to="/login"
                  onClick={handleLogout}
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? "#6d1b7b" : "green",
                    };
                  }}
                  sx={{ color: "white", textTransform: "none", ml: 10 }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={NavLink}
                to="/login"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#6d1b7b" : "" };
                }}
                sx={{ color: "white", textTransform: "none", ml: 1 }}>
                Login/Registration
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
