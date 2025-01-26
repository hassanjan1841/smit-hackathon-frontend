import { motion } from "framer-motion";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Calculator from "../../pages/landing/Calculator";

const LoanCard = ({ loan }) => {
  return (
    <motion.div
      key={loan.category}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{loan.category}</CardTitle>
          <CardDescription>{loan.subcategories.join(", ")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Maximum Loan: PKR {loan.maxLoan.toLocaleString()}</p>
          <p>Maximum Period: {loan.maxPeriod} years</p>
        </CardContent>
        <CardFooter>
          <Calculator />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoanCard;
