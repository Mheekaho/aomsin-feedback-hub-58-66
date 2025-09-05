import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}
interface DataTableProps {
  columns: Column[];
  rows: any[];
  searchableKeys: string[];
  sortableKeys: string[];
  statusKey?: string;
  itemsPerPage?: number;
}
const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  searchableKeys,
  sortableKeys,
  statusKey,
  itemsPerPage = 10
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const filteredAndSortedRows = useMemo(() => {
    let filtered = rows;

    // Search functionality
    if (searchTerm) {
      filtered = rows.filter(row => searchableKeys.some(key => String(row[key] || '').toLowerCase().includes(searchTerm.toLowerCase())));
    }

    // Sort functionality
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [rows, searchTerm, sortKey, sortDirection, searchableKeys]);
  const totalPages = Math.ceil(filteredAndSortedRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = filteredAndSortedRows.slice(startIndex, endIndex);
  const handleSort = (key: string) => {
    if (!sortableKeys.includes(key)) return;
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };
  const renderCellContent = (column: Column, row: any) => {
    const value = row[column.key];
    if (column.render) {
      return column.render(value, row);
    }
    if (statusKey && column.key === statusKey) {
      return <StatusBadge status={value} />;
    }

    // Handle long text with tooltip
    if (typeof value === 'string' && value.length > 50) {
      return <div className="relative group">
          <div className="line-clamp-2 break-words">
            {value}
          </div>
          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 max-w-xs whitespace-normal">
            {value}
          </div>
        </div>;
    }
    return value || '-';
  };
  return <div className="space-y-4 font-kanit">
      {/* Table */}
      <div className="relative max-h-[70vh] overflow-y-auto border border-gray-300 rounded-2xl">
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              {columns.map(column => <th key={column.key} className={`border-b border-gray-200 shadow-sm text-left py-4 px-4 text-[14px] font-medium text-gray-900 whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis ${column.width || ''} ${sortableKeys.includes(column.key) ? 'cursor-pointer hover:bg-gray-50' : ''}`} onClick={() => handleSort(column.key)}>
                  <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {column.label}
                    {sortableKeys.includes(column.key)}
                  </div>
                </th>)}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? currentRows.map((row, index) => <tr key={index} className={`${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}>
                  {columns.map(column => <td key={column.key} className="px-3 py-2 text-[14px] text-gray-700 break-words border-b border-gray-100">
                      {renderCellContent(column, row)}
                    </td>)}
                </tr>) : <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-gray-400 text-[14px]">
                  ไม่มีข้อมูล
                </td>
              </tr>}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && <div className="flex items-center justify-between">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
            ก่อนหน้า
          </button>
          
          <span className="text-sm text-gray-600">
            หน้า {currentPage} / {totalPages}
          </span>
          
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
            ถัดไป
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>}
    </div>;
};
export default DataTable;