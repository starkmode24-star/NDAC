import React from "react";
import LiveScoreTicker from "./LiveScoreTicker";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LiveScoreTicker />
      <Navbar />
      <main className="animate-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
