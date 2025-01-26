import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-10 bg-background min-h-screen">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
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
    </div>
  );
};

export default AdminDashboard;
