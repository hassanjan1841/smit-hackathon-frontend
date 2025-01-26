import React, { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { Link } from "react-router";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary text-primary-foreground py-4"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <img src="/logo.png" alt="Saylani Microfinance" className="h-12" />
        <h1 className="text-2xl font-bold">Saylani Microfinance</h1>
        {currentUser ? (
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent hover:border hover:border-accent hover:cursor-pointer"
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>

            <Button
              variant={"destructive"}
              onClick={() => {
                Cookies.remove("currentUser");
                setCurrentUser(null);
                window.location.reload();
              }}
              className="hover:cursor-pointer"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <RegisterForm />
              <LoginForm />
            </div>
          </>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
