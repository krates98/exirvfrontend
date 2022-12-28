import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Admin from "./pages/Admin";
import DataLeft from "./pages/admin/DataLeft";
import AddAdvert from "./pages/admin/AddAdvertiser";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/dataleft" element={<DataLeft />} />
            <Route path="admin/addadvertiser" element={<AddAdvert />} />
            <Route
              path="login"
              element={!token ? <LoginReg /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="sendpasswordresetemail"
              element={<SendPasswordResetEmail />}
            />
            <Route
              path="api/user/reset/:id/:token"
              element={<ResetPassword />}
            />

            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/login" />}
            />
          </Route>
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
