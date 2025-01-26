import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router";

export function SidebarLayout({ role }) {
  return (
    <div className="flex h-screen">
      <Sidebar role={"user"} />
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
