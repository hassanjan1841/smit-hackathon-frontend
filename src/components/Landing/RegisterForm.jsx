import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import { appRoutes } from "../../constant";

// Zod validation schema
const formSchema = z.object({
  cnic: z
    .string()
    .min(13, "cnic must be 13 characters")
    .max(13, "cnic must be 13 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

// Function to generate a random password
const generatePassword = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const RegisterForm = () => {
  const { fetchData, loading } = useFetch();
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnic: "",
      email: "",
      name: "",
    },
    mode: "onChange", // Validating on each input change
    reValidateMode: "onChange", // Make sure validation triggers after each change
  });

  // Handle form submission
  async function onSubmit(values) {
    const password = generatePassword(); // Generate a unique password
    try {
      // Register user
      await fetchData({
        url: appRoutes.register,
        method: "post",
        body: { ...values, password },
      });

      // Send confirmation email
      await fetchData({
        url: appRoutes.sendEmail,
        method: "post",
        body: {
          senderName: values.name,
          sender: "ar535363@gmail.com",
          receiver: values.email,
          subject: "Registration Confirmation",
          message: `<html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
              text-align: center;
            }
            p {
              color: #555;
              line-height: 1.6;
              font-size: 16px;
            }
            .highlight {
              color: #0066cc;
              font-weight: bold;
            }
            .cta-button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #0066cc;
              color: #fff;
              text-decoration: none;
              font-size: 16px;
              border-radius: 5px;
              text-align: center;
            }
            .footer {
              text-align: center;
              font-size: 14px;
              color: #888;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Registration Confirmation</h1>
            <p>Hello <strong class="highlight">${values.name}</strong>,</p>
            <p>Thank you for registering with us! We are excited to have you onboard.</p>
            <p>Your registration details are as follows:</p>
            <p><strong>Email:</strong> <span class="highlight">${values.email}</span></p>
            <p><strong>Password:</strong> <span class="highlight">${password}</span></p>
            <p>For security reasons, we strongly recommend that you log in and change your password immediately upon your first login.</p>
            <p>If you have any concerns or need assistance, don't hesitate to reach out to us at any time. We are here to help you!</p>
            <a href="http://localhost:5173/" class="cta-button">Visit Our Website</a>
            <div class="footer">
              <p>Best regards,</p>
              <p><strong>Your Team</strong></p>
            </div>
          </div>
        </body>
      </html>
`,
        },
      });

      // Handle responses
      toast.success("Your application is submitted.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      toast.success("Your email is sent, check your inbox.", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      form.reset(); // Reset the form after submission
    } catch (error) {
      console.log("Error in new user registration:", error);
      if (Array.isArray(error?.response?.data?.errors)) {
        error.response.data.errors.forEach((data) => {
          toast.error(data.msg, {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
      } else {
        toast.error(error.response?.data?.message || error.message, {
          position: "bottom-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent hover:border hover:border-accent hover:cursor-pointer">
          Proceed
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your details</DialogTitle>
          <DialogDescription>
            Please provide your ID, email, and name to proceed.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* ID Field */}
            <FormField
              control={form.control}
              name="cnic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>cnic</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {form.formState.errors.cnic && (
                    <FormMessage>
                      {form.formState.errors.cnic.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {form.formState.errors.name && (
                    <FormMessage>
                      {form.formState.errors.name.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="hover:cursor-pointer"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
