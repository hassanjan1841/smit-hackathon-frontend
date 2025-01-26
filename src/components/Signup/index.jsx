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
import { appRoutes } from "../../constant";

// Define the validation schema
const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // Validate on every change
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const registerUser = async (data) => {
    try {
      const user = await fetchData({
        url: appRoutes.register,
        method: "post",
        body: data,
      });
      toast.success("User Registered Successfully");
      console.log("user", user);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Here you would typically send the data to your backend
    console.log(data);

    setIsLoading(false);
    toast.success("Account created successfully");
    navigate("/login");
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
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>
              <CardFooter className="flex justify-between mt-4 p-0">
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Signing up..." : "Sign up"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
          <div className="text-center pb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
