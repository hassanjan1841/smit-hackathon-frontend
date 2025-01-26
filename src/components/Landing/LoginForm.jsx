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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { appRoutes } from "../../constant";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";

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

  const navigate = useNavigate();
  const { fetchData, loading } = useFetch();

  const onSubmit = async (data) => {
    // Here you would typically send the data to your backend
    try {
      console.log(data);
      const response = await fetchData({
        url: appRoutes.login,
        method: "post",
        body: data,
      });

      if (response.data.changePass) {
        Cookies.set("changePass", response.data.changePass);
      } else {
        Cookies.set("token", response.data.token);
      }

      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Login error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Log In</DialogTitle>
        <DialogDescription>Enter your credentials</DialogDescription>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className=" py-3">
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
                  <Button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
