import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoanCard from "./LoanCard";

const loanData = [
  {
    category: "Wedding Loans",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    maxPeriod: 3,
  },
  {
    category: "Home Construction Loans",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    maxPeriod: 5,
  },
  {
    category: "Business Startup Loans",
    subcategories: [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    maxLoan: 1000000,
    maxPeriod: 5,
  },
  {
    category: "Education Loans",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: 500000,
    maxPeriod: 4,
  },
];

const LoanSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredLoans = selectedCategory
    ? loanData.filter((loan) => loan.category === selectedCategory)
    : loanData;

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our Loan Programs
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {loanData.map((loan) => (
                <SelectItem key={loan.category} value={loan.category}>
                  {loan.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLoans.map((loan) => (
            <LoanCard key={loan.category} loan={loan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanSection;
