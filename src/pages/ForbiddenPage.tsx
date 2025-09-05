import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Shield } from "lucide-react";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFB]">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <Shield className="h-16 w-16 text-primary/60" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 font-kanit">
            403 – ไม่มีสิทธิ์เข้าถึง
          </h1>
          <p className="text-muted-foreground font-kanit text-lg">
            หน้านี้อนุญาตเฉพาะผู้ดูแลระบบ (admin) เท่านั้น
          </p>
          <p className="text-sm text-muted-foreground font-kanit">
            กรุณาติดต่อผู้ดูแลระบบหากคุณต้องการเข้าถึงหน้านี้
          </p>
        </div>
        
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-[#F2449E] to-[#FD84D6] hover:opacity-90 text-white font-kanit"
        >
          <Home className="h-4 w-4 mr-2" />
          กลับหน้าแรก
        </Button>
      </div>
    </div>
  );
}
