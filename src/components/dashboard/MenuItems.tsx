import { Button } from "@/components/ui/button";
import {
  BarChart3,
  MapPin,
  MessageSquare,
  AlertTriangle,
  Bot,
  FileText,
  Briefcase,
  Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AppAuthContext";

type MenuItemsProps = {
  /** ใช้ใน Drawer: คลิกแล้วให้ปิด Drawer */
  onItemClick?: () => void;
  className?: string;
  /** ส่ง label มาบังคับ active (ถ้าไม่ส่ง จะคำนวณจาก path/hash เอง) */
  activeKey?: string;
};

type DrawerItem = {
  icon: any;
  label: string;
  path: string;
  hash?: string;
};

const baseMenuItems: DrawerItem[] = [
  { icon: BarChart3, label: "สรุปภาพรวมประจำเดือน", path: "/dashboard" },
  { icon: MapPin, label: "ผลการดำเนินงานรายพื้นที่", path: "/regional" },
  { icon: MessageSquare, label: "ข้อคิดเห็นของลูกค้า", path: "/customer-feedback" },
  { icon: AlertTriangle, label: "ข้อร้องเรียนรุนแรง", path: "/strong-complaints" },
  { icon: Briefcase, label: "Market Conduct", path: "/market-conduct" },
  { icon: FileText, label: "เอกสารอ้างอิง", path: "/reference-tables" },
];

const adminOnlyItems: DrawerItem[] = [
  { icon: Bot, label: "AI Chat ช่วยวิเคราะห์", path: "/ai-chatbot" },
  { icon: Users, label: "จัดการผู้ใช้งาน", path: "/admin/user-management" },
];

export const MenuItems = ({ onItemClick, className = "", activeKey }: MenuItemsProps) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const menuItems = currentUser?.isAdmin 
    ? [...baseMenuItems, ...adminOnlyItems] 
    : baseMenuItems;

  const isItemActive = (item: DrawerItem) => {
    if (activeKey && item.label === activeKey) return true;

    const pathMatch = location.pathname === item.path;
    if (!pathMatch) return false;

    const currentHash = location.hash || "";
    if (item.hash) return currentHash === `#${item.hash}`;
    return currentHash === "";
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isItemActive(item);

        const to = item.hash
          ? { pathname: item.path, hash: `#${item.hash}` }
          : { pathname: item.path };

        return (
          <NavLink key={item.label} to={to as any} onClick={onItemClick} aria-label={item.label}>
            <Button
              variant={active ? "default" : "ghost"}
              aria-current={active ? "page" : undefined}
              className={`w-full justify-start h-12 rounded-xl font-kanit transition
                ${active
                  ? "bg-primary text-primary-foreground shadow-[0_6px_16px_rgba(255,79,160,0.28)]"
                  : "hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          </NavLink>
        );
      })}
    </div>
  );
};
