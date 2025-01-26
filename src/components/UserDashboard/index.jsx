import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appRoutes } from "../../constant";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const DashboardPage = () => {
  const changePass = Cookies.get("changePass");
  const [isDialogOpen, setIsDialogOpen] = useState(changePass === "true");
  const [password, setPassword] = useState("");
  const { fetchData, loading } = useFetch();

  useEffect(() => {
    if (changePass) {
      setIsDialogOpen(true);
    }
  }, [changePass]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Password:", password);
      await fetchData({
        url: appRoutes.changePassword,
        method: "post",
        body: { password },
      });
      handleCloseDialog();
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password.");
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-10 bg-background min-h-screen">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <button onClick={handleOpenDialog} className="btn btn-primary">
          Change Password
        </button>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">15</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Approved Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">10</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog isOpen={isDialogOpen} onDismiss={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <label>
              New Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </label>
            <DialogFooter>
              <button type="submit" className="btn btn-primary">
                {loading ? "Loading..." : "Submit"}
              </button>
              <DialogClose asChild>
                <button
                  onClick={handleCloseDialog}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
