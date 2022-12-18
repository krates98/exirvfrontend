import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import ProtectedNavbar from "../components/ProtectedNavbar";

const ProtectedLayout = () => {
  return (
    <>
      <CssBaseline />
      <ProtectedNavbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
