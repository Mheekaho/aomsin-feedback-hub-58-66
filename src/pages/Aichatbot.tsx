import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* ===== shadcn/ui ===== */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

/* ===== Icons ===== */
import { Menu, LogOut, RotateCcw, Send, Settings, Bot, User, RefreshCw } from "lucide-react";

/* ===== Shared Dashboard Comps ===== */
import { MiniRailSidebar } from "@/components/dashboard/MiniRailSidebar";
import { MenuItems } from "@/components/dashboard/MenuItems";
import FeedbackFlowModal from "@/components/dashboard/AgentFlowModal";

/* =====================================================================================
 * Utils
 * ===================================================================================*/
type Msg = { id: string; role: "assistant" | "user"; text: string; time: string };

const nowTime = () =>
  new Intl.DateTimeFormat("th-TH", { hour: "2-digit", minute: "2-digit" }).format(new Date());

const greet: Msg = {
  id: "m-0",
  role: "assistant",
  text:
    "สวัสดีครับ! ผมคือ AI ช่วยวิเคราะห์ ผมสามารถช่วยวิเคราะห์ข้อมูลและให้คำแนะนำเชิงลึกเกี่ยวกับข้อร้องเรียนได้ครับ",
  time: nowTime(),
};

function genAssistantReply(input: string): string {
  if (!input.trim()) return "ขอรายละเอียดเพิ่มเติมเกี่ยวกับสิ่งที่ต้องการวิเคราะห์หน่อยครับ";
  // ตอบกลับตัวอย่างแบบยึดธีมงานของคุณ4
  const hints = [
    "สรุปประเด็นหลักจากข้อความ:",
    "แนวโน้มที่พบ:",
    "คำแนะนำที่ทำได้ทันที:",
  ];
  return [
    `${hints[0]} “${input.trim()}”`,
    `${hints[1]} รอคิวนาน/ขั้นตอนเยอะ/ระบบแอปติดขัด`,
    `${hints[2]} เพิ่มพนักงานชั่วโมงพีค ปรับคิวอัจฉริยะ และสื่อสารสถานะบริการแบบเรียลไทม์`,
  ].join("\n");
}

/* =====================================================================================
 * Page
 * ===================================================================================*/
export default function AIChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [flowOpen, setFlowOpen] = useState(false);

  /* Drawer */
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => setDrawerOpen(false), [location.pathname, location.hash]);

  /* Chat state */
  const [messages, setMessages] = useState<Msg[]>([greet]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => navigate("/");
  const handleReset = () => {
    setMessages([greet]);
    setInput("");
  };

  const scrollToBottom = () => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };
  useEffect(scrollToBottom, [messages.length]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text, time: nowTime() };
    const aiMsg: Msg = { id: crypto.randomUUID(), role: "assistant", text: genAssistantReply(text), time: nowTime() };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  const updatedAt = useMemo(() => {
    const d = new Date();
    return new Intl.DateTimeFormat("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d) + " " + nowTime() + " น.";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Mini rail (เหมือน Dashboard) */}
      <MiniRailSidebar
        activeMenu="AI Chat ช่วยวิเคราะห์"
        onToggleMainSidebar={() => setDrawerOpen(true)}
      />

      {/* Topbar เหมือน Dashboard */}
      <header className="topbar px-6">
        <div className="w-full">
          <div className="flex items-center justify-between relative z-10">
            {/* Mobile drawer trigger */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 w-11 h-11 rounded-2xl"
                aria-label="เปิดเมนู"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Left */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white font-kanit mb-2">
                Dashboard ข้อเสนอแนะ ข้อร้องเรียน การใช้บริการสาขา
              </h1>
              <p className="text-white/80 font-kanit text-base">
                ระบบติดตามและวิเคราะห์ข้อร้องเรียนลูกค้าธนาคารออมสิน
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white text-base font-kanit">
                  อัปเดตล่าสุด: {updatedAt}
                </p>
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

      {/* Drawer (เหมือนหน้าอื่น) */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" className="w-80 md:ml-[72px]">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle className="font-kanit">เมนูหลัก</SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <MenuItems activeKey="AI Chat ช่วยวิเคราะห์" onItemClick={() => setDrawerOpen(false)} />
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-xs text-muted-foreground text-center font-kanit">
              อัพเดตล่าสุด: {updatedAt}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main */}
      <main className="main-content transition-all duration-200 ease-out">
        <div className="container mx-auto p-6">
          {/* Title section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground font-kanit mb-2">
              AI Chat ช่วยวิเคราะห์
            </h2>
            <p className="text-muted-foreground font-kanit">
              ใช้ปัญญาประดิษฐ์ในการวิเคราะห์ข้อมูลและให้คำแนะนำเชิงลึก
            </p>
          </div>

          {/* Chat card */}
          <Card className="rounded-2xl border border-gray-200 shadow-card bg-white overflow-hidden">
            <div
              className="h-2 w-full rounded-t-2xl"
              style={{ background: "var(--gradient-pink-strip)" }}
            />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-kanit text-xl font-bold text-foreground">
                  AI Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-[#D8218C] hover:bg-[#FFF1F7]"
                  aria-label="ตั้งค่า"
                  onClick={() => alert("ตั้งค่า (placeholder)")}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground font-kanit">
                พร้อมช่วยวิเคราะห์คำถามของคุณ
              </p>
            </CardHeader>

            <CardContent className="pb-4">
              {/* Messages */}
              <div
                ref={listRef}
                className="min-h-[46vh] lg:min-h-[56vh] max-h-[65vh] lg:max-h-[60vh] overflow-y-auto px-1 py-2 space-y-3"
              >
                {messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}
              </div>

              {/* Composer */}
              <div className="mt-3 rounded-2xl border border-[#F5C9DF] bg-[#FFF7FB] p-2.5">
                <div className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="พิมพ์ข้อความของคุณที่นี่..."
                    className="flex-1 rounded-xl bg-white border border-[#F4D6E6] focus-visible:ring-[#ff5fbf] focus-visible:border-pink-300 font-kanit"
                  />
                  <Button
                    onClick={sendMessage}
                    className="rounded-xl px-4 h-10 bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3] text-white hover:opacity-95 shadow-[0_6px_16px_rgba(216,33,140,.25)]"
                    aria-label="ส่ง"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    ส่ง
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer — เหมือน Dashboard */}
      <footer style={{ backgroundColor: "#ECEFF1" }} className="border-t border-border py-3 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-center md:text-left">
              <span className="text-sm text-muted-foreground font-kanit">
                © 2024 Customer Dashboard. สงวนลิขสิทธิ์.
              </span>
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

      {/* Mobile footer (เหมือน Dashboard) */}
      <div className="md:hidden px-6 py-4">
        <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] overflow-hidden mx-auto">
          <div className="h-2 bg-gradient-to-r from-[#D8218C] via-[#DF7AB0] to-[#F9B5D3]" />
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

/* =====================================================================================
 * Message bubble component (ตามธีม Dashboard)
 * ===================================================================================*/
function MessageBubble({ msg }: { msg: Msg }) {
  const isAssistant = msg.role === "assistant";
  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"} px-1`}>
      <div
        className={`max-w-[86%] rounded-2xl border shadow-sm px-4 py-3 font-kanit leading-relaxed whitespace-pre-wrap
          ${isAssistant
            ? "bg-[#FFE8F2] border-[#F8BBD9] text-[#4B5563]"
            : "bg-white border-[#E5E7EB] text-[#111827]"}`
        }
      >
        <div className="flex items-center gap-2 mb-1 text-xs text-[#6B7280]">
          {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
          <span>{isAssistant ? "AI Assistant" : "คุณ"}</span>
          <span>•</span>
          <span>{msg.time}</span>
        </div>
        <div className="text-[15px]">{msg.text}</div>
      </div>
    </div>
  );
}
