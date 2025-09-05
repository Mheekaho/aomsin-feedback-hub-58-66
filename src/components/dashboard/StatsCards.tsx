import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, FileText, Phone, Lightbulb, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";

// Removed mock data - now using real Supabase data

export const StatsCards = () => {
  const { loading, error, dashboardStats, branchTypeData, serviceTypeData } = useSupabaseData();
  
  const renderPieLabel = ({ name, value }: any) => `${name}: ${value}%`;

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="rounded-2xl border shadow-card bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-tertiary" />
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="rounded-2xl border shadow-card bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-red-500" />
          <CardHeader>
            <CardTitle className="font-kanit text-xl font-bold text-red-600">
              เกิดข้อผิดพลาด: {error}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Generate stats data from Supabase data
  const statsData = dashboardStats ? [
    {
      title: "แบบฟอร์มที่กรอก",
      value: dashboardStats.totalForms.toLocaleString(),
      change: dashboardStats.prevTotalForms > 0 
        ? ((dashboardStats.totalForms - dashboardStats.prevTotalForms) / dashboardStats.prevTotalForms * 100).toFixed(1)
        : "0",
      trend: dashboardStats.totalForms >= dashboardStats.prevTotalForms ? "up" as const : "down" as const,
      previous: dashboardStats.prevTotalForms.toLocaleString(),
      icon: FileText,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "ให้ข้อมูลติดต่อ",
      value: dashboardStats.contactProvided.toLocaleString(),
      change: dashboardStats.prevContactProvided > 0 
        ? ((dashboardStats.contactProvided - dashboardStats.prevContactProvided) / dashboardStats.prevContactProvided * 100).toFixed(1)
        : "0",
      trend: dashboardStats.contactProvided >= dashboardStats.prevContactProvided ? "up" as const : "down" as const,
      previous: dashboardStats.prevContactProvided.toLocaleString(),
      icon: Phone,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "มีข้อเสนอแนะ",
      value: dashboardStats.hasSuggestions.toLocaleString(),
      change: dashboardStats.prevHasSuggestions > 0 
        ? ((dashboardStats.hasSuggestions - dashboardStats.prevHasSuggestions) / dashboardStats.prevHasSuggestions * 100).toFixed(1)
        : "0",
      trend: dashboardStats.hasSuggestions >= dashboardStats.prevHasSuggestions ? "up" as const : "down" as const,
      previous: dashboardStats.prevHasSuggestions.toLocaleString(),
      icon: Lightbulb,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "ข้อร้องเรียนรุนแรง",
      value: dashboardStats.severeComplaints.toLocaleString(),
      change: dashboardStats.prevSevereComplaints > 0 
        ? ((dashboardStats.severeComplaints - dashboardStats.prevSevereComplaints) / dashboardStats.prevSevereComplaints * 100).toFixed(1)
        : "0",
      trend: dashboardStats.severeComplaints >= dashboardStats.prevSevereComplaints ? "up" as const : "down" as const,
      previous: dashboardStats.prevSevereComplaints.toLocaleString(),
      icon: AlertTriangle,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ] : [];
  
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
                         {stat.change}% จาก {stat.previous}
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