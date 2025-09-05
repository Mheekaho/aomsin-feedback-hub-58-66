import React from "react";
import { GlobalHeader } from "./GlobalHeader";
import { MobileNav } from "./MobileNav";
import { MiniRailSidebar } from "@/components/dashboard/MiniRailSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      {/* Global Header */}
      <GlobalHeader />
      
      {/* Header spacer */}
      <div className="h-16"></div>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Desktop Mini Rail Sidebar */}
      <MiniRailSidebar />
      
      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 max-w-[1280px] mx-auto ml-0 lg:ml-24">
        {children}
      </main>
    </div>
  );
};