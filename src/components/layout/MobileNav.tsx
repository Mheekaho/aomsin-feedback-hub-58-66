import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AppAuthContext";
import {
  BarChart3,
  MapPin,
  MessageSquareText,
  AlertTriangle,
  Bot,
  FileText,
  Briefcase,
  Users,
} from "lucide-react";

type NavItem = {
  icon: any;
  label: string;
  path: string;
  shortLabel: string;
};

const baseNavItems: NavItem[] = [
  { icon: BarChart3, label: "สรุปภาพรวมประจำเดือน", shortLabel: "ภาพรวม", path: "/dashboard" },
  { icon: MapPin, label: "ผลการดำเนินงานรายพื้นที่", shortLabel: "รายพื้นที่", path: "/regional" },
  { icon: MessageSquareText, label: "ข้อคิดเห็นของลูกค้า", shortLabel: "ความคิดเห็น", path: "/customer-feedback" },
  { icon: AlertTriangle, label: "ข้อร้องเรียนของลูกค้า", shortLabel: "ร้องเรียน", path: "/strong-complaints" },
  { icon: Briefcase, label: "Market Conduct", shortLabel: "Market", path: "/market-conduct" },
  { icon: FileText, label: "เอกสารอ้างอิง", shortLabel: "เอกสาร", path: "/reference-tables" },
];

const adminOnlyItems: NavItem[] = [
  { icon: Bot, label: "AI Chat ช่วยวิเคราะห์", shortLabel: "AI Chat", path: "/ai-chatbot" },
  { icon: Users, label: "จัดการผู้ใช้งาน", shortLabel: "ผู้ใช้", path: "/admin/user-management" },
];

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const navItems = currentUser?.isAdmin 
    ? [...baseNavItems, ...adminOnlyItems] 
    : baseNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="lg:hidden sticky top-16 z-40 bg-white px-4 py-2 border-b overflow-x-auto no-scrollbar">
      <div className="flex gap-2 min-w-max">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-2 whitespace-nowrap transition-all duration-200
                ${active 
                  ? "rounded-2xl bg-gradient-to-r from-[#f2449e] to-[#fd84d6] text-white px-4 py-2 shadow font-medium" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-2xl px-4 py-2"
                }
              `}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-kanit">{item.shortLabel}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};