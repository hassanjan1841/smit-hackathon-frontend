"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

// Define the validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validate on every change
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Here you would typically send the data to your backend
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    setIsLoading(false);
    setIsAuthenticated(true);
    navigate("/");
    toast.success("Logged in successfully");
  };
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] py-3">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <CardFooter className="flex justify-start mt-4 w-full p-0">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
          <div className="text-center">
            {"Don't"} have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline ml-2">
              Sign up
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
