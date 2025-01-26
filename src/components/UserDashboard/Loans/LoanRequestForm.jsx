import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useFetch from "../../../hooks/useFetch";
import { appRoutes } from "../../../constant";
import { useAuth } from "../../../context/AuthContext";

// Zod validation schema for loan request
const formSchema = z.object({
  category: z.string().nonempty("Category is required"),
  subcategory: z.string().nonempty("Subcategory is required"),
  amount: z.string().max(1000000, "Loan amount cannot exceed 1,000,000"),
  initialDeposit: z.string().max(100000, "Deposit cannot exceed 100,000"),
  duration: z.string().max(30, "Duration cannot exceed 30 years"),
  guarantors: z
    .array(
      z.object({
        name: z.string().nonempty("Name is required"),
        email: z.string().email("Invalid email address"),
        location: z.string().nonempty("Location is required"),
        cnic: z.string().nonempty("CNIC is required"),
      })
    )
    .length(2, "Two guarantors are required"),
  statement: z.string().optional(),
  salarySheet: z.string().optional(),
  address: z.string().nonempty("Address is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
});

const LoanRequestForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { fetchData, loading } = useFetch();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      subcategory: "",
      amount: 0,
      initialDeposit: 0,
      duration: 0,
      guarantors: [
        { name: "", email: "", location: "", cnic: "" },
        { name: "", email: "", location: "", cnic: "" },
      ],
      statement: "",
      salarySheet: "",
      address: "",
      phoneNumber: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchData({
        url: appRoutes.getCategories,
        method: "get",
      });
      setCategories(response.data);
    };
    getCategories();
  }, []);

  const handleCategoryChange = async (value) => {
    setSelectedCategory(value);
    const response = await fetchData({
      url: `${appRoutes.getSubCategories}/${value}`,
      method: "get",
    });
    setSubcategories(response.data);
  };

  const onSubmit = async (data) => {
    console.log(data);
    data.user = currentUser._id;
    try {
      const response = await fetchData({
        url: appRoutes.requestLoan,
        method: "post",
        body: data,
      });
      toast.success("Loan request submitted successfully!");
      navigate("/dashboard");
      form.reset();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen ">
      <div className="grid gap-8">
        <h2 className="text-3xl font-semibold">Loan Request Form</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            /* Category and Subcategory */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleCategoryChange(e.target.value);
                        }}
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    {form.formState.errors.category && (
                      <FormMessage>
                        {form.formState.errors.category.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Subcategory</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                      >
                        <option value="">Select Subcategory</option>
                        {subcategories.map((subcategory) => (
                          <option key={subcategory._id} value={subcategory._id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    {form.formState.errors.subcategory && (
                      <FormMessage>
                        {form.formState.errors.subcategory.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            {/* Address and Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                      />
                    </FormControl>
                    {form.formState.errors.address && (
                      <FormMessage>
                        {form.formState.errors.address.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                      />
                    </FormControl>
                    {form.formState.errors.phoneNumber && (
                      <FormMessage>
                        {form.formState.errors.phoneNumber.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            {/* Amount, Initial Deposit, and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                      />
                    </FormControl>
                    {form.formState.errors.amount && (
                      <FormMessage>
                        {form.formState.errors.amount.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="initialDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Deposit</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                      />
                    </FormControl>
                    {form.formState.errors.initialDeposit && (
                      <FormMessage>
                        {form.formState.errors.initialDeposit.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Years)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                      />
                    </FormControl>
                    {form.formState.errors.duration && (
                      <FormMessage>
                        {form.formState.errors.duration.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            {/* Guarantor Fields */}
            {form.watch("guarantors").map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-700">
                  Guarantor {index + 1}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name={`guarantors.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                          />
                        </FormControl>
                        {form.formState.errors.guarantors?.[index]?.name && (
                          <FormMessage>
                            {
                              form.formState.errors.guarantors[index].name
                                .message
                            }
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`guarantors.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                          />
                        </FormControl>
                        {form.formState.errors.guarantors?.[index]?.email && (
                          <FormMessage>
                            {
                              form.formState.errors.guarantors[index].email
                                .message
                            }
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name={`guarantors.${index}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                          />
                        </FormControl>
                        {form.formState.errors.guarantors?.[index]
                          ?.location && (
                          <FormMessage>
                            {
                              form.formState.errors.guarantors[index].location
                                .message
                            }
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`guarantors.${index}.cnic`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNIC</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
                          />
                        </FormControl>
                        {form.formState.errors.guarantors?.[index]?.cnic && (
                          <FormMessage>
                            {
                              form.formState.errors.guarantors[index].cnic
                                .message
                            }
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                loading || Object.keys(form.formState.errors).length > 0
              }
            >
              {console.log(form.formState.errors)}
              {loading ? "Submitting..." : "Submit Loan Request"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoanRequestForm;
