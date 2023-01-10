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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/dataleft" element={<DataLeft />} />
            <Route path="admin/addoffers" element={<AddOffers />} />
            <Route path="admin/addadvertiser" element={<AddAdvert />} />
            <Route path="admin/todaywork" element={<TodayWork />} />
            <Route path="admin/yesterdaywork" element={<YesterdayWork />} />
            <Route
              path="admin/attendancemonth"
              element={<AttendanceCMonth />}
            />
            <Route
              path="admin/attendancelmonth"
              element={<AttendanceLMonth />}
            />
            <Route path="admin/salary" element={<Salary />} />
            <Route path="/admin/generatesalary" element={<GenerateSalary />} />
            <Route
              path="/admin/lastmonthsalary"
              element={<LastMonthSalary />}
            />
            <Route path="/attendance" element={<Attendance />} />

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
