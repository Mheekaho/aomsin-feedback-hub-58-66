import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TopicFilterDropdown } from "@/components/dashboard/TopicFilterDropdown";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { HelpCircle, X } from "lucide-react";

const SatisfactionInfoDialog: React.FC = () => {
  const rows = [
    { score: 5, avg: "4.51 – 5.00",  pct: "90.00 – 100.00", label: "มากที่สุด" },
    { score: 4, avg: "3.51 – 4.50",  pct: "70.00 – 90.00",  label: "มาก" },
    { score: 3, avg: "2.51 – 3.50",  pct: "50.00 – 70.00",  label: "ปานกลาง" },
    { score: 2, avg: "1.51 – 2.50",  pct: "30.00 – 50.00",  label: "น้อย" },
    { score: 1, avg: "1.00 – 1.50",  pct: "20.00 – 30.00",  label: "น้อยที่สุด" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="เกณฑ์ระดับความพึงพอใจ"
          className="h-8 w-8 rounded-xl text-[#D8218C] hover:bg-[#FFF1F7]"
          title="เกณฑ์ระดับความพึงพอใจ"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        {/* Header ชมพูเหมือนตัวอย่าง */}
        <div
          className="px-6 py-5 relative"
          style={{ background: "var(--gradient-topbar)" }}
        >
          <DialogHeader className="p-0">
            <DialogTitle className="text-white text-2xl font-bold text-center font-kanit">
              เกณฑ์ระดับความพึงพอใจ
            </DialogTitle>
            <DialogDescription className="text-white/90 text-center font-kanit mt-1">
              การตีความคะแนนเฉลี่ยและสัดส่วนเป็นระดับความพึงพอใจ
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ตารางเกณฑ์ */}
        <div className="p-6">
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  <th className="text-left py-3 px-4 font-kanit text-gray-700">ระดับคะแนน</th>
                  <th className="text-left py-3 px-4 font-kanit text-gray-700">ค่าเฉลี่ย</th>
                  <th className="text-left py-3 px-4 font-kanit text-gray-700">เปอร์เซ็นต์ (%)</th>
                  <th className="text-left py-3 px-4 font-kanit text-gray-700">ระดับความพึงพอใจ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="py-3 px-4">
                      <div className="w-7 h-7 grid place-items-center rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                        {r.score}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-kanit text-gray-900">{r.avg}</td>
                    <td className="py-3 px-4 font-kanit text-gray-900">{r.pct}</td>
                    <td className="py-3 px-4 font-kanit text-gray-900">{r.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ข้อมูลคะแนนความพึงพอใจตามภาค
const satisfactionDataByRegion = {
  "ภาค 1": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.5
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.3
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.2
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.1
  }, {
    criteria: "ความถูกต้องฯ",
    score: 3.5
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.0
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 3.9
  }],
  "ภาค 2": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 3.5
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.2
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.3
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.1
  }, {
    criteria: "ความถูกต้องฯ",
    score: 2.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.2
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 2.5
  }],
  "ภาค 3": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 3.3
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.4
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 3.5
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 3.9
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.6
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.0
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.3
  }],
  "ภาค 4": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 2.4
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.1
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.0
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 3.9
  }, {
    criteria: "ความถูกต้องฯ",
    score: 3.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.1
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.5
  }],
  "ภาค 5": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.4
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.3
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 3.8
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.5
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.7
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.3
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.2
  }],
  "ภาค 6": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.1
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.4
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 3.8
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 3.8
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.6
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.0
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.5
  }],
  "ภาค 7": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.2
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.3
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 2.4
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.1
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.7
  }, {
    criteria: "ความพร้อมฯ",
    score: 3.8
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.3
  }],
  "ภาค 8": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.3
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.2
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 3.8
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.3
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.1
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.4
  }],
  "ภาค 9": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.4
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.1
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.2
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.5
  }, {
    criteria: "ความถูกต้องฯ",
    score: 3.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.0
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.3
  }],
  "ภาค 10": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 2.6
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.3
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.1
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.4
  }, {
    criteria: "ความถูกต้องฯ",
    score: 3.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.2
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.5
  }],
  "ภาค 11": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.1
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.4
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 3.8
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.3
  }, {
    criteria: "ความถูกต้องฯ",
    score: 3.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.1
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.2
  }],
  "ภาค 12": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.3
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.2
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 3.8
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.1
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.3
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.4
  }],
  "ภาค 13": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.4
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.1
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.3
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.2
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.6
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.0
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.3
  }],
  "ภาค 14": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.2
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.4
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 3.8
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.3
  }, {
    criteria: "ความถูกต้องฯ",
    score: 3.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.1
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.2
  }],
  "ภาค 15": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.3
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.2
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.4
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.5
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.6
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.0
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.5
  }],
  "ภาค 16": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 4.1
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.3
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.2
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 2.5
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.7
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.1
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 3.8
  }],
  "ภาค 17": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 3.8
  }, {
    criteria: "ความประทับใจฯ",
    score: 2.7
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.1
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 4.2
  }, {
    criteria: "ความถูกต้องฯ",
    score: 3.8
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.0
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.4
  }],
  "ภาค 18": [{
    criteria: "การดูแล ความเอาใจใส่",
    score: 3.8
  }, {
    criteria: "ความประทับใจฯ",
    score: 4.1
  }, {
    criteria: "ความน่าเชื่อถือฯ",
    score: 4.3
  }, {
    criteria: "ความรวดเร็วฯ",
    score: 3.8
  }, {
    criteria: "ความถูกต้องฯ",
    score: 4.6
  }, {
    criteria: "ความพร้อมฯ",
    score: 4.2
  }, {
    criteria: "สภาพแวดล้อมฯ",
    score: 4.5
  }]
};

// แปลง label สั้น (เรดาร์) → คำอธิบายยาว (ตาราง)
const CRITERIA_LONG_LABELS: Record<string, string> = {
  "การดูแล ความเอาใจใส่": "ความพึงพอใจต่อการดูแล เอาใจใส่ ความสบายใจเมื่อมาใช้บริการ",
  "ความประทับใจฯ": "ความพึงพอใจต่อความประทับใจในการเข้าใช้บริการที่ธนาคารออมสินสาขา",
  "ความน่าเชื่อถือฯ": "ความพึงพอใจต่อการตอบคำถาม ให้คำแนะนำ ความน่าเชื่อถือ ความเป็นมืออาชีพ",
  "ความรวดเร็วฯ": "ความพึงพอใจต่อความรวดเร็วในการให้บริการ (หลังเรียกคิว)",
  "ความถูกต้องฯ": "ความพึงพอใจต่อความถูกต้องในการทำธุรกรรม",
  "ความพร้อมฯ": "ความพึงพอใจต่อความพร้อมของเครื่องมือ เช่น ATM / ADM / Passbook",
  "สภาพแวดล้อมฯ": "ความพึงพอใจต่อสภาพแวดล้อมของสาขา (การจัดพื้นที่ ความสะอาด แสงสว่าง)",
};

// Categories mapping based on the image
const categoryMapping = {
  "เลือกทั้งหมด": "all",
  "การดูแล ความเอาใจใส่": ["การดูแล ความเอาใจใส่"],
  "ความน่าเชื่อถือการตอบคำถามและแนะนำ": ["ความน่าเชื่อถือฯ"],
  "ความรวดเร็วในการให้บริการ": ["ความรวดเร็วฯ"],
  "ความถูกต้องในการทำธุรกรรม": ["ความถูกต้องฯ"],
  "ความพร้อมของเครื่องมือ": ["ความพร้อมฯ"],
  "สภาพแวดล้อมของสาขา": ["สภาพแวดล้อมฯ"],
  "ความประทับใจในการให้บริการ": ["ความประทับใจฯ"]
};

// Helper function to normalize score value
const normalizeScore = (score: number | string): number => {
  if (typeof score === 'string') {
    return parseFloat(score.replace('/5', ''));
  }
  return score;
};

// เปลี่ยนเป็นสูตรตามสเกล 1–5 → 0–100%
const calculatePercentage = (score: number): number => {
  return Math.round((score / 5) * 100);
};

// Get satisfaction level and color
const getSatisfactionLevel = (score: number): {
  level: string;
  color: string;
} => {
  if (score >= 4.51) return {
    level: "มากที่สุด",
    color: "#16A34A"
  };
  if (score >= 3.51) return {
    level: "มาก",
    color: "#16A34A"
  };
  if (score >= 2.51) return {
    level: "ปานกลาง",
    color: "#CA8A04"
  };
  if (score >= 1.51) return {
    level: "น้อย",
    color: "#DC2626"
  };
  return {
    level: "น้อยที่สุด",
    color: "#DC2626"
  };
};
export const SatisfactionBlock = () => {
  const [selectedRegion, setSelectedRegion] =
    useState<keyof typeof satisfactionDataByRegion | "all">("all");

  // ค่าเฉลี่ยทุกภาค (กรณีเลือก "all")
  const calculateAverageData = () => {
    const firstKey = Object.keys(satisfactionDataByRegion)[0] as keyof typeof satisfactionDataByRegion;
    const criteriaNames =
      Object.keys(satisfactionDataByRegion).length > 0
        ? satisfactionDataByRegion[firstKey].map((item) => item.criteria)
        : [];

    return criteriaNames.map((criteria) => {
      const scores = Object.values(satisfactionDataByRegion).map(
        (regionData) => regionData.find((it) => it.criteria === criteria)?.score ?? 0
      );
      const averageScore = scores.reduce((s, v) => s + v, 0) / scores.length;
      return { criteria, score: averageScore };
    });
  };

  // ข้อมูลเรดาร์ (ผูกกับ dropdown ภาค)
  const satisfactionCriteria =
    selectedRegion === "all"
      ? calculateAverageData()
      : satisfactionDataByRegion[selectedRegion];

  // ค่าเฉลี่ยกลางกราฟ
  const averageScore =
    satisfactionCriteria.reduce((sum, item) => sum + item.score, 0) /
    satisfactionCriteria.length;

  // ข้อมูลตาราง (แมพ label สั้น -> คำอธิบายยาว)
  const satisfactionTableData = satisfactionCriteria.map((item) => ({
    criteria: CRITERIA_LONG_LABELS[item.criteria] ?? item.criteria,
    score: item.score,
  }));

  return (
    <div className="relative rounded-xl border border-slate-100 bg-white shadow-sm p-0">
      {/* Single pink header stripe */}
      <div
        className="h-2 rounded-t-2xl"
        style={{ background: "var(--gradient-pink-strip)" }}
      />
      {/* Parent Header */}
      <div className="px-6 py-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="font-kanit text-xl font-bold text-foreground">
            คะแนนความพึงพอใจ
          </h2>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-12 gap-6 items-stretch p-6">
        {/* Radar Chart Card - Left Side */}
        <div className="col-span-12 md:col-span-6">
          <div className="h-full min-h-[520px] rounded-lg border border-slate-100 bg-white flex flex-col">
            <CardHeader className="pb-4 pt-6">
              <div className="grid grid-cols-3 items-center gap-3">
                <div />
                <CardTitle className="font-kanit text-lg font-semibold text-foreground text-center truncate">
                  คะแนนเฉลี่ยตามเกณฑ์
                </CardTitle>
                <div className="justify-self-end">
                  <Select
                    value={selectedRegion}
                    onValueChange={(value) =>
                      setSelectedRegion(
                        value as keyof typeof satisfactionDataByRegion | "all"
                      )
                    }
                  >
                    <SelectTrigger className="w-[140px] bg-white border border-border rounded-lg text-sm font-kanit whitespace-nowrap">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-border rounded-lg shadow-lg z-50">
                      <SelectItem value="all" className="font-kanit">
                        เลือกทั้งหมด
                      </SelectItem>
                      {Object.keys(satisfactionDataByRegion).map((region) => (
                        <SelectItem key={region} value={region} className="font-kanit">
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-6 pt-0">
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="relative h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={satisfactionCriteria}
                          cx="50%"
                          cy="50%"
                          outerRadius="74%"
                        >
                          <PolarGrid stroke="#E5E7EB" strokeOpacity={0.5} />
                          <PolarAngleAxis
                            dataKey="criteria"
                            tick={(props: any) => {
                              const { payload, x, y, textAnchor } = props;
                              const criteriaItem = satisfactionCriteria.find(
                                (it) => it.criteria === payload.value
                              );
                              const score = criteriaItem
                                ? criteriaItem.score.toFixed(1)
                                : "";
                              return (
                                <g>
                                  <text
                                    x={x}
                                    y={y}
                                    textAnchor={textAnchor}
                                    fontSize={18}
                                    fontFamily="Kanit"
                                    fontWeight={400}
                                    fill="#111"
                                    style={{
                                      padding: "16px",
                                      lineHeight: "18px",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <tspan fill="#111">{payload.value}</tspan>
                                    <tspan fill="#D8218C">
                                      {"\u00A0" + score}
                                    </tspan>
                                  </text>
                                </g>
                              );
                            }}
                          />
                          <PolarRadiusAxis
                            angle={90}
                            domain={[0, 5]}
                            tick={false}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Radar
                            name="คะแนน"
                            dataKey="score"
                            stroke="#DF7AB0"
                            fill="#DF7AB0"
                            fillOpacity={0.3}
                            strokeWidth={2}
                            dot={{ r: 4, fill: "#DF7AB0" }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>

                      {/* ค่าเฉลี่ยกลางกราฟ */}
                      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
                        <div className="text-center">
                          <div className="font-kanit text-5xl font-extrabold leading-none text-[#D8218C]">
                            {averageScore.toFixed(1)}
                          </div>
                          <div className="font-kanit text-sm text-gray-500 mt-1">
                            คะแนนเฉลี่ย
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Satisfaction Table Card - Right Side */}
        <div className="col-span-12 md:col-span-6">
          <div className="h-full min-h-[520px] rounded-lg border border-slate-100 bg-white flex flex-col">
            <CardHeader className="pb-4 pt-6">
              <div className="relative">
                <CardTitle className="font-kanit text-lg font-semibold text-foreground text-center">
                  ความพึงพอใจ
                </CardTitle>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <SatisfactionInfoDialog />
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-6 pt-0">
              <div className="flex-1 overflow-auto">
                <div
                  className="overflow-hidden rounded-lg border"
                  style={{ borderColor: "#F1F5F9" }}
                >
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                        <TableHead
                          className="font-kanit font-bold text-gray-700 py-3 px-4 text-left border-b"
                          style={{ borderColor: "#F1F5F9" }}
                        >
                          รายการประเมิน
                        </TableHead>
                        <TableHead
                          className="font-kanit font-bold text-gray-700 py-3 px-4 text-right border-b"
                          style={{ borderColor: "#F1F5F9" }}
                        >
                          คะแนน
                        </TableHead>
                        <TableHead
                          className="font-kanit font-bold text-gray-700 py-3 px-4 text-right border-b"
                          style={{ borderColor: "#F1F5F9" }}
                        >
                          %
                        </TableHead>
                        <TableHead
                          className="font-kanit font-bold text-gray-700 py-3 px-4 text-right border-b"
                          style={{ borderColor: "#F1F5F9" }}
                        >
                          เกณฑ์ระดับความพึงพอใจ
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {satisfactionTableData.map((item, index) => {
                        const normalizedScore = normalizeScore(item.score);
                        const percentage = calculatePercentage(normalizedScore);
                        const { level, color } =
                          getSatisfactionLevel(normalizedScore);

                        return (
                          <TableRow
                            key={index}
                            className="hover:bg-gray-50/30"
                            style={{
                              borderBottom:
                                index < satisfactionTableData.length - 1
                                  ? "1px solid #F1F5F9"
                                  : "none",
                            }}
                          >
                            <TableCell className="font-kanit text-sm text-gray-900 py-3 px-4 leading-relaxed">
                              {item.criteria}
                            </TableCell>

                            <TableCell className="font-kanit text-sm font-medium text-gray-900 py-3 px-4 text-right">
                              {normalizedScore.toFixed(2)}
                            </TableCell>

                            <TableCell
                              className="font-kanit text-sm font-medium py-3 px-4 text-right"
                              style={{ color }}
                            >
                              {percentage}%
                            </TableCell>

                            <TableCell className="py-3 px-4 text-right">
                              <Badge
                                className="font-kanit text-xs font-medium px-2 py-1 rounded-md border-0"
                                style={{ backgroundColor: `${color}15`, color }}
                              >
                                {level}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

// Regional Comparison Component - เปรียบเทียบคะแนนรายภาค
export const RegionalComparisonCard = () => {
  const [filters, setFilters] = useState({
    topic: "all"
  });

  // Calculate filtered data based on selected topic
  const calculateFilteredData = () => {
    const regions = Object.keys(satisfactionDataByRegion);
    return regions.map(region => {
      const regionData = satisfactionDataByRegion[region as keyof typeof satisfactionDataByRegion];
      let score = 0;
      if (filters.topic === "all") {
        // Calculate average of all criteria
        score = regionData.reduce((sum, item) => sum + item.score, 0) / regionData.length;
      } else {
        // Find matching criteria for the selected topic
        const matchingCriteria = categoryMapping[filters.topic as keyof typeof categoryMapping];
        if (Array.isArray(matchingCriteria)) {
          const matchingScores = regionData.filter(item => matchingCriteria.some(criteria => item.criteria.includes(criteria)));
          score = matchingScores.length > 0 ? matchingScores.reduce((sum, item) => sum + item.score, 0) / matchingScores.length : 0;
        }
      }
      return {
        region,
        current: score,
        previous: score - 0.1 + Math.random() * 0.2 // Mock previous data with slight variation
      };
    });
  };

  // Mock data for regional comparison - grey vs pink bars for 18 regions
  const regionalData = calculateFilteredData();
  return <Card className="rounded-lg border shadow-sm bg-white p-6">
      {/* Header */}
      <div className="h-2 bg-gradient-to-r from-[#DF7AB0] to-[#F9B5D3] rounded-t-xl -mt-6 -mx-6 mb-6"></div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-kanit text-xl font-bold text-foreground">เปรียบเทียบคะแนนรายภาค</h3>
        <TopicFilterDropdown value={filters.topic} onValueChange={value => setFilters({
        topic: value
      })} />
      </div>

      {/* Custom SVG Chart (responsive, ใหญ่เท่ากราฟ dashboard) */}
      <div className="w-full overflow-x-auto">
        {(() => {
          // ==== Layout ====
          const GRID_H = 200;            // ความสูงพื้นที่กราฟ (0..5)
          const VB_H   = 260;            // รวมพื้นที่ป้าย/แกน
          const STEP   = 60;             // ระยะห่างระหว่างกลุ่มแท่ง
          const ML = 60;                 // margin ซ้าย
          const MR = 80;                 // margin ขวา
          const EXTRA_GROUP = 60;        // ส่วนเพิ่มท้ายกราฟให้ไม่ชิดขอบ
          const vbWidth =
            ML + MR + Math.max(0, regionalData.length - 1) * STEP + EXTRA_GROUP;

          return (
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${vbWidth} ${VB_H}`}
              className="w-full h-[420px] md:h-[460px]" // <<< สูงเท่ากราฟ dashboard
            >
              <defs>
                <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF0080" />
                  <stop offset="100%" stopColor="#FF66B2" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <g>
                {[0, 40, 80, 120, 160, 200].map((y) => (
                  <line
                    key={y}
                    x1={ML}
                    y1={GRID_H - y}
                    x2={vbWidth - MR}
                    y2={GRID_H - y}
                    stroke="#E5E7EB"
                    strokeDasharray="4 4"
                  />
                ))}
              </g>

              {/* Y-axis labels (0..5) */}
              <g>
                {[0, 1, 2, 3, 4, 5].map((label, i) => (
                  <text
                    key={label}
                    x={ML - 10}
                    y={GRID_H + 5 - i * 40}
                    fill="#9CA3AF"
                    fontSize="10"
                    fontFamily="Kanit"
                    textAnchor="end"
                  >
                    {label}
                  </text>
                ))}
              </g>

              {/* Bars */}
              <g transform={`translate(${ML}, ${GRID_H}) scale(1, -1)`}>
                {regionalData.map((item, index) => {
                  const baseX = index * STEP + 10;
                  const prevHeight = (item.previous / 5) * GRID_H;
                  const currHeight = (item.current / 5) * GRID_H;
                  return (
                    <g key={item.region}>
                      {/* Previous (grey) */}
                      <rect
                        x={baseX}
                        y="0"
                        width="22"
                        height={prevHeight}
                        fill="#D1D5DB"
                        rx="2"
                        ry="2"
                        style={{
                          transition: "height 300ms cubic-bezier(0.22,1,0.36,1)",
                          transitionDelay: `${index * 18}ms`,
                        }}
                      />
                      {/* Current (pink gradient) */}
                      <rect
                        x={baseX + 25}
                        y="0"
                        width="22"
                        height={currHeight}
                        fill="url(#pinkGradient)"
                        rx="2"
                        ry="2"
                        style={{
                          transition: "height 300ms cubic-bezier(0.22,1,0.36,1)",
                          transitionDelay: `${80 + index * 18}ms`,
                        }}
                      />
                    </g>
                  );
                })}
              </g>

              {/* X-axis labels (ชื่อภาค) */}
              <g>
                {regionalData.map((item, index) => {
                  const cx = ML + index * STEP + 33; // กึ่งกลางกลุ่มแท่ง
                  return (
                    <text
                      key={item.region}
                      x={cx}
                      y={GRID_H + 55}
                      fill="#6B7280"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="Kanit"
                      transform={`rotate(-30, ${cx}, ${GRID_H + 55})`}
                    >
                      {item.region}
                    </text>
                  );
                })}
              </g>
            </svg>
          );
        })()}
      </div>
    </Card>;
};