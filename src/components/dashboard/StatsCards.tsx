import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, FileText, Phone, Lightbulb, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const statsData = [
  {
    title: "แบบฟอร์มที่กรอก",
    value: "1,247",
    change: "+12.5%",
    trend: "up" as const,
    previous: "1,109",
    icon: FileText,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "ให้ข้อมูลติดต่อ",
    value: "892",
    change: "-5.3%",
    trend: "down" as const,
    previous: "941",
    icon: Phone,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "มีข้อเสนอแนะ",
    value: "456",
    change: "+18.7%",
    trend: "up" as const,
    previous: "384",
    icon: Lightbulb,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    title: "ข้อร้องเรียนรุนแรง",
    value: "23",
    change: "-34.2%",
    trend: "down" as const,
    previous: "35",
    icon: AlertTriangle,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
];

const branchTypeData = [
  { name: "ให้บริการ 5 วัน", value: 68, color: "hsl(var(--tertiary))" },
  { name: "ให้บริการ 7 วัน", value: 32, color: "hsl(var(--dashboard-blue-bg))" }
];

const serviceTypeData = [
  { service: "ฝาก/ถอน", current: 285, previous: 267 },
  { service: "ชำระเงิน", current: 198, previous: 210 },
  { service: "สมัครบริการ", current: 156, previous: 145 },
  { service: "สอบถาม", current: 134, previous: 128 },
  { service: "อื่นๆ", current: 89, previous: 95 }
];

export const StatsCards = () => {
  const renderPieLabel = ({ name, value }: any) => `${name}: ${value}%`;
  
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="rounded-2xl border shadow-card bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-tertiary" />
        <CardHeader>
          <CardTitle className="font-kanit text-xl font-bold text-foreground">
            การส่งแบบประเมิน
          </CardTitle>
        </CardHeader>
      </Card>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className={`shadow-card hover:shadow-soft transition-shadow rounded-2xl ${stat.bgColor}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground font-kanit mb-2">
                      {stat.title}
                    </p>
                    <div className="text-3xl font-bold text-foreground font-kanit mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-kanit">ครั้ง</div>
                    <div className={`flex items-center gap-1 text-sm font-medium mt-2 ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-kanit">
                        {stat.change} จาก {stat.previous}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.iconColor}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Type Donut */}
        <Card className="rounded-2xl border shadow-card bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-tertiary" />
          <CardHeader>
            <CardTitle className="font-kanit text-lg font-semibold">ประเภทของสาขา</CardTitle>
          </CardHeader>
          <CardContent>
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
                    formatter={(value: any, name: string) => [
                      `${name}: ${value}%`,
                      ''
                    ]}
                    labelFormatter={() => ''}
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
            <div className="flex justify-center gap-4 mt-4">
              {branchTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-kanit text-sm text-muted-foreground">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Type Bar Chart */}
        <Card className="rounded-2xl border shadow-card bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-tertiary" />
          <CardHeader>
            <CardTitle className="font-kanit text-lg font-semibold">ประเภทการใช้บริการ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="service" 
                    tick={{ fontSize: 11, fontFamily: 'Kanit' }}
                    stroke="hsl(var(--muted-foreground))"
                    height={60}
                    angle={-15}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fontFamily: 'Kanit' }}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `${Number(value)} ครั้ง`, 
                      name === 'current' ? 'เดือนปัจจุบัน' : 'เดือนก่อน'
                    ]}
                    labelFormatter={(label) => `${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid hsl(var(--border))',
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
                    fill="hsl(var(--gray))" 
                    radius={[4, 4, 0, 0]}
                    name="previous"
                  />
                  <Bar 
                    dataKey="current" 
                    fill="hsl(var(--tertiary))" 
                    radius={[4, 4, 0, 0]}
                    name="current"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};