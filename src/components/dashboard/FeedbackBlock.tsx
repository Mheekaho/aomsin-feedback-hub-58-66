import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const sentimentData = [
  { name: "เชิงบวก", value: 72.3, count: 892, color: "#20A161" },
  { name: "เชิงลบ", value: 27.7, count: 342, color: "#D14343" },
];

// Main topics to sub-topics mapping
const mainTopicsMapping: Record<string, string[]> = {
  "พนักงานและบุคลากร": [
    "ความสุภาพและมารยาทของพนักงาน",
    "ความเอาใจใส่ในการให้บริการลูกค้า",
    "ความสามารถในการตอบคำถามหรือให้คำแนะนำ",
    "ความถูกต้องในการให้บริการ",
    "ความรวดเร็วในการให้บริการ",
    "ความเป็นมืออาชีพและการแก้ไขปัญหาเฉพาะหน้า",
    "ความประทับใจในการให้บริการ",
    "รปภ",
    "แม่บ้าน",
  ],
  "ระบบและกระบวนการให้บริการ": [
    "ความพร้อมในการให้บริการ",
    "กระบวนการให้บริการ ความเป็นธรรมให้บริการ",
    "ระบบเรียกคิวและจัดการคิว",
    "ภาระเอกสาร",
  ],
  "เทคโนโลยีและดิจิทัล": [
    "ระบบ Core ของธนาคาร",
    "เครื่องออกบัตรคิว",
    "ATM ADM CDM",
    "E-KYC Scanner",
    "แอพพลิเคชั่น MyMo",
    "เครื่องปรับสมุด",
    "เครื่องนับเงิน",
  ],
  "เงื่อนไขและผลิตภัณฑ์": [
    "รายละเอียด ผลิตภัณฑ์",
    "เงื่อนไขอนุมัติ",
    "ระยะเวลาอนุมัติ",
    "ความยืดหยุ่น",
    "ความเรียบง่ายข้อมูล",
  ],
  "สภาพแวดล้อมและสิ่งอำนวยความสะดวก": [
    "ความสะอาด",
    "พื้นที่และความคับคั่ง",
    "อุณหภูมิ",
    "โต๊ะรับบริการ",
    "จุดรอรับบริการ",
    "แสง",
    "เสียง",
    "ห้องน้ำ",
    "ที่จอดรถ",
    "ป้าย-สื่อประชาสัมพันธ์",
    "สิ่งอำนวยความสะดวกอื่นๆ",
  ],
  "Market Conduct": ["ไม่หลอกลวง", "ไม่เอาเปรียบ", "ไม่บังคับ", "ไม่รบกวน"],
  "ความประทับใจอื่นๆ": ["ความประทับใจอื่นๆ"],
};

// Extended topics data with main category mapping
const topicsData = [
  { main: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก", sub: "แสง", negative_count: 158, positive_count: 349 },
  { main: "พนักงานและบุคลากร", sub: "ความเอาใจใส่ในการให้บริการลูกค้า", negative_count: 48, positive_count: 288 },
  { main: "พนักงานและบุคลากร", sub: "ความสามารถในการตอบคำถามหรือให้คำแนะนำ", negative_count: 37, positive_count: 294 },
  { main: "เงื่อนไขและผลิตภัณฑ์", sub: "ความเรียบง่ายข้อมูล", negative_count: 40, positive_count: 279 },
  { main: "ระบบและกระบวนการให้บริการ", sub: "ความพร้อมในการให้บริการ", negative_count: 30, positive_count: 278 },
  { main: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก", sub: "ที่จอดรถ", negative_count: 119, positive_count: 264 },
  { main: "เทคโนโลยีและดิจิทัล", sub: "เครื่องออกบัตรคิว", negative_count: 142, positive_count: 245 },
  { main: "พนักงานและบุคลากร", sub: "ความประทับใจในการให้บริการ", negative_count: 151, positive_count: 241 },
  { main: "Market Conduct", sub: "ไม่เอาเปรียบ", negative_count: 47, positive_count: 229 },
  { main: "เงื่อนไขและผลิตภัณฑ์", sub: "ระยะเวลาอนุมัติ", negative_count: 152, positive_count: 78 },
  { main: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก", sub: "พื้นที่และความคับคั่ง", negative_count: 39, positive_count: 155 },
  { main: "เทคโนโลยีและดิจิทัล", sub: "E-KYC Scanner", negative_count: 114, positive_count: 188 },
  { main: "Market Conduct", sub: "ไม่บังคับ", negative_count: 35, positive_count: 152 },
  { main: "Market Conduct", sub: "ไม่รบกวน", negative_count: 30, positive_count: 112 },
  { main: "เทคโนโลยีและดิจิทัล", sub: "เครื่องปรับสมุด", negative_count: 124, positive_count: 135 },
  { main: "พนักงานและบุคลากร", sub: "ความถูกต้องในการให้บริการ", negative_count: 28, positive_count: 127 },
  { main: "เงื่อนไขและผลิตภัณฑ์", sub: "รายละเอียด ผลิตภัณฑ์", negative_count: 146, positive_count: 120 },
  { main: "เทคโนโลยีและดิจิทัล", sub: "ระบบ Core ของธนาคาร", negative_count: 47, positive_count: 118 },
  { main: "เทคโนโลยีและดิจิทัล", sub: "ATM ADM CDM", negative_count: 66, positive_count: 48 },
  { main: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก", sub: "จุดรอรับบริการ", negative_count: 125, positive_count: 62 },
  { main: "พนักงานและบุคลากร", sub: "ความสุภาพและมารยาทของพนักงาน", negative_count: 85, positive_count: 195 },
  { main: "พนักงานและบุคลากร", sub: "ความรวดเร็วในการให้บริการ", negative_count: 92, positive_count: 178 },
  { main: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก", sub: "ความสะอาด", negative_count: 45, positive_count: 210 },
  { main: "ระบบและกระบวนการให้บริการ", sub: "ระบบเรียกคิวและจัดการคิว", negative_count: 98, positive_count: 134 },
  { main: "เทคโนโลยีและดิจิทัล", sub: "แอพพลิเคชั่น MyMo", negative_count: 73, positive_count: 89 },
];

export const FeedbackBlock = () => {
  const [selectedFilter, setSelectedFilter] = useState<"none" | "positive" | "negative">("positive");

  // Main topics filter state - all selected by default
  const [selectedMainTopics, setSelectedMainTopics] = useState<string[]>(Object.keys(mainTopicsMapping));

  // Sorting states for butterfly chart (แดง=ซ้าย, เขียว=ขวา)
  const [leftSortDirection, setLeftSortDirection] = useState<"asc" | "desc">("desc"); // มาก→น้อย
  const [rightSortDirection, setRightSortDirection] = useState<"asc" | "desc">("desc"); // มาก→น้อย

  // Filtered topics data based on selected main topics
  const filteredTopicsData = useMemo(() => {
    if (selectedMainTopics.length === 0) return topicsData;
    return topicsData.filter((item) => selectedMainTopics.includes(item.main));
  }, [selectedMainTopics]);

  // Determine if we should show all sub-topics (single main topic) or top 10 (multiple)
  const shouldShowAllSubTopics = selectedMainTopics.length === 1;

  // Base data for butterfly chart (before sorting)
  const baseChartData = useMemo(() => {
    if (shouldShowAllSubTopics) {
      // Case A: Single main topic selected - show all sub-topics
      return filteredTopicsData.map((item) => ({
        topic: item.sub,
        negative: -item.negative_count, // negative for left bar
        positive: item.positive_count,
        leftTopic: item.sub,
        rightTopic: item.sub,
      }));
    } else {
      // Case B: Multiple main topics - show top 10 by total count
      const sortedByTotal = [...filteredTopicsData]
        .sort(
          (a, b) =>
            b.positive_count + b.negative_count - (a.positive_count + a.negative_count),
        )
        .slice(0, 10);

      return sortedByTotal.map((item) => ({
        topic: item.sub,
        negative: -item.negative_count,
        positive: item.positive_count,
        leftTopic: item.sub,
        rightTopic: item.sub,
      }));
    }
  }, [filteredTopicsData, shouldShowAllSubTopics]);

  // Memoized sorted data for left and right sides independently
  const sortedLeftTopics = useMemo(() => {
    const sorted = [...baseChartData].sort((a, b) => {
      const aValue = Math.abs(a.negative);
      const bValue = Math.abs(b.negative);
      return leftSortDirection === "desc" ? bValue - aValue : aValue - bValue;
    });
    return sorted;
  }, [baseChartData, leftSortDirection]);

  const sortedRightTopics = useMemo(() => {
    const sorted = [...baseChartData].sort((a, b) => {
      return rightSortDirection === "desc" ? b.positive - a.positive : a.positive - b.positive;
    });
    return sorted;
  }, [baseChartData, rightSortDirection]);

  // Combine into butterfly rows
  const butterflyData = useMemo(() => {
    const maxLength = Math.max(sortedLeftTopics.length, sortedRightTopics.length);
    const combined: {
      topic: string;
      negative: number;
      positive: number;
      leftTopic: string;
      rightTopic: string;
    }[] = [];

    for (let i = 0; i < maxLength; i++) {
      const leftItem = sortedLeftTopics[i];
      const rightItem = sortedRightTopics[i];
      combined.push({
        topic: leftItem?.topic || rightItem?.topic || "",
        negative: leftItem?.negative || 0,
        positive: rightItem?.positive || 0,
        leftTopic: leftItem?.topic || "",
        rightTopic: rightItem?.topic || "",
      });
    }
    return combined;
  }, [sortedLeftTopics, sortedRightTopics]);

  // Checkbox handlers
  const handleMainTopicToggle = (topic: string) => {
    setSelectedMainTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
  };
  const handleSelectAll = () => {
    if (selectedMainTopics.length === Object.keys(mainTopicsMapping).length) {
      setSelectedMainTopics([]); // deselect all
    } else {
      setSelectedMainTopics(Object.keys(mainTopicsMapping)); // select all
    }
  };

};
