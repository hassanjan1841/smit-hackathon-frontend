import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Users,
  BarChart,
} from "lucide-react";

import { Link } from "react-router";

const Sidebar = ({ role }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems =
    role === "admin"
      ? [
          { icon: Home, label: "Dashboard", link: "/admin" },
          { icon: Users, label: "Loans", link: "/admin/loans" },
          { icon: Settings, label: "Settings", link: "/admin/settings" },
          { icon: BarChart, label: "Reports", link: "/admin/reports" },
        ]
      : [
          { icon: Home, label: "Dashboard", link: "/dashboard" },
          { icon: Users, label: "Loans", link: "/dashboard/loans" },
        ];

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:cursor-pointer"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
