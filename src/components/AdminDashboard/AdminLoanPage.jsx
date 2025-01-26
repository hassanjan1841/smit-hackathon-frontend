import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import useFetch from "../../hooks/useFetch";
import { appRoutes } from "../../constant";
import { toast } from "react-toastify";
import AppointmentModal from "./AppointmentModal"; // Import the AppointmentModal component

const AdminLoansPage = () => {
  const [loans, setLoans] = useState(null);
  const { fetchData } = useFetch();
  const [statusFilter, setStatusFilter] = useState("All");
  const [loan, setLoan] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    location: "",
  }); // State to manage appointment details

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetchData({
          url:
            appRoutes.getLoans +
            (statusFilter !== "All"
              ? `?status=${statusFilter.toLowerCase()}`
              : ""),
          method: "get",
        });
        setLoans(response.data);
        console.log("loans", response.data);
        toast.success("Loans fetched successfully");
      } catch (error) {
        console.error("Error fetching loans:", error);
        toast.error(error.response.data.message);
      }
    };
    fetchLoans();
  }, [statusFilter]);

  const updateLoanStatus = async (loanId, newStatus) => {
    try {
      setShowModal(false);
      const response = await fetchData({
        url: `${appRoutes.updateLoan}/${loanId}`,
        method: "put",
        data: { status: newStatus },
      });

      toast.success("Loan status updated successfully");
      if (newStatus === "Approved") {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error updating loan status:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleStatusChange = (loan, newStatus) => {
    setLoan(loan);
    if (newStatus === "Approved") {
      setShowModal(true);
    }
  };
  const handleModalSubmit = () => {
    updateLoanStatus(loan._id, "Approved");
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-10 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Loans</h2>

        <Button asChild>
          <Link to="/dashboard/loans/request">Request Loan</Link>
        </Button>
      </div>
      <div className="flex justify-between items-center mt-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 mt-4">
        <div className="grid grid-cols-6 gap-4 font-bold">
          <div>Category</div>
          <div>Subcategory</div>
          <div>Amount</div>
          <div>Deposit</div>
          <div>Status</div>
          <div>User</div>
        </div>
        {loans && loans.length > 0 ? (
          loans.map((loan) => (
            <div key={loan._id} className="grid grid-cols-6 gap-4 p-4 border-b">
              <div>{loan.category.name}</div>
              <div>{loan.subcategory.name}</div>
              <div>PKR {loan.amount.toLocaleString()}</div>
              <div>PKR {loan.deposit.toLocaleString()}</div>
              <div>
                <select
                  value={loan.status}
                  onChange={(e) => handleStatusChange(loan._id, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>{loan.user.name}</div>
            </div>
          ))
        ) : (
          <p>No loans found</p>
        )}
      </div>

      <AppointmentModal
        showModal={showModal}
        setShowModal={setShowModal}
        appointmentDetails={appointmentDetails}
        setAppointmentDetails={setAppointmentDetails}
        handleModalSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default AdminLoansPage;
