import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";

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

export const FeedbackBlock = () => {
  const { loading, error, sentimentData, topicData } = useSupabaseData();
  const [selectedFilter, setSelectedFilter] = useState<"none" | "positive" | "negative">("positive");

  // Main topics filter state - all selected by default
  const [selectedMainTopics, setSelectedMainTopics] = useState<string[]>(Object.keys(mainTopicsMapping));

  // Sorting states for butterfly chart (แดง=ซ้าย, เขียว=ขวา)
  const [leftSortDirection, setLeftSortDirection] = useState<"asc" | "desc">("desc"); // มาก→น้อย
  const [rightSortDirection, setRightSortDirection] = useState<"asc" | "desc">("desc"); // มาก→น้อย

  // Filtered topics data based on selected main topics
  const filteredTopicsData = useMemo(() => {
    if (selectedMainTopics.length === 0) return topicData;
    return topicData.filter((item) => selectedMainTopics.includes(item.main));
  }, [selectedMainTopics, topicData]);

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

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="rounded-2xl border shadow-card bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-tertiary" />
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="rounded-2xl border shadow-card bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-red-500" />
        <CardHeader>
          <CardTitle className="font-kanit text-xl font-bold text-red-600">
            เกิดข้อผิดพลาด: {error}
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  // Generate sentiment data from Supabase data
  const sentimentChartData = sentimentData ? [
    { 
      name: "เชิงบวก", 
      value: sentimentData.positive, 
      count: sentimentData.positiveCount, 
      color: "#20A161" 
    },
    { 
      name: "เชิงลบ", 
      value: sentimentData.negative, 
      count: sentimentData.negativeCount, 
      color: "#D14343" 
    },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="rounded-2xl border shadow-card bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-tertiary" />
        <CardHeader>
          <CardTitle className="font-kanit text-xl font-bold text-foreground">
            การวิเคราะห์ความเห็น
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Sentiment Pie Chart */}
        <Card className="rounded-2xl border shadow-card bg-white">
          <CardHeader>
            <CardTitle className="font-kanit text-lg font-semibold text-center">
              สัดส่วนความเห็น
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {sentimentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `${value}% (${sentimentChartData.find(d => d.name === name)?.count || 0} ความเห็น)`,
                      name
                    ]}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontFamily: 'Kanit'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right: Topic Filters and Data */}
        <Card className="rounded-2xl border shadow-card bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-kanit text-lg font-semibold">
                หัวข้อความเห็น
              </CardTitle>
              
              {/* Topic Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-kanit">กรอง ({selectedMainTopics.length})</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-kanit font-medium">เลือกหัวข้อหลัก</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSelectAll}
                        className="h-auto p-1 font-kanit text-xs"
                      >
                        {selectedMainTopics.length === Object.keys(mainTopicsMapping).length
                          ? "ไม่เลือกทั้งหมด"
                          : "เลือกทั้งหมด"}
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {Object.keys(mainTopicsMapping).map((topic) => (
                        <div key={topic} className="flex items-center space-x-2">
                          <Checkbox
                            id={topic}
                            checked={selectedMainTopics.includes(topic)}
                            onCheckedChange={() => handleMainTopicToggle(topic)}
                          />
                          <label
                            htmlFor={topic}
                            className="text-sm font-kanit cursor-pointer flex-1"
                          >
                            {topic}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground font-kanit">
              แสดงข้อมูล {filteredTopicsData.length} หัวข้อ
              {filteredTopicsData.length === 0 && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  ไม่มีข้อมูลสำหรับหัวข้อที่เลือก
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};