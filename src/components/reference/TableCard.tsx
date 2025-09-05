// src/components/reference/TableCard.tsx
import React from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TableCardProps {
  title: string;
  children: React.ReactNode;
  onRefresh?: () => void;
}

const TableCard: React.FC<TableCardProps> = ({ title, children, onRefresh }) => {
  return (
    <Card className="rounded-2xl border shadow-card bg-white overflow-hidden">
      <div className="h-2 w-full rounded-t-2xl" style={{ background: "var(--gradient-pink-strip)" }} />
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-full hover:bg-gray-50 transition-colors group"
              title="รีเฟรชข้อมูล"
            >
              <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">{children}</CardContent>
    </Card>
  );
};

export default TableCard;