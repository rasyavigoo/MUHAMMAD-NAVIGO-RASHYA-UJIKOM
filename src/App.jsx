import React from "react";
import { Route, Routes } from "react-router-dom";
import Story from "./pages/main/Story.jsx";
import Team from "./pages/main/Team.jsx";
import Explore from "./pages/main/Exploreunit.jsx";
import Overview from "./pages/portal/Dashboard.jsx";
import AdminLayout from "./layouts/admin.jsx";
import Error404 from "./pages/misc/NotFound.jsx";
import ClientLayout from "./layouts/client.jsx";
import UnitHub from "./pages/portal/Units.jsx";
import StaffHub from "./pages/portal/Staff.jsx";
import BookingHub from "./pages/portal/Reservations.jsx";
import SignIn from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/Register.jsx";
import Reserve from "./pages/main/Reserveform.jsx";
import MyStay from "./pages/main/MyStay.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserHub from "./pages/portal/Users.jsx";
import Landing from "./pages/main/Landing.jsx";
import PaymentHub from "./pages/portal/Payment.jsx"; 

// IMPORT HALAMAN BAYAR USER
import UserPayment from "./pages/main/UserPayment.jsx"; 

function App() {
  return (
    <Routes>
      {/* Website Utama (Landing Page) */}
      <Route path="/" element={<ClientLayout />}>
        <Route path="" element={<Landing />} />
        <Route path="about" element={<Story />} />
        <Route path="rooms" element={<Explore />} />
        <Route path="dashboard" element={<MyStay />} />
        
        {/* HALAMAN BAYAR UNTUK USER/PENYEWA */}
        <Route path="pay" element={<UserPayment />} />
      </Route>

      {/* Auth & Form */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/booking/:id" element={<Reserve />} />

      {/* Dashboard Admin (Secured) */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "staff"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<Overview />} />
          <Route path="rooms" element={<UnitHub />} />
          <Route path="bookings" element={<BookingHub />} />
          <Route path="staff" element={<StaffHub />} />
          <Route path="users" element={<UserHub />} />
          <Route path="payments" element={<PaymentHub />} />
        </Route>
      </Route>

      {/* Error Page */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;