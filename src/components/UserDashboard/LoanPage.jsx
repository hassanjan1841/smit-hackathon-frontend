import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoanRequestForm from "./Loans/LoanRequestForm";
import { Link } from "react-router";
import useFetch from "../../hooks/useFetch";
import { appRoutes } from "../../constant";

const LoansPage = () => {
  const [loans, setLoans] = useState(null);
  const { fetchData } = useFetch();
  const [statusFilter, setStatusFilter] = useState("All");
  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetchData({
        url:
          appRoutes.getLoans +
          (statusFilter !== "All" ? `?status=${statusFilter}` : ""),
        method: "get",
      });
      setLoans(response.data);
      console.log("loans", response.data);
    };
    fetchLoans();
  }, [statusFilter]);
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
              <div>{loan.status}</div>
              <div>{loan.user.name}</div>
            </div>
          ))
        ) : (
          <p>No loans found</p>
        )}
      </div>
    </div>
  );
};

export default LoansPage;
