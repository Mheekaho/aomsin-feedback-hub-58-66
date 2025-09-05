import React from 'react';
import { RefreshCw } from 'lucide-react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  onRefresh?: () => void;
}

const Card: React.FC<CardProps> = ({ title, children, onRefresh }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
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
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;