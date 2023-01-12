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
import UploadData from "./pages/admin/DataUpload";
import AddOffers from "./pages/admin/AddOffers";
import AddAdvert from "./pages/admin/AddAdvertiser";
import TodayWork from "./pages/admin/TodayWork";
import YesterdayWork from "./pages/admin/YesterdayWork";
import AttendanceCMonth from "./pages/admin/AttendanceCMonth";
import AttendanceLMonth from "./pages/admin/AttendanceLastMonth";
import Attendance from "./pages/Attendance";
import Salary from "./pages/admin/Salary";
import GenerateSalary from "./pages/admin/GenerateSalary";
import LastMonthSalary from "./pages/admin/LastMonthSalary";

function App() {
  const { token } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.user);

  const isAdmin = userData.isAdmin;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="admin"
              element={isAdmin ? <Admin /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/dataleft"
              element={isAdmin ? <DataLeft /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/uploaddata"
              element={isAdmin ? <UploadData /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/addoffers"
              element={isAdmin ? <AddOffers /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/addadvertiser"
              element={isAdmin ? <AddAdvert /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/todaywork"
              element={isAdmin ? <TodayWork /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/yesterdaywork"
              element={isAdmin ? <YesterdayWork /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/attendancemonth"
              element={
                isAdmin ? <AttendanceCMonth /> : <Navigate to="/login" />
              }
            />
            <Route
              path="admin/attendancelmonth"
              element={
                isAdmin ? <AttendanceLMonth /> : <Navigate to="/login" />
              }
            />
            <Route
              path="admin/salary"
              element={isAdmin ? <Salary /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/generatesalary"
              element={isAdmin ? <GenerateSalary /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/lastmonthsalary"
              element={isAdmin ? <LastMonthSalary /> : <Navigate to="/login" />}
            />
            <Route
              path="/attendance"
              element={token ? <Attendance /> : <Navigate to="/login" />}
            />

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
