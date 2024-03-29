import { AppBar, Box, Toolbar, Typography, Button, Modal } from "@mui/material";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken, removeToken } from "../services/LocalStorageService";
import { unsetUserInfo } from "../features/userSlice";
import { unsetUserToken } from "../features/authSlice";
import Attendance from "../pages/Attendance";
import ShowOffer from "../pages/showDataPanel/ShowOffer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  // State
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [offer, setOffer] = useState(false);
  const handleOffer = () => setOffer(true);
  const handleCloseOffer = () => setOffer(false);

  // Get Logged In User

  const token = getToken("token");

  const userData = useSelector((state) => state.user);

  // Store User Data in Redux Store

  const admin = userData.isAdmin;
  const mod = userData.isMod;
  const id = userData.id;
  const name = userData.name;
  const email = userData.email;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(unsetUserToken({ token: null }));
    dispatch(
      unsetUserInfo({ name: "", email: "", id: "", mod: "", admin: "" })
    );
    removeToken("token");
    navigate("/login");
  };

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
            {admin ? (
              <Button
                component={NavLink}
                to="/admin"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#6d1b7b" : "" };
                }}
                sx={{ color: "white", textTransform: "none", ml: 1 }}>
                Admin
              </Button>
            ) : (
              ""
            )}
            {mod ? (
              <Button
                component={NavLink}
                to="/contact"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#6d1b7b" : "" };
                }}
                sx={{ color: "white", textTransform: "none", ml: 1 }}>
                Moderate
              </Button>
            ) : (
              ""
            )}
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
                  onClick={handleOffer}
                  sx={{ color: "white", textTransform: "none", ml: 1 }}>
                  Offers
                </Button>
                <Button
                  onClick={handleOpen}
                  sx={{ color: "white", textTransform: "none", ml: 1 }}>
                  Attendance
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
                  sx={{ color: "white", textTransform: "none", ml: 2 }}>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Attendance name={name} id={id} email={email} />
        </Box>
      </Modal>
      <Modal
        open={offer}
        onClose={handleCloseOffer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <ShowOffer id={id} />
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
