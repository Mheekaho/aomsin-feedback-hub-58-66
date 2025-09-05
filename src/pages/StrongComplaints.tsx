import React, { useEffect, useMemo, useState, useRef } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut, RotateCcw, ChevronDown, Calendar, RefreshCw, Search as SearchIcon, Calendar as CalendarIcon, Check, } from "lucide-react";

/* ===== shadcn/ui (เหมือนหน้า Dashboard) ===== */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

/* ===== Shared Dashboard Components ===== */
import { MiniRailSidebar } from "@/components/dashboard/MiniRailSidebar";
import { MenuItems } from "@/components/dashboard/MenuItems";
import FeedbackFlowModal from "@/components/dashboard/AgentFlowModal";

/* --------------------------- Utilities & Constants --------------------------- */

/* ---------- SingleSelect ---------- */
interface CFSingleSelectProps {
  label: string;
  options: string[];
  selectedItem: string;
  onSelectionChange: (selected: string) => void;
}
const CFSingleSelect: React.FC<CFSingleSelectProps> = ({ label, options, selectedItem, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between border-gray-300 rounded-xl px-3 py-2 text-sm h-auto">
        <span className="font-kanit truncate text-left">{selectedItem || label || options[0]}</span>
        <ChevronDown className={`h-4 w-4 transition-none duration-300 `} />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelectionChange(option);
                setIsOpen(false);
              }}
              className={`p-3 hover:bg-gray-50 cursor-pointer font-kanit text-sm border-b border-gray-100 last:border-b-0 ${selectedItem === option ? "bg-pink-50 text-pink-600" : ""}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



/* ---------- MultiSelect ---------- */
interface CFMultiSelectProps {
  label: string;
  options: string[];
  selectedItems: string[];
  onSelectionChange: (selected: string[]) => void;
}
const CFMultiSelect: React.FC<CFMultiSelectProps> = ({ label, options, selectedItems, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleSelect = (option: string) => {
    if (option === "เลือกทั้งหมด") {
      const allItems = options.slice(1);
      onSelectionChange(selectedItems.length === allItems.length ? [] : allItems);
    } else {
      if (selectedItems.includes(option)) onSelectionChange(selectedItems.filter((item) => item !== option));
      else onSelectionChange([...selectedItems, option]);
    }
  };
  const isAllSelected = selectedItems.length === options.length - 1;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between border-gray-300 rounded-xl px-3 py-2 text-sm h-auto">
        <span className="font-kanit truncate text-left">{selectedItems.length > 0 ? `เลือกแล้ว ${selectedItems.length} ${label}` : label}</span>
        <ChevronDown className={`h-4 w-4 transition-none duration-300 `} />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="ค้นหา..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 border-pink-200 focus:border-pink-400 focus:ring-pink-400" />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.map((option) => {
              const isSelected = option === "เลือกทั้งหมด" ? isAllSelected : selectedItems.includes(option);
              return (
                <div key={option} onClick={() => handleSelect(option)} className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer">
                  <div className={`w-5 h-5 border-2 rounded-sm grid place-items-center transition-colors ${isSelected ? "border-pink-500 bg-pink-500" : "border-pink-300"}`}>
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="font-kanit text-sm flex-1">{option}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};



/* ---------- DateRangePicker ---------- */
interface DateRangePickerProps {
  dateRange: { from: string; to: string };
  onDateRangeChange: (range: { from: string; to: string }) => void;
}
const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onDateRangeChange }) => {
  const formatDateThai = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-kanit text-gray-600 mb-1 block">วันเริ่มต้น</label>
          <div className="relative">
            <Input
              type="date"
              max={getCurrentDate()}
              onChange={(e) => onDateRangeChange({ ...dateRange, from: formatDateThai(e.target.value) })}
              className="pr-8 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-kanit text-gray-600 mb-1 block">วันสิ้นสุด</label>
          <div className="relative">
            <Input
              type="date"
              max={getCurrentDate()}
              onChange={(e) => onDateRangeChange({ ...dateRange, to: formatDateThai(e.target.value) })}
              className="pr-8 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* =====================================================================================
 * Cards (left column)
 * ===================================================================================*/



/* ---------- TimePeriodCard ---------- */
const timePeriodOptions = ["ทั้งหมด", "ข้อมูลประจำเดือน", "ช่วงเวลาย้อนหลัง", "กำหนดช่วงเวลาเอง"];
const monthYearOptions = [
  "ม.ค. 63","ก.พ. 63","มี.ค. 63","เม.ย. 63","พ.ค. 63","มิ.ย. 63","ก.ค. 63","ส.ค. 63","ก.ย. 63","ต.ค. 63","พ.ย. 63","ธ.ค. 63",
  "ม.ค. 64","ก.พ. 64","มี.ค. 64","เม.ย. 64","พ.ค. 64","มิ.ย. 64","ก.ค. 64","ส.ค. 64","ก.ย. 64","ต.ค. 64","พ.ย. 64","ธ.ค. 64",
  "ม.ค. 65","ก.พ. 65","มี.ค. 65","เม.ย. 65","พ.ค. 65","มิ.ย. 65","ก.ค. 65","ส.ค. 65","ก.ย. 65","ต.ค. 65","พ.ย. 65","ธ.ค. 65",
  "ม.ค. 66","ก.พ. 66","มี.ค. 66","เม.ย. 66","พ.ค. 66","มิ.ย. 66","ก.ค. 66","ส.ค. 66","ก.ย. 66","ต.ค. 66","พ.ย. 66","ธ.ค. 66",
  "ม.ค. 67","ก.พ. 67","มี.ค. 67","เม.ย. 67","พ.ค. 67","มิ.ย. 67","ก.ค. 67","ส.ค. 67","ก.ย. 67","ต.ค. 67","พ.ย. 67","ธ.ค. 67",
  "ม.ค. 68","ก.พ. 68","มี.ค. 68","เม.ย. 68","พ.ค. 68","มิ.ย. 68","ก.ค. 68","ส.ค. 68","ก.ย. 68","ต.ค. 68","พ.ย. 68","ธ.ค. 68",
];
const relativeTimeOptions = ["1 วัน", "7 วัน", "14 วัน", "1 เดือน", "6 เดือน", "1 ปี"];

const TimePeriodCard: React.FC = () => {
  const [selectedPeriodType, setSelectedPeriodType] = useState("ทั้งหมด");
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [selectedRelativeTime, setSelectedRelativeTime] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const renderSubDropdown = () => {
    switch (selectedPeriodType) {
      case "ข้อมูลประจำเดือน":
        return <CFSingleSelect label="เดือน/ปี" options={monthYearOptions} selectedItem={selectedMonthYear} onSelectionChange={setSelectedMonthYear} />;
      case "ช่วงเวลาย้อนหลัง":
        return <CFSingleSelect label="ช่วงเวลา" options={relativeTimeOptions} selectedItem={selectedRelativeTime} onSelectionChange={setSelectedRelativeTime} />;
      case "กำหนดช่วงเวลาเอง":
        return <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-card border border-gray-200">
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold font-kanit text-gray-800">
          ช่วงเวลา
        </CardTitle>

        <Button
          variant="ghost"
          size="icon"
          aria-label="รีเซ็ตช่วงเวลา"
          onClick={() => {
            setSelectedPeriodType("ทั้งหมด");
            setSelectedMonthYear("");
            setSelectedRelativeTime("");
            setDateRange({ from: "", to: "" });
          }}
          className="h-8 w-8 rounded-xl hover:bg-gray-100"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <CFSingleSelect
          label=""
          options={timePeriodOptions}
          selectedItem={selectedPeriodType}
          onSelectionChange={(v) => {
            setSelectedPeriodType(v);
            setSelectedMonthYear("");
            setSelectedRelativeTime("");
            setDateRange({ from: "", to: "" });
          }}
        />

        {renderSubDropdown()}

        {selectedPeriodType === "กำหนดช่วงเวลาเอง" && dateRange.from && dateRange.to && (
          <p className="text-xs text-gray-500 font-kanit mt-2">
            กำหนดช่วงเวลาเอง: {dateRange.from} - {dateRange.to}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

/* ---------- ServiceAreaCard ---------- */
const businessLines = ["เลือกทั้งหมด", "สายกิจ 1", "สายกิจ 2", "สายกิจ 3", "สายกิจ 4", "สายกิจ 5", "สายกิจ 6"];
const regions = ["เลือกทั้งหมด", ...Array.from({ length: 18 }, (_, i) => `ภาค ${i + 1}`)];
// NOTE: districts & branches list are long; kept as in source for fidelity
const districts = [
  "เลือกทั้งหมด", "บางเขน", "ราชวัตร", "สะพานใหม่", "ห้วยขวาง", "คลองจั่น", "ถนนเพชรบุรี", "บางรัก", "พร้อมพงษ์", "พระโขนง", "มีนบุรี", "บางคอแหลม", "บางแค",
  "ราษฎร์บูรณะ", "ศิริราช", "ประจวบคีรีขันธ์", "เพชรบุรี", "ราชบุรี", "สมุทรสาคร", "กาญจนบุรี", "นครปฐม", "นนทบุรี 1", "นนทบุรี 2", "สุพรรณบุรี", "นครสวรรค์",
  "พิจิตร", "เพชรบูรณ์", "ลพบุรี", "อุทัยธานี", "กำแพงเพชร", "ตาก", "พิษณุโลก 1", "พิษณุโลก 2", "สุโขทัย", "อุตรดิตถ์", "เชียงใหม่ 1", "เชียงใหม่ 2",
  "เชียงใหม่ 3", "ลำพูน", "เชียงราย", "น่าน", "พะเยา", "แพร่", "ลำปาง", "นครพนม", "บึงกาฬ", "เลย", "สกลนคร", "หนองคาย",
  "หนองบัวลำภู", "อุดรธานี 1", "อุดรธานี 2", "กาฬสินธุ์", "ขอนแก่น 1", "ขอนแก่น 2", "ชัยภูมิ", "มหาสารคาม", "มุกดาหาร", "ร้อยเอ็ด", "บุรีรัมย์", "ยโสธร",
  "ศรีสะเกษ", "สุรินทร์", "อุบลราชธานี 1", "อุบลราชธานี 2", "นครราชสีมา 1", "นครราชสีมา 2", "นครราชสีมา 3", "ปราจีนบุรี", "สระแก้ว", "ปทุมธานี 1", "ปทุมธานี 2",
  "พระนครศรีอยุธยา 1", "พระนครศรีอยุธยา 2", "สระบุรี", "อ่างทอง", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี 1", "ชลบุรี 2", "ชลบุรี 3", "ชลบุรี 4", "ระยอง",
  "สมุทรปราการ 1", "สมุทรปราการ 2", "ชุมพร 1", "ชุมพร 2", "พังงา", "ภูเก็ต", "สุราษฎร์ธานี 1", "สุราษฎร์ธานี 2", "กระบี่", "ตรัง", "นครศรีธรรมราช 1",
  "นครศรีธรรมราช 2", "พัทลุง", "นราธิวาส", "ปัตตานี", "สงขลา 1", "สงขลา 2",
];
const branches = [
  "เลือกทั้งหมด", "สำนักพหลโยธิน", "กรีนพลาซ่า (วังหิน)", "จตุจักร", "เซ็นทรัล ลาดพร้าว", "ตลาด อ.ต.ก.", "เตาปูน", "บางเขน", "ประชาชื่น", "ประชานิเวศน์ 1", "พงษ์เพชร",
  // ... (รายการสาขายาว — คงไว้เพื่อความครบถ้วนตามต้นฉบับ)
  "หาดใหญ่ใน",
];

const ServiceAreaCard: React.FC = () => {
  const [selectedBusinessLines, setSelectedBusinessLines] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  const handleReset = () => {
    setSelectedBusinessLines([]);
    setSelectedRegions([]);
    setSelectedDistricts([]);
    setSelectedBranches([]);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-card border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold font-kanit text-gray-800">พื้นที่ดูแล</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleReset} className="h-8 w-8 rounded-xl hover:bg-gray-100">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CFMultiSelect label="สายกิจ" options={businessLines} selectedItems={selectedBusinessLines} onSelectionChange={setSelectedBusinessLines} />
          <CFMultiSelect label="ภาค" options={regions} selectedItems={selectedRegions} onSelectionChange={setSelectedRegions} />
          <CFMultiSelect label="เขต" options={districts} selectedItems={selectedDistricts} onSelectionChange={setSelectedDistricts} />
          <CFMultiSelect label="สาขา" options={branches} selectedItems={selectedBranches} onSelectionChange={setSelectedBranches} />
        </div>
        <p className="text-xs text-gray-500 font-kanit mt-4">เลือกแล้ว: {selectedBusinessLines.length} สายกิจ, {selectedRegions.length} ภาค, {selectedDistricts.length} เขต, {selectedBranches.length} สาขา</p>
      </CardContent>
    </Card>
  );
};

/* ---------- OpinionCard ---------- */
const mainCategories = [
  "เลือกทั้งหมด",
  "Market Conduct",
  "กระบวนการให้บริการ",
  "ความประทับใจอื่นๆ",
  "เงื่อนไขผลิตภัณฑ์",
  "พนักงานและบุคลากร",
  "ระบบธนาคารและเทคโนโลยี",
  "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
];
const subCategories = [
  "เลือกทั้งหมด",
  "การบังคับ",
  "การรบกวน",
  "การหลอกลวง",
  "การเอาเปรียบ",
  "ขั้นตอนการให้บริการ",
  "ความพร้อมในการให้บริการ",
  "ภาระเอกสาร",
  "อื่นๆ",
  "เกณฑ์การอนุมัติ",
  "ความเรียบง่ายข้อมูล",
  "ระยะเวลาอนุมัติ",
  "รายละเอียดผลิตภัณฑ์",
  "การจัดการและแก้ไขปัญหาเฉพาะหน้า",
  "ความถูกต้องในการให้บริการ",
  "ความประทับใจในการให้บริการ",
  "ความรวดเร็วในการให้บริการ",
  "ความสามารถในการตอบคำถามหรือให้คำแนะนำ",
  "ความสุภาพและมารยาทของพนักงาน",
  "ความเอาใจใส่ในการให้บริการลูกค้า",
  "รปภ. แม่บ้าน ฯลฯ",
  "ATM ADM CDM",
  "เครื่องนับเงิน",
  "เครื่องปรับสมุด",
  "เครื่องออกบัตรคิว",
  "ระบบ Core ของธนาคาร",
  "ระบบยืนยันตัวตน",
  "แอปพลิเคชั่น MyMo",
  "ความสะอาด",
  "ทำเลพื้นที่และความคับคั่ง",
  "ที่จอดรถ",
  "ที่นั่งรอ",
  "ป้าย-สื่อประชาสัมพันธ์",
  "สิ่งอำนวยความสะดวกอื่นๆ",
  "เสียง",
  "แสงสว่าง",
  "ห้องน้ำ",
  "อุณหภูมิ",
];

const OpinionCard: React.FC = () => {
  const [selectedMainCategories, setSelectedMainCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  return (
    <Card className="bg-white rounded-2xl shadow-card border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold font-kanit text-gray-800">ความคิดเห็น</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => { setSelectedMainCategories([]); setSelectedSubCategories([]); }} className="h-8 w-8 rounded-xl hover:bg-gray-100">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CFMultiSelect label="หมวดหมู่" options={mainCategories} selectedItems={selectedMainCategories} onSelectionChange={setSelectedMainCategories} />
        <CFMultiSelect label="หมวดย่อย" options={subCategories} selectedItems={selectedSubCategories} onSelectionChange={setSelectedSubCategories} />
        <p className="text-xs text-gray-500 font-kanit mt-4">เลือกแล้ว: {selectedMainCategories.length} หมวดหมู่, {selectedSubCategories.length} หมวดย่อย</p>
      </CardContent>
    </Card>
  );
};

/* ---------- TransactionTypeCard ---------- */
const transactionTypesList = ["เลือกทั้งหมด", "ฝาก-ถอนเงิน/สลาก", "ชำระสินเชื่อ/ชำระค่าสินค้าและบริการ", "สมัครใช้บริการ เงินฝาก/สินเชื่อ/MyMo/บัตร", "สอบถาม/ขอคำปรึกษา", "อื่น ๆ"];
const TransactionTypeCard: React.FC = () => {
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<string[]>([]);
  return (
    <Card className="bg-white rounded-2xl shadow-card border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold font-kanit text-gray-800">ประเภทธุรกรรม</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setSelectedTransactionTypes([])} className="h-8 w-8 rounded-xl hover:bg-gray-100">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CFMultiSelect label="ประเภทธุรกรรม" options={transactionTypesList} selectedItems={selectedTransactionTypes} onSelectionChange={setSelectedTransactionTypes} />
        <p className="text-xs text-gray-500 font-kanit mt-4">เลือกแล้ว: {selectedTransactionTypes.length} ประเภท</p>
      </CardContent>
    </Card>
  );
};


type ChipTone = "neutral" | "green" | "red" | "blue";

const DIVISION_OPTIONS = ["สายกิจ 1","สายกิจ 2","สายกิจ 3","สายกิจ 4","สายกิจ 5","สายกิจ 6"];
const REGION_OPTIONS = ["ภาค 1","ภาค 2","ภาค 3","ภาค 4","ภาค 5","ภาค 6","ภาค 7","ภาค 8","ภาค 9","ภาค 10","ภาค 11","ภาค 12","ภาค 13","ภาค 14","ภาค 15","ภาค 16","ภาค 17","ภาค 18"];
const DISTRICT_OPTIONS = ["บางเขน","ราชวัตร","สะพานใหม่","ห้วยขวาง","คลองจั่น","ถนนเพชรบุรี","บางกอกใหญ่","แม่สาย","กลัตุ","หลังสวน","ท่าพระ"];
const BRANCH_OPTIONS = ["สำนักพลโยธิน","กริมพลาช่า (วังหิน)","จตุจักร","เซ็นทรัล ลาดพร้าว","ตลาด อ.ต.ก.","เตาปูน","ปัตตานี","ท่าพระ","หลังสวน","เชียงราย","ท่าแซะ/ท่าโมง"];
const CAT_MAIN_OPTIONS = ["Market Conduct","กระบวนการให้บริการ","ความประทับใจอื่นๆ","เงื่อนไขผลิตภัณฑ์","พนักงานและบุคลากร","ระบบธนาคารและเทคโนโลยี","อื่นๆ"];
const CAT_SUB_OPTIONS = ["การบังคับ","การรบกวน","การหลอกลวง","การเอาเปรียบ","ขั้นตอนการให้บริการ","ความพร้อมในการให้บริการ","การชี้นำ","การเลือกปฏิบัติ","การเก็บค่าธรรมเนียม","ข้อมูลไม่ครบถ้วน"];
const TRANSACTION_OPTIONS = ["ฝาก-ถอนเงิน/สลาก","ชำระสินเชื่อ/ชำระค่าสินค้าและบริการ","สมัครใช้บริการ เงินฝาก/สินเชื่อ/MyMo/บัตร","สอบถาม/ขอคำปรึกษา","อื่น ๆ"];
const TIME_MODE_OPTIONS = ["ทั้งหมด","ข้อมูลประจำเดือน","ช่วงเวลาย้อนหลัง","กำหนดช่วงเวลาเอง"];
const MONTH_OPTIONS = ["ม.ค. 68","ก.พ. 68","มี.ค. 68","เม.ย. 68","พ.ค. 68","มิ.ย. 68","ก.ค. 68","ส.ค. 68","ก.ย. 68","ต.ค. 68","พ.ย. 68","ธ.ค. 68","ม.ค. 67","ก.พ. 67"];
const DURATION_OPTIONS = ["1 วัน","7 วัน","14 วัน","1 เดือน","3 เดือน","6 เดือน","1 ปี"];

const AREA_DATA: Record<string,{ regions: string[]; districts: string[]; branches: string[] }> = {
  "สายกิจ 1": { regions:["ภาค 1","ภาค 2","ภาค 3"], districts:["บางเขน","ราชวัตร","สะพานใหม่","ห้วยขวาง","คลองจั่น","ถนนเพชรบุรี","บางกอกใหญ่","ท่าพระ"], branches:["สำนักพลโยธิน","กริมพลาช่า (วังหิน)","จตุจักร","เซ็นทรัล ลาดพร้าว","ตลาด อ.ต.ก.","เตาปูน"] },
  "สายกิจ 2": { regions:["ภาค 4","ภาค 5","ภาค 6"], districts:["แม่สาย","หลังสวน","กลัตุ"], branches:["ปัตตานี","ท่าพระ","หลังสวน","เชียงราย","ท่าแซะ/ท่าโมง"] },
  "สายกิจ 3": { regions:["ภาค 7","ภาค 8"], districts:["บางกอกใหญ่","คลองจั่น"], branches:["ปัตตานี","ท่าพระ"] },
  "สายกิจ 4": { regions:["ภาค 9","ภาค 10"], districts:["ห้วยขวาง"], branches:["เชียงราย"] },
  "สายกิจ 5": { regions:["ภาค 11","ภาค 12"], districts:["บางเขน"], branches:["สำนักพลโยธิน"] },
  "สายกิจ 6": { regions:["ภาค 13","ภาค 14","ภาค 15","ภาค 16","ภาค 17","ภาค 18"], districts:["กลัตุ","หลังสวน"], branches:["ท่าแซะ/ท่าโมง"] },
};

type Complaint = { id:number; region:string; zone:string; branch:string; datetime:string; text:string; tags:string[]; };

const COMPLAINTS: Complaint[] = [
  { id:1, region:"ภาค16", zone:"เขต กลัตุ", branch:"ปัตตานี", datetime:"2025-06-10T09:14:00", text:"พนักงานพูดจาไม่ดี", tags:["ความเอาใจใส่ในการให้บริการลูกค้า"] },
  { id:2, region:"ภาค3", zone:"เขต บางกอกใหญ่", branch:"ท่าพระ", datetime:"2025-05-27T14:13:00", text:"รอคิวนานมาก", tags:["ความรวดเร็วในการให้บริการ"] },
  { id:3, region:"ภาค16", zone:"เขต หลังสวน", branch:"หลังสวน", datetime:"2025-05-06T14:35:00", text:"ข้อมูลสับสน ไม่ชัดเจน", tags:["ความถูกต้องในการให้บริการ"] },
  { id:4, region:"ภาค16", zone:"เขต ท่าพระ", branch:"ท่าแซะ/ท่าโมง", datetime:"2025-04-29T10:07:00", text:"ระบบล่มบ่อย", tags:["ความรวดเร็วในการให้บริการ"] },
  { id:5, region:"ภาค9", zone:"เขต แม่สาย", branch:"เชียงราย", datetime:"2025-04-15T11:23:00", text:"ที่จอดรถไม่พอ", tags:["สภาพแวดล้อมสาขา"] },
];

const pad2 = (n:number)=> (n<10?`0${n}`:`${n}`);
const todayISO = ()=>{ const d=new Date(); return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; };
const fmtTH = (iso:string)=> new Intl.DateTimeFormat("th-TH",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(iso));

/* -------------------------------- Reusable UI -------------------------------- */

function Chip({ children, tone="neutral" }: { children:React.ReactNode; tone?:ChipTone }) {
  const toneClass =
    tone==="red" ? "bg-rose-100 text-rose-700"
    : tone==="green" ? "bg-green-100 text-green-700"
    : tone==="blue" ? "bg-blue-100 text-blue-700"
    : "bg-neutral-100 text-neutral-700";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-medium ${toneClass}`}>{children}</span>;
}

function SelectBare({ label, value, onChange, options }:{
  label?:string; value:string; onChange:(v:string)=>void; options:string[];
}) {
  return (
    <div className="relative">
      {label && <div className="mb-1.5 text-[13px] text-neutral-600">{label}</div>}
      <select
        className="w-full appearance-none rounded-2xl border border-neutral-200 bg-white px-3.5 py-2.5 pr-9 text-[14px] text-neutral-800 shadow-sm focus:border-pink-400 focus:ring-2 focus:ring-[#ff5fbf]"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      >
        {options.map(op=> <option key={op} value={op}>{op}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}

function MultiSelect({
  label, options, selected, onChange, searchPlaceholder="ค้นหา...", resetKey=0
}:{
  label?:string; options:string[]; selected:string[]; onChange:(vals:string[])=>void; searchPlaceholder?:string; resetKey?:number;
}) {
  const [open,setOpen] = useState(false);
  const [q,setQ] = useState("");
  useEffect(()=>{ setOpen(false); setQ(""); },[resetKey]);

  const filtered = useMemo(()=> options.filter(o=>o.toLowerCase().includes(q.toLowerCase())),[options,q]);
  const allSelected = selected.length===options.length;
  const noneSelected = selected.length===0;
  const displayText = allSelected? "ทั้งหมด" : noneSelected? "ไม่ได้เลือก" : selected.length<=3? selected.join(", ") : `เลือกแล้ว ${selected.length} รายการ`;

  const toggleOne = (op:string)=> selected.includes(op) ? onChange(selected.filter(s=>s!==op)) : onChange([...selected, op]);
  const toggleAll = ()=> onChange(allSelected? [] : [...options]);

  return (
    <div className="relative" tabIndex={-1} onBlur={(e)=>{ if(!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      {label && <div className="mb-1.5 text-[13px] text-neutral-600">{label}</div>}
      <button
        type="button"
        onClick={()=>setOpen(o=>!o)}
        className={`w-full rounded-2xl border border-neutral-200 bg-white px-3.5 py-2.5 pr-9 text-left text-[14px] text-neutral-800 shadow-sm focus:border-pink-400 focus:ring-2 focus:ring-[#ff5fbf] ${open? "ring-2 ring-[#ff5fbf]":""}`}
      >
        {displayText}
        <ChevronDown className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400 transition-transform ${open? "rotate-180":""}`} />
      </button>
      {open && (
        <div className="z-20 mt-2 w-full rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg">
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder={searchPlaceholder}
            className="mb-2 w-full rounded-2xl border border-pink-200 px-3 py-2 text-[14px] placeholder-neutral-500 focus:border-pink-400 focus:ring-2 focus:ring-[#ff5fbf]"
          />
          <button type="button" onClick={toggleAll} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[14px] hover:bg-neutral-50">
            <input type="checkbox" checked={allSelected} readOnly className="h-4 w-4 rounded-sm border-neutral-300 accent-[#ff5fbf]" />
            <span>เลือกทั้งหมด</span>
          </button>
          <div className="max-h-56 space-y-1 overflow-auto pr-1">
            {filtered.map(op=>(
              <button key={op} type="button" onClick={()=>toggleOne(op)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[14px] hover:bg-neutral-50">
                <input type="checkbox" checked={selected.includes(op)} readOnly className="h-4 w-4 rounded-sm border-neutral-300 accent-[#ff5fbf]" />
                <span>{op}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Page Component ------------------------------ */

export default function StrongComplaintsDashboardPage() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [flowOpen, setFlowOpen] = useState(false);

  // Initial states
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([...DIVISION_OPTIONS]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([...REGION_OPTIONS]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([...DISTRICT_OPTIONS]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([...BRANCH_OPTIONS]);
  const [selectedCatMains, setSelectedCatMains] = useState<string[]>([...CAT_MAIN_OPTIONS]);
  const [selectedCatSubs, setSelectedCatSubs] = useState<string[]>([...CAT_SUB_OPTIONS]);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([...TRANSACTION_OPTIONS]);
  const [resetKey, setResetKey] = useState(0);

  const [timeMode, setTimeMode] = useState<string>("ทั้งหมด");
  const [selectedMonth, setSelectedMonth] = useState<string>("ก.ย. 68");
  const [duration, setDuration] = useState<string>("7 วัน");
  const [startDate, setStartDate] = useState<string>(todayISO());
  const [endDate, setEndDate] = useState<string>(todayISO());

  // Division → Area logic
  useEffect(() => {
    if (selectedDivisions.length === 1) {
      const d = selectedDivisions[0];
      const a = AREA_DATA[d];
      if (a) {
        setSelectedRegions([...a.regions]);
        setSelectedDistricts([...a.districts]);
        setSelectedBranches([...a.branches]);
      }
    } else {
      setSelectedRegions([...REGION_OPTIONS]);
      setSelectedDistricts([...DISTRICT_OPTIONS]);
      setSelectedBranches([...BRANCH_OPTIONS]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDivisions]);

  // Filter results
  const filteredComplaints = useMemo(() => {
    const regionsNormalized = selectedRegions.map(r => r.replace(/\s+/g,""));
    return COMPLAINTS.filter(c => {
      const regionOK = regionsNormalized.includes(c.region.replace(/\s+/g,""));
      const zoneOK = selectedDistricts.some(d => c.zone.includes(d));
      const branchOK = selectedBranches.includes(c.branch);
      return regionOK && zoneOK && branchOK;
    });
  }, [selectedRegions, selectedDistricts, selectedBranches]);

  const foundCount = filteredComplaints.length;

  const handleResetFilters = () => {
    setSelectedDivisions([...DIVISION_OPTIONS]);
    setSelectedRegions([...REGION_OPTIONS]);
    setSelectedDistricts([...DISTRICT_OPTIONS]);
    setSelectedBranches([...BRANCH_OPTIONS]);
    setSelectedCatMains([...CAT_MAIN_OPTIONS]);
    setSelectedCatSubs([...CAT_SUB_OPTIONS]);
    setSelectedTransactions([...TRANSACTION_OPTIONS]);

    setTimeMode("ทั้งหมด");
    setSelectedMonth("ก.ย. 68");
    setDuration("7 วัน");
    const t = todayISO();
    setStartDate(t); setEndDate(t);

    setResetKey(k=>k+1);
    try { window.scrollTo({ top:0, behavior:"smooth" }); } catch {}
  };

  const handleLogout = () => navigate("/");

  return (
    <div className="min-h-screen bg-background">
      {/* Mini Rail Sidebar (เหมือน Dashboard) */}
      <MiniRailSidebar onToggleMainSidebar={() => setDrawerOpen(true)} />

      {/* Topbar — ใช้ className เดียวกับ Dashboard */}
      <header className="topbar px-6">
        <div className="w-full">
          <div className="flex items-center justify-between relative z-10">
            {/* Drawer (Sheet) เฉพาะ mobile */}
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <div className="md:hidden">
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 w-11 h-11 rounded-2xl"
                    aria-label="เปิดเมนู"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </div>

              <SheetContent side="left" className="w-80 md:ml-[72px]">
                <SheetHeader className="flex flex-row items-center justify-between">
                  <SheetTitle className="font-kanit">เมนูหลัก</SheetTitle>
                </SheetHeader>

                <div className="mt-6">
                  <MenuItems onItemClick={() => setDrawerOpen(false)} />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-muted-foreground text-center font-kanit">
                    อัพเดตล่าสุด: 31/08/2025 · 09:49 น.
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Left (title & subtitle) */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white font-kanit mb-2">
                Dashboard ข้อเสนอแนะ ข้อร้องเรียน การใช้บริการสาขา
              </h1>
              <p className="text-white/80 font-kanit text-base">
                รวบรวมและวิเคราะห์ความคิดเห็นและข้อเสนอแนะจากลูกค้า
              </p>
            </div>

            {/* Right (updated + actions) */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white text-base font-kanit">อัปเดตล่าสุด: 31/08/2025&nbsp; 09:49 น.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-pink-400/30 w-10 h-10 rounded-full border border-white/20"
                  aria-label="รีเฟรช"
                  onClick={() => setFlowOpen(true)}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-white hover:bg-pink-400/30 flex items-center gap-2 font-kanit px-4 py-2 rounded-full border border-white/20 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  ออกจากระบบ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content — container/padding เหมือน Dashboard */}
      <main className="main-content transition-all duration-200 ease-out min-h-screen">
        <div className="container mx-auto p-6 space-y-8">
          {/* หัวเรื่อง + ปุ่มรีเซ็ต */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground font-kanit mb-2">ข้อร้องเรียนที่รุนแรง</h2>
              <p className="text-muted-foreground font-kanit">ติดตามและจัดการข้อร้องเรียนที่มีความรุนแรงสูงและต้องการความสนใจเป็นพิเศษ</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* ซ้าย: ฟิลเตอร์ */}
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 space-y-6">
              <ServiceAreaCard />
              <TimePeriodCard />
              <OpinionCard />
              <TransactionTypeCard />
            </div>

            {/* ขวา: รายการร้องเรียน */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <Card className="rounded-2xl border shadow-card bg-white overflow-hidden">
                <div className="h-2 rounded-t-2xl" style={{ background: "var(--gradient-pink-strip)" }} />
                <CardHeader className="pb-4 pt-5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-kanit text-xl font-bold text-foreground">ข้อร้องเรียนที่รุนแรง</CardTitle>
                    <span className="text-sm text-muted-foreground font-kanit">พบ {foundCount} รายการ</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 max-h-[65vh] lg:max-h-[calc(100vh-280px)] overflow-y-auto pr-2 overscroll-contain">
                    {filteredComplaints.map(c=>(
                      <article key={c.id} className="rounded-xl border border-neutral-200 bg-rose-50 p-4 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="text-[14px] text-neutral-800 font-kanit">
                            <span className="font-medium">{c.region}</span> • {c.zone} • {c.branch}
                          </div>
                          <div className="text-[12px] text-neutral-600 font-kanit">{fmtTH(c.datetime)}</div>
                        </div>
                        <div className="text-[14px] text-neutral-900 font-kanit">{c.text}</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {c.tags.map((t,i)=> <Chip key={i} tone="red">{t}</Chip>)}
                        </div>
                      </article>
                    ))}
                    {filteredComplaints.length===0 && (
                      <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center text-[14px] text-neutral-600 font-kanit">
                        ไม่พบรายการตามตัวกรอง
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer — เหมือน Dashboard */}
      <footer style={{ backgroundColor: "#ECEFF1" }} className="border-t border-border py-3 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
              <span className="text-sm text-muted-foreground font-kanit">© 2024 Customer Dashboard. สงวนลิขสิทธิ์.</span>
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
                <a href="#" className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200">นโยบายความเป็นส่วนตัว</a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <a href="#" className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200">เงื่อนไขการใช้งาน</a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <a href="#" className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200">ติดต่อเรา</a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <span className="text-sm text-muted-foreground font-kanit">เวอร์ชัน 2.1.0</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer — ปุ่ม gradient เหมือน Dashboard */}
      <div className="md:hidden px-6 py-4">
        <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] overflow-hidden mx-auto">
          <div className="h-2 bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3]"></div>
          <div className="p-4">
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 mb-4">
              <a href="#" className="block bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3] text-white font-kanit font-medium text-center py-3 px-2 rounded-xl hover:opacity-95 hover:shadow-lg transition-all duration-200">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="block bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3] text-white font-kanit font-medium text-center py-3 px-2 rounded-xl hover:opacity-95 hover:shadow-lg transition-all duration-200">เงื่อนไขการใช้งาน</a>
              <a href="#" className="block bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3] text-white font-kanit font-medium text-center py-3 px-2 rounded-xl hover:opacity-95 hover:shadow-lg transition-all duration-200">ติดต่อเรา</a>
            </div>
            <div className="text-center space-y-1">
              <div className="text-xs text-[#6B7280] font-kanit leading-relaxed">© 2024 Customer Dashboard. สงวนลิขสิทธิ์.</div>
              <div className="text-xs text-[#6B7280] font-kanit leading-relaxed">เวอร์ชัน 2.1.0</div>
            </div>
          </div>
        </div>
      </div>
      <FeedbackFlowModal
        open={flowOpen}
        onOpenChange={setFlowOpen}
        hideInternalTrigger
      />
    </div>
  );
}
