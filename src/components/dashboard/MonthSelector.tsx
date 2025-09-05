import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MonthSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const thaiMonthNames = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

// Generate recent months (12 months ago + current + 6 months ahead)
const generateRecentMonths = () => {
  const months = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based
  
  // Generate 12 months ago to 6 months ahead (total 19 months)
  for (let i = -12; i <= 6; i++) {
    const date = new Date(currentYear, currentMonth + i, 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Convert to 1-based
    const buddhistYear = year + 543; // Convert to Buddhist calendar
    
    const monthStr = month.toString().padStart(2, '0');
    months.push({
      value: `${year}-${monthStr}`,
      label: `${thaiMonthNames[month - 1]} ${buddhistYear}`
    });
  }
  
  return months;
};

export const MonthSelector = ({ value, onChange }: MonthSelectorProps) => {
  // Method 2: Generate recent months (most popular approach)
  const months = generateRecentMonths();
  
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px] bg-white border border-border rounded-2xl shadow-sm">
        <SelectValue placeholder="เลือกเดือน" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-border rounded-xl shadow-lg max-h-[300px]">
        {months.map((month) => (
          <SelectItem 
            key={month.value} 
            value={month.value}
            className="font-kanit hover:bg-muted/50 focus:bg-muted/50"
          >
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Usage:
// <MonthSelector value={value} onChange={onChange} />
// Automatically shows: 12 months ago + current month + 6 months ahead