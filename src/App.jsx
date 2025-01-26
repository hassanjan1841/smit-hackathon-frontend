import { Route, Routes } from "react-router";
import AuthLayout from "./components/Layouts/AuthLayout";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/NotFound";
import LandingPage from "./pages/landing";

import { SidebarLayout } from "./components/Layouts/SidebarLayout";
import DashboardPage from "./components/UserDashboard";
import LoansPage from "./components/UserDashboard/LoanPage";
import LoanRequestForm from "./components/UserDashboard/Loans/LoanRequestForm";
import AdminDashboard from "./components/AdminDashboard";
import AdminLoansPage from "./components/AdminDashboard/AdminLoanPage";
import Cookies from "js-cookie";
function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route index element={<LandingPage />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="/dashboard" element={<SidebarLayout role={"user"} />}>
            <Route index element={<DashboardPage />} />
            <Route path="loans" element={<LoansPage />} />
            <Route path="loans/request" element={<LoanRequestForm />} />
          </Route>
          <Route path="/admin" element={<SidebarLayout role={"admin"} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="loans" element={<AdminLoansPage />} />
            <Route path="loans/request" element={<LoanRequestForm />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
