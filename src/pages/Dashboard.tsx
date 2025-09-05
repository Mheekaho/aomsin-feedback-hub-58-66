import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, LogOut, RotateCcw } from "lucide-react";
import { MenuItems } from "@/components/dashboard/MenuItems";
import { MiniRailSidebar } from "@/components/dashboard/MiniRailSidebar";
import { SatisfactionBlock, RegionalComparisonCard } from "@/components/dashboard/SatisfactionBlock";
import { FormSubmissionBlock } from "@/components/dashboard/FormSubmissionBlock";
import { FeedbackBlock } from "@/components/dashboard/FeedbackBlock";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CustomerFeedback from "@/pages/CustomerFeedback";

// add AgentFlowModal
import FeedbackFlowModal from "@/components/dashboard/AgentFlowModal";

/** ------------------------------ Component ------------------------------ */
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // state สำหรับเปิด/ปิด FeedbackFlowModal
  const navigate = useNavigate();
  const { hash } = useLocation();

  // กำหนด section จาก hash (#feedback, #complaints, #ai, #docs)
  const section = (hash || "").replace("#", "");
  const titleMap: Record<string, string> = {
    feedback: "ข้อคิดเห็นของลูกค้า",
    complaints: "ข้อร้องเรียนรุนแรง",
    ai: "AI Chat ช่วยวิเคราะห์",
    docs: "เอกสารอ้างอิง",
  };
  const pageTitle = titleMap[section] ?? "สรุปภาพรวมประจำเดือน";
  const isOverview = !section; // แสดงฟิลเตอร์เฉพาะหน้า overview

  /* ===== Year/Month filters (dynamic + block future) ===== */
  const currentYear = new Date().getFullYear() + 543; // พ.ศ.
  const currentMonth = new Date().getMonth() + 1;

  const baseYear = 2567; // ปีเริ่มข้อมูลของคุณ
  const years = useMemo(
    () =>
      Array.from(
        { length: Math.max(1, currentYear - baseYear + 1) },
        (_, i) => String(baseYear + i)
      ),
    [currentYear]
  );

  const thaiMonths = [
    { value: "1", label: "มกราคม" },
    { value: "2", label: "กุมภาพันธ์" },
    { value: "3", label: "มีนาคม" },
    { value: "4", label: "เมษายน" },
    { value: "5", label: "พฤษภาคม" },
    { value: "6", label: "มิถุนายน" },
    { value: "7", label: "กรกฎาคม" },
    { value: "8", label: "สิงหาคม" },
    { value: "9", label: "กันยายน" },
    { value: "10", label: "ตุลาคม" },
    { value: "11", label: "พฤศจิกายน" },
    { value: "12", label: "ธันวาคม" },
  ] as const;

  const [selectedYear, setSelectedYear] = useState<string>(
    years.includes(String(currentYear)) ? String(currentYear) : years[years.length - 1]
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(String(currentMonth));

  const availableMonths = useMemo(() => {
    // ถ้าเลือกปีปัจจุบัน → ให้ได้แค่ถึงเดือนปัจจุบัน
    if (parseInt(selectedYear, 10) === currentYear) {
      return thaiMonths.filter((m) => parseInt(m.value, 10) <= currentMonth);
    }
    // ปีอดีต → ได้ครบทั้ง 12 เดือน
    return thaiMonths;
  }, [selectedYear, currentYear, currentMonth]);

  useEffect(() => {
    // กัน user เผลอไปปี/เดือนอนาคต
    if (parseInt(selectedYear, 10) > currentYear) {
      setSelectedYear(String(currentYear));
    }
    if (
      parseInt(selectedYear, 10) === currentYear &&
      parseInt(selectedMonth, 10) > currentMonth
    ) {
      setSelectedMonth(String(currentMonth));
    }
  }, [selectedYear, selectedMonth, currentYear, currentMonth]);

  const handleLogout = () => navigate("/");

  // เปลี่ยนคอนเทนต์ตาม section
  const renderContent = () => {
    switch (section) {
      case "feedback":
        return <CustomerFeedback />;
      case "complaints":
      case "ai":
      case "docs":
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-muted-foreground">{pageTitle}</h2>
              <p className="text-muted-foreground">เนื้อหาของส่วนนี้จะพัฒนาในเร็วๆ นี้</p>
            </div>
          </div>
        );
      default:
        // overview
        return (
          <div className="space-y-8">
            <div className="space-y-8">
              <FormSubmissionBlock />
              <SatisfactionBlock />
              <RegionalComparisonCard />
            </div>

            <div className="mt-12">
              <Tabs defaultValue="overview" className="w-full">
                <TabsContent value="overview" className="space-y-6"></TabsContent>

                <TabsContent value="regional" className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="h-2 bg-gradient-to-r from-[#DF7AB0] to-[#F9B5D3] rounded-t-xl -mt-6 -mx-6 mb-6"></div>
                    <h3 className="text-xl font-bold font-kanit text-foreground mb-4">เปรียบเทียบข้อมูลรายภาค</h3>
                    <p className="text-muted-foreground font-kanit mb-6">
                      เปรียบเทียบความพึงพอใจและข้อร้องเรียนระหว่างภาคต่างๆ
                    </p>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 font-kanit">กราฟเปรียบเทียบรายภาคจะแสดงที่นี่</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="h-2 bg-gradient-to-r from-[#DF7AB0] to-[#F9B5D3] rounded-t-xl -mt-6 -mx-6 mb-6"></div>
                    <h3 className="text-xl font-bold font-kanit text-foreground mb-4">การวิเคราะห์เชิงลึก</h3>
                    <p className="text-muted-foreground font-kanit mb-6">การวิเคราะห์แนวโน้ม รูปแบบ และข้อเสนอแนะเชิงลึก</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 font-kanit">แผนภูมิวิเคราะห์แนวโน้ม</p>
                      </div>
                      <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 font-kanit">การจัดกลุ่มข้อร้องเรียน</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trends" className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className="h-2 bg-gradient-to-r from-[#DF7AB0] to-[#F9B5D3] rounded-t-xl -mt-6 -mx-6 mb-6"></div>
                    <h3 className="text-xl font-bold font-kanit text-foreground mb-4">แนวโน้มและคาดการณ์</h3>
                    <p className="text-muted-foreground font-kanit mb-6">การคาดการณ์แนวโน้มในอนาคตและข้อเสนอแนะเชิงกลยุทธ์</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-purple-700 font-kanit">คาดการณ์ความพึงพอใจเดือนหน้า</div>
                          <div className="text-sm text-purple-600 font-kanit">แนวโน้มเพิ่มขึ้น 2.3%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-indigo-700 font-kanit">พื้นที่ที่ต้องปรับปรุง</div>
                          <div className="text-sm text-indigo-600 font-kanit">ระยะเวลาการตอบสนอง</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mini Rail Sidebar - Desktop Only */}
      <MiniRailSidebar onToggleMainSidebar={() => setIsOpen(!isOpen)} />

      {/* Top Bar */}
      <header className="topbar px-6">
        <div className="w-full">
          <div className="flex items-center justify-between relative z-10">
            {/* Drawer: ใช้ตัวเดียว ครอบทั้ง mobile/desktop */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                  <MenuItems onItemClick={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            {/* Left Content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white font-kanit mb-2">
                Dashboard ข้อเสนอแนะ ข้อร้องเรียน การใช้บริการสาขา
              </h1>
              <p className="text-white/80 font-kanit text-base">
                ระบบติดตามและวิเคราะห์ข้อร้องเรียนลูกค้าธนาคารออมสิน
              </p>
            </div>

            {/* Right Content */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white text-base font-kanit">
                  อัปเดตล่าสุด: 31/08/2025&nbsp; 09:49 น.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* ปุ่มรีเฟรช → เปิดโมดัล */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(true)}
                  className="text-white hover:bg-pink-400/30 w-10 h-10 rounded-full border border-white/20 transition-colors duration-200"
                  aria-label="รีเฟรช"
                >
                  <RotateCcw className="h-4 w-4" />
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

      {/* Main Content */}
      <main className="main-content transition-all duration-200 ease-out min-h-screen">
        <div className="container mx-auto p-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground font-kanit mb-2">{pageTitle}</h2>
              <p className="text-muted-foreground font-kanit">
                ภาพรวมข้อมูลการให้บริการและข้อร้องเรียนของลูกค้าในเดือนปัจจุบัน
              </p>
            </div>

            {isOverview && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* ปี */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-kanit text-muted-foreground">ปี</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-28 bg-white border border-border rounded-2xl shadow-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-border rounded-xl shadow-lg">
                      {years.map((y) => (
                        <SelectItem
                          key={y}
                          value={y}
                          className="font-kanit hover:bg-muted/50 focus:bg-muted/50"
                        >
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* เดือน */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-kanit text-muted-foreground">เดือน</label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-32 bg-white border border-border rounded-2xl shadow-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-border rounded-xl shadow-lg max-h-[300px]">
                      {availableMonths.map((m) => (
                        <SelectItem
                          key={m.value}
                          value={m.value}
                          className="font-kanit hover:bg-muted/50 focus:bg-muted/50"
                        >
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {renderContent()}
        </div>
      </main>
      
      {/* Footer */}
      <footer style={{ backgroundColor: "#ECEFF1" }} className="border-t border-border py-3 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
              <span className="text-sm text-muted-foreground font-kanit">
                © 2024 Customer Dashboard. สงวนลิขสิทธิ์.
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
                <a
                  href="#"
                  className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200"
                >
                  นโยบายความเป็นส่วนตัว
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <a
                  href="#"
                  className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200"
                >
                  เงื่อนไขการใช้งาน
                </a>
                <span className="hidden sm:inline text-muted-foreground">|</span>
                <a
                  href="#"
                  className="text-muted-foreground font-kanit hover:text-primary hover:underline transition-colors duration-200"
                >
                  ติดต่อเรา
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <span className="text-sm text-muted-foreground font-kanit">เวอร์ชัน 2.1.0</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FeedbackFlow Modal (controlled) */}
      <FeedbackFlowModal open={isModalOpen} onOpenChange={setIsModalOpen} hideInternalTrigger />
    </div>
  );
};

export default Dashboard;
