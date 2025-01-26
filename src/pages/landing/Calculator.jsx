import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the loan categories and periods for dynamic validation
const Calculator = () => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [minLoanPeriod, setMinLoanPeriod] = useState(1); // Default min is 1 year
  const [maxLoanPeriod, setMaxLoanPeriod] = useState(3); // Default max is 3 years
  const [category, setCategory] = useState(""); // Track the selected category

  // Define Zod schema for form validation
  const schema = z.object({
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    initialDeposit: z
      .number()
      .min(0, "Initial deposit must be a positive number"),
    loanAmount: z
      .number()
      .min(1, "Loan amount must be greater than 0")
      .optional(), // Optional if initial deposit is used
    loanPeriod: z
      .number()
      .min(
        minLoanPeriod,
        `Loan period must be at least ${minLoanPeriod} year(s)`
      )
      .max(maxLoanPeriod, `Loan period cannot exceed ${maxLoanPeriod} years`),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      category: "",
      subcategory: "",
      initialDeposit: 0,
      loanAmount: 0,
      loanPeriod: 1,
    },
  });

  // Handle form submission for loan calculation
  const onSubmit = (data) => {
    let totalLoan = 0;
    if (data.loanAmount > 0) {
      totalLoan = data.loanAmount;
    }

    // Calculate monthly payment (assuming no interest for simplicity)
    const monthlyPayment =
      (totalLoan - data.initialDeposit) / (data.loanPeriod * 12);
    setResult({
      totalLoan,
      monthlyPayment,
    });
    toast.success("Loan calculation completed!");
  };

  // Update loan period based on selected category
  const handleCategoryChange = (category) => {
    setCategory(category);
    switch (category) {
      case "wedding":
        setMinLoanPeriod(1);
        setMaxLoanPeriod(3);
        break;
      case "home":
        setMinLoanPeriod(1);
        setMaxLoanPeriod(7);
        break;
      case "business":
        setMinLoanPeriod(1);
        setMaxLoanPeriod(5);
        break;
      case "education":
        setMinLoanPeriod(1);
        setMaxLoanPeriod(5);
        break;
      default:
        setMinLoanPeriod(1);
        setMaxLoanPeriod(3);
        break;
    }
  };

  return (
    <div>
      {/* Trigger button to open the dialog */}
      <Dialog open={calculatorOpen} onOpenChange={setCalculatorOpen}>
        <DialogTrigger asChild>
          <Button>Calculate Loan</Button>
        </DialogTrigger>

        {/* Dialog content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loan Calculator</DialogTitle>
            <DialogDescription>
              Enter the loan details to calculate your monthly payment.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Category selection */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCategoryChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding Loans</SelectItem>
                        <SelectItem value="home">
                          Home Construction Loans
                        </SelectItem>
                        <SelectItem value="business">
                          Business Startup Loans
                        </SelectItem>
                        <SelectItem value="education">
                          Education Loans
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subcategory selection */}
              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="valima">Valima</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="structure">Structure</SelectItem>
                        <SelectItem value="stall">Buy Stall</SelectItem>
                        <SelectItem value="university">
                          University Fees
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Initial deposit input */}
              <FormField
                control={form.control}
                name="initialDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Deposit (PKR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Loan amount input */}
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Amount (PKR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Loan period input */}
              <FormField
                control={form.control}
                name="loanPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Period (Years)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                        min={minLoanPeriod}
                        max={maxLoanPeriod}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Calculate</Button>
            </form>
          </Form>

          {/* Display the result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 bg-card text-card-foreground rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-4">Loan Breakdown</h2>
              <p>Total Loan: PKR {result.totalLoan.toFixed(2)}</p>
              <p>Monthly Payment: PKR {result.monthlyPayment.toFixed(2)}</p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calculator;
