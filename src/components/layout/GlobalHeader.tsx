import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AppAuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const GlobalHeader: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-gradient-to-r from-[#f2449e] via-[#fd84d6] to-[#fda0dd] text-white font-kanit">
      <div className="pt-[env(safe-area-inset-top)] h-full flex items-center justify-between px-4 sm:px-6">
        <h1 className="text-white font-kanit font-semibold text-lg sm:text-xl lg:text-2xl">
          Dashboard ข้อเสนอแนะ ข้อร้องเรียน การใช้บริการสาขา
        </h1>
        
        <div className="flex items-center gap-2 sm:gap-4 text-white font-kanit">
          <div className="text-xs sm:text-sm hidden sm:block">
            <span>อัปเดตล่าสุด: 31/08/2025 09:49 น.</span>
          </div>
          <Button 
            onClick={handleSignOut} 
            variant="ghost" 
            size="sm" 
            className="bg-white/15 hover:bg-white/25 text-white border-0 rounded-full h-8 sm:h-9 px-3 sm:px-4 font-kanit text-sm"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">ออกจากระบบ</span>
          </Button>
        </div>
      </div>
    </header>
  );
};