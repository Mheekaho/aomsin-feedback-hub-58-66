import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Phone, Lightbulb, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";

const ServiceTypeInfoDialog: React.FC = () => {
  const items = [
    "ฝาก-ถอนเงิน/สลาก",
    "ชำระสินเชื่อ/ชำระค่าสินค้าและบริการ",
    "สมัครใช้บริการ เงินฝาก/สินเชื่อ/MyMo/บัตร",
    "สอบถาม/ขอคำปรึกษา",
    "อื่น ๆ",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="ข้อมูลประเภทการใช้บริการ"
          className="h-8 w-8 rounded-xl text-[#D8218C] hover:bg-[#FFF1F7]"
          title="ข้อมูลประเภทการใช้บริการ"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      {/* โมดัลแบบ header ชมพู + ปุ่มปิดมุมขวา และ padding เท่ากันทุกด้าน */}
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-xl">
        {/* Header ชมพูเหมือนตัวอย่าง */}
        <div
          className="relative p-6"
          style={{
            background:
              "linear-gradient(90deg,#f2449e 0%, #fd84d6 60%, #fda0dd 100%)",
          }}
        >
          <DialogHeader className="p-0">
            <DialogTitle className="text-white text-2xl font-bold text-center font-kanit">
              ประเภทธุรกรรม
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* เนื้อหา: padding เท่ากันทุกด้าน (p-6) */}
        <div className="p-6">
          <ul className="space-y-3">
            {items.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: "#DF7AB0" }}
                />
                <span className="font-kanit text-[15px] text-gray-800">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface KPIData {
  icon: any;
  title: string;
  value: number;
  change: number;
  previousValue: number;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    icon: string;
  };
}

const kpiData: KPIData[] = [
  {
    icon: FileText,
    title: "แบบฟอร์มทั้งหมด",
    value: 1247,
    change: 12.5,
    previousValue: 1109,
    colorScheme: {
      bg: "hsl(var(--kpi-blue-bg))",
      border: "hsl(var(--kpi-blue-border))",
      text: "hsl(var(--kpi-blue-text))",
      icon: "hsl(var(--kpi-blue-text))"
    }
  },
  {
    icon: Phone,
    title: "ให้ข้อมูลติดต่อ",
    value: 892,
    change: -5.3,
    previousValue: 941,
    colorScheme: {
      bg: "hsl(var(--kpi-green-bg))",
      border: "hsl(var(--kpi-green-border))",
      text: "hsl(var(--kpi-green-text))",
      icon: "hsl(var(--kpi-green-text))"
    }
  },
  {
    icon: Lightbulb,
    title: "มีข้อเสนอแนะ",
    value: 456,
    change: 18.7,
    previousValue: 384,
    colorScheme: {
      bg: "hsl(var(--kpi-yellow-bg))",
      border: "hsl(var(--kpi-yellow-border))",
      text: "hsl(var(--kpi-yellow-text))",
      icon: "hsl(var(--kpi-yellow-text))"
    }
  },
  {
    icon: AlertTriangle,
    title: "ข้อร้องเรียนรุนแรง",
    value: 23,
    change: -34.2,
    previousValue: 35,
    colorScheme: {
      bg: "hsl(var(--kpi-red-bg))",
      border: "hsl(var(--kpi-red-border))",
      text: "hsl(var(--kpi-red-text))",
      icon: "hsl(var(--kpi-red-text))"
    }
  }
];

const branchTypeData = [
  { name: "ให้บริการ 5 วัน", value: 68, color: "#DF7AB0" },
  { name: "ให้บริการ 7 วัน", value: 32, color: "#A8D5F3" }
];

const serviceTypeData = [
  { category: "ฝาก/ถอน", current: 450, previous: 420 },
  { category: "ชำระเงิน", current: 320, previous: 310 },
  { category: "สมัครบริการ", current: 180, previous: 165 },
  { category: "สอบถาม", current: 210, previous: 195 },
  { category: "อื่นๆ", current: 87, previous: 98 }
];

const KPICard = ({ data }: { data: KPIData }) => {
  const Icon = data.icon;
  const isPositive = data.change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <div 
      className="rounded-2xl shadow-soft p-5 border transition-all duration-200 ease-out"
      style={{ 
        backgroundColor: data.colorScheme.bg,
        borderColor: data.colorScheme.border,
        borderWidth: '1px'
      }}
    >
      {/* Icon centered at top */}
      <div className="flex justify-center mb-2 mt-2">
        <Icon 
          className="w-8 h-8"
          style={{ color: data.colorScheme.icon }}
        />
      </div>
      
      {/* Title */}
      <div className="text-center mb-1">
        <h3 
          className="font-kanit text-sm font-medium"
          style={{ color: data.colorScheme.text }}
        >
          {data.title}
        </h3>
      </div>
      
      {/* Value and "ครั้ง" on same line */}
      <div className="text-center mb-2">
        <div className="flex items-baseline justify-center gap-1">
          <span 
            className="font-kanit text-2xl font-bold"
            style={{ color: data.colorScheme.text }}
          >
            {data.value.toLocaleString()}
          </span>
          <span 
            className="font-kanit text-sm"
            style={{ color: data.colorScheme.text }}
          >
            ราย
          </span>
        </div>
      </div>
      
      {/* Change percentage */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 text-xs">
          <TrendIcon 
            className="w-3 h-3"
            style={{ color: isPositive ? '#20A161' : '#D14343' }}
          />
          <span 
            className="font-kanit font-medium"
            style={{ color: isPositive ? '#20A161' : '#D14343' }}
          >
            {Math.abs(data.change)}%
          </span>
          <span className="font-kanit text-gray-600">
            ({data.previousValue.toLocaleString()} ราย)
          </span>
        </div>
      </div>
    </div>
  );
};

export const FormSubmissionBlock = () => {
  const renderPieLabel = ({ value }: any) => `${value}%`;
  
  return (
    <Card className="rounded-2xl border shadow-card bg-white overflow-hidden">
      {/* Pink header strip */}
      <div 
        className="h-2 rounded-t-2xl"
        style={{ background: 'var(--gradient-pink-strip)' }}
      />
      
      <CardHeader className="pb-4 pt-5">
        <CardTitle className="font-kanit text-xl font-bold text-foreground">
          การส่งแบบประเมิน
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6 pt-0">
        {/* KPI Cards Grid - 4 cards in row as specified */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpiData.map((data, index) => (
            <KPICard key={index} data={data} />
          ))}
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart */}
          <div className="shasha">
            <div className="space-y-4">
              <h3 className="font-kanit text-lg font-semibold text-foreground text-center">ประเภทของสาขา</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={branchTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={renderPieLabel}
                      labelLine={false}
                    >
                      {branchTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value}%`, 'สัดส่วน']}
                      labelFormatter={(label) => `ประเภท: ${label}`}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontFamily: 'Kanit'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {branchTypeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-kanit text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="shasha">
            <div className="space-y-4 relative">
              <h3 className="font-kanit text-lg font-semibold text-foreground text-center">
                ประเภทการใช้บริการ
                  {/* ปุ่ม info มุมขวาของหัวข้อ */}
                  <div className="absolute right-0 top-0">
                    <ServiceTypeInfoDialog />
                  </div>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                    <XAxis 
                      dataKey="category" 
                      tick={{ fontSize: 12, fontFamily: 'Kanit' }}
                      stroke="#6B7280"
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fontFamily: 'Kanit' }}
                      stroke="#6B7280"
                    />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        `${value} ครั้ง`, 
                        name === 'current' ? 'เดือนปัจจุบัน' : 'เดือนก่อน'
                      ]}
                      labelFormatter={(label) => `หมวด: ${label}`}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontFamily: 'Kanit'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ fontFamily: 'Kanit', fontSize: '12px' }}
                      formatter={(value) => value === 'current' ? 'เดือนปัจจุบัน' : 'เดือนก่อน'}
                    />
                    <Bar 
                      dataKey="previous" 
                      fill="#D3D3D3" 
                      radius={[4, 4, 0, 0]}
                      name="previous"
                    />
                    <Bar 
                      dataKey="current" 
                      fill="#DF7AB0" 
                      radius={[4, 4, 0, 0]}
                      name="current"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};