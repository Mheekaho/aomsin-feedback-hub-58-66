import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'อนุญาต':
        return 'bg-green-100 text-green-700';
      case 'ปฏิเสธ':
      case 'ไม่ผ่าน':
      case 'ปิดใช้งาน':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;