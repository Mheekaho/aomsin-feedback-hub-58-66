import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Menu,
  BarChart3,
  MapPin,
  MessageSquareText,
  AlertTriangle,
  Bot,
  FileText,
  Briefcase,
  Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AppAuthContext";

interface MiniRailSidebarProps {
  /** ถ้าส่ง label มาจะบังคับให้ item นั้น active */
  activeMenu?: string;
  onMenuSelect?: (item: string) => void;
  onToggleMainSidebar?: () => void;
  className?: string;
}

type RailItem = {
  icon: any;
  label: string;
  tooltip: string;
  path: string;
  hash?: string; // ไม่ใส่ = ไม่มี hash
};

const baseMenuItems: RailItem[] = [
  { icon: BarChart3, label: "สรุปภาพรวมประจำเดือน", tooltip: "สรุปภาพรวมประจำเดือน", path: "/dashboard" },
  { icon: MapPin, label: "ผลการดำเนินงานรายพื้นที่", tooltip: "ผลการดำเนินงานรายพื้นที่", path: "/regional" },
  { icon: MessageSquareText, label: "ข้อคิดเห็นของลูกค้า", tooltip: "ข้อคิดเห็นของลูกค้า", path: "/customer-feedback" },
  { icon: AlertTriangle, label: "ข้อร้องเรียนของลูกค้า", tooltip: "ข้อร้องเรียนของลูกค้า", path: "/strong-complaints" },
  { icon: Briefcase, label: "Market Conduct", tooltip: "Market Conduct", path: "/market-conduct" },
  { icon: FileText, label: "เอกสารอ้างอิง", tooltip: "เอกสารอ้างอิง", path: "/reference-tables" },
];

const adminOnlyItems: RailItem[] = [
  { icon: Bot, label: "AI Chat ช่วยวิเคราะห์", tooltip: "AI Chat ช่วยวิเคราะห์", path: "/ai-chatbot" },
  { icon: Users, label: "จัดการผู้ใช้งาน", tooltip: "จัดการผู้ใช้งาน", path: "/admin/user-management" },
];

export const MiniRailSidebar = ({
  activeMenu,
  onToggleMainSidebar,
  onMenuSelect,
  className = "",
}: MiniRailSidebarProps) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const menuItems = currentUser?.isAdmin 
    ? [...baseMenuItems, ...adminOnlyItems] 
    : baseMenuItems;

  // ให้ active ตรงตาม path + hash และถ้ามี activeMenu ให้ชนะแมตช์ปกติ
  const isItemActive = (item: RailItem) => {
    if (activeMenu && item.label === activeMenu) return true;

    const pathMatch = location.pathname === item.path;
    if (!pathMatch) return false;

    const currentHash = location.hash || ""; // "#ai" | "" | undefined
    if (item.hash) return currentHash === `#${item.hash}`;
    // ไม่มี hash ⇒ active เฉพาะตอนที่ hash ปัจจุบันว่าง
    return currentHash === "";
  };

  return (
    <TooltipProvider>
      <div className={`mini-rail hidden md:flex flex-col items-center ${className}`}>
        {/* Hamburger */}
        <div className="pt-3 pb-3">
          <Button
            onClick={onToggleMainSidebar}
            aria-label="เปิดเมนู"
            className="
              w-10 h-10 rounded-[14px] border border-[#E5E7EB] bg-[#F9FAFB]
              text-[#6B7280]
              transition-all duration-200 ease-out
              hover:bg-[#FFF1F7] hover:text-[#CE5997]
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DF7AB0] focus-visible:outline-offset-2
            "
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </Button>
        </div>

        {/* Nav icons */}
        <div className="flex flex-col space-y-3 pb-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            // ใช้ object ใน NavLink เพื่อให้ hash แยกจาก path ชัดเจน
            const to = item.hash
              ? { pathname: item.path, hash: `#${item.hash}` }
              : { pathname: item.path };

            return (
              <Tooltip key={item.label} delayDuration={300}>
                <TooltipTrigger asChild>
                  <NavLink to={to as any} aria-label={item.tooltip} aria-current={active ? "page" : undefined}>
                    <Button
                      onClick={() => onMenuSelect?.(item.label)}
                      aria-current={active ? "page" : undefined}
                      data-active={active ? "true" : "false"}
                      className={`
                        w-11 h-11 rounded-[14px] border transition-all duration-200 ease-out
                        ${active
                          ? "border-[#F5A3C5] text-[#D8218C] shadow-[0_4px_12px_rgba(216,33,140,.22)] bg-[linear-gradient(180deg,#FFD6EB_0%,#FFEAF4_100%)]"
                          : "bg-transparent border-transparent text-[#6B7280] hover:bg-[#FFF1F7] hover:text-[#CE5997] hover:border-[#F7B4D1]"}
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DF7AB0] focus-visible:outline-offset-2
                      `}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </Button>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-black/80 border-0 text-white shadow-lg rounded-md" sideOffset={8}>
                  <p className="font-kanit text-sm">{item.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
