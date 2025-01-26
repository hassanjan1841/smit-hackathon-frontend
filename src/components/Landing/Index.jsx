import React, { useState } from "react";
import Header from "@/components/Landing/Header";
import HeroSlider from "@/components/Landing/HeroSlider";
import LoanSection from "@/components/Landing/LoanSection";
import ManagementTeam from "@/components/Landing/ManagementTeam";
import Footer from "@/components/Landing/Footer";

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would typically come from your auth state

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <HeroSlider />
        <LoanSection />
        <ManagementTeam />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
