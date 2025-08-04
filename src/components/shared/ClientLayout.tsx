'use client';

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout; 