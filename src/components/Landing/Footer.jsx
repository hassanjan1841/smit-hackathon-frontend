import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary text-primary-foreground py-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Saylani Microfinance</h3>
            <p>Empowering communities through financial inclusion.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <p>123 Main Street, Karachi, Pakistan</p>
            <p>Email: info@saylanimicrofinance.com</p>
            <p>Phone: +92 123 456 7890</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Saylani Microfinance. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
