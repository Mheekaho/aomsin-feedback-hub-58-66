// src/pages/ReferenceTables.tsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* UI */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

/* Icons */
import { Menu, LogOut, RefreshCw, Edit, Trash2 } from "lucide-react";

/* Shared Dashboard */
import { MiniRailSidebar } from "@/components/dashboard/MiniRailSidebar";
import { MenuItems } from "@/components/dashboard/MenuItems";

/* Reference components */
import TableCard from "@/components/reference/TableCard";
import DataTable from "@/components/reference/DataTable";
import EditModal from "@/components/reference/EditModal";
import BranchEditModal from "@/components/reference/BranchEditModal";
import FeedbackFlowModal from "@/components/dashboard/AgentFlowModal";

/* ====================== Utils ====================== */
const nowTH = () => {
  const d = new Date();
  return (
    new Intl.DateTimeFormat("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d) +
    " " +
    new Intl.DateTimeFormat("th-TH", { hour: "2-digit", minute: "2-digit" }).format(d) +
    " น."
  );
};

/* helper: ช่องข้อมูลที่ตัดด้วย ellipsis, ไม่ขึ้นบรรทัดใหม่ */
const Trunc: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <span className="block truncate" title={typeof children === "string" ? children : undefined}>
    {children ?? "-"}
  </span>
);

/* ====================== Page ====================== */
const ReferenceTablesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [flowOpen, setFlowOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => setDrawerOpen(false), [location.pathname, location.hash]);

  const updatedAt = useMemo(() => nowTH(), []);

  /* ---------- Category Reference (sample data + CRUD local) ---------- */
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [categoryData, setCategoryData] = useState<any[]>([
    {
      no: 1,
      subTopic: "ความสุภาพและมารยาทของพนักงาน",
      mainTopic: "พนักงานและบุคลากร",
      definition: "น้ำเสียง การแต่งกาย บุคลิกภาพของพนักงาน",
      exampleSentence: "พูดจาสุภาพ ไพเราะ แต่งกายสุภาพ",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 2,
      subTopic: "ความเอาใจใส่ในการให้บริการลูกค้า",
      mainTopic: "พนักงานและบุคลากร",
      definition: "ความเอาใจใส่ การดูแลลูกค้าอย่างใกล้ชิด หรือเป็นกันเอง",
      exampleSentence: "ให้บริการดี น่ารัก ไม่น่ารัก",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 3,
      subTopic: "ความสามารถในการตอบคำถามหรือให้คำแนะนำ",
      mainTopic: "พนักงานและบุคลากร",
      definition: "ความรู้ในตัวของผลิตภัณฑ์ ทั้งน้ำเสียงและคำตอบชัดเจน",
      exampleSentence: "แนะนำดี เสียงดังฟังชัด เข้าใจง่าย",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 4,
      subTopic: "ความถูกต้องในการให้บริการ",
      mainTopic: "พนักงานและบุคลากร",
      definition: "ความถูกต้องหรือผิดพลาดในการทำรายการ",
      exampleSentence: "ทำงานเรียบร้อย ถูกต้อง",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 5,
      subTopic: "ความรวดเร็วในการให้บริการ",
      mainTopic: "พนักงานและบุคลากร",
      definition: "ความเร็ว ความกระฉับกระเฉงในการปฎิบัติหน้าที่พนักงาน",
      exampleSentence: "รวดเร็ว ทันใจ ตรงต่อเวลา ช้า อืดอาด",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 6,
      subTopic: "การจัดการและแก้ไขปัญหาเฉพาะหน้า",
      mainTopic: "พนักงานและบุคลากร",
      definition: "การหาแนวทาง ความพร้อมรับมือกับปัญหาและอารมณ์",
      exampleSentence: "เกิดข้อผิดพลาด แต่แก้ไขปัญหาได้รวดเร็ว",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 7,
      subTopic: "ความประทับใจในการให้บริการ",
      mainTopic: "พนักงานและบุคลากร",
      definition: "การชมเชย หรือ ติเตียนการทำงาน โดยรวม",
      exampleSentence: "ดี แย่ ยอดเยี่ยม แย่มาก ควรปรับปรุง",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 8,
      subTopic: "รปภ. แม่บ้าน ฯลฯ",
      mainTopic: "พนักงานและบุคลากร",
      definition: "การให้บริการ ที่มาจาก รปภ แม่บ้าน ฯลฯ",
      exampleSentence: "ที่เกี่ยวข้องกับ รปภ. หรือ แม่บ้าน",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 9,
      subTopic: "ความพร้อมในการให้บริการ",
      mainTopic: "กระบวนการให้บริการ",
      definition: "ความพร้อมในการให้บริการลูกค้าของสาขา",
      exampleSentence: "ช่องให้บริการ จำนวนพนักงาน เวลาเปิดปิดให้บริการ ไม่เพียงพอ",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 10,
      subTopic: "ขั้นตอนการให้บริการ",
      mainTopic: "กระบวนการให้บริการ",
      definition: "ขั้นตอนการให้บริการหรือทำเรื่อง คิวผู้ให้บริการ ระบบนำทาง",
      exampleSentence: "หลงทาง ลัดคิว แซงคิว ทำเรื่องนานมาก",
      status: "อนุญาต",
      createdAt: "13/8/2568",
      lastUpdate: "13/8/2568",
    },
    {
      no: 11,
      subTopic: "ภาระเอกสาร",
      mainTopic: "กระบวนการให้บริการ",
      definition: "ความซับซ้อนที่เกี่ยวกับการเตรียมเอกสาร",
      exampleSentence: "เอกสารใช้เยอะมาก",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 12,
      subTopic: "ระบบ Core ของธนาคาร",
      mainTopic: "ระบบธนาคารและเทคโนโลยี",
      definition: "ระบบสำหรับพนักงานใช้งานหรือระบบหลังบ้าน",
      exampleSentence: "เงินไม่เข้าบัญชี ระบบล่ม",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 13,
      subTopic: "เครื่องออกบัตรคิว",
      mainTopic: "ระบบธนาคารและเทคโนโลยี",
      definition: "ที่เกี่ยวข้องกับเครื่องออกบัตรคิว",
      exampleSentence: "เลขคิวไม่ชัด เครื่องออกบัตรช้า",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 14,
      subTopic: "ATM ADM CDM",
      mainTopic: "ระบบธนาคารและเทคโนโลยี",
      definition: "ระบบฝากถอนของตู้กดเงินถอนเงิน",
      exampleSentence: "ตู้กินเงิน ไม่มีตู้เพียงพอ ตู้ทำงานช้า",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 15,
      subTopic: "ระบบยืนยันตัวตน",
      mainTopic: "ระบบธนาคารและเทคโนโลยี",
      definition: "ระบบสแกนหน้า สแกนลายนิ้วมือ E-KYC",
      exampleSentence: "สแกนหน้า สแกนลายนิ้วมือ ไม่ผ่านซักที",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 16,
      subTopic: "แอปพลิเคชั่น MyMo",
      mainTopic: "ระบบธนาคารและเทคโนโลยี",
      definition: "ที่เกี่ยวข้องกับแอพพลิเคชั่น MyMo",
      exampleSentence: "MyMo แอปค้าง แอปเด้ง แอปทำงานช้ามาก",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 17,
      subTopic: "เครื่องปรับสมุด",
      mainTopic: "ระบบธนาคารและเทคโนโลยี",
      definition: "ที่เกี่ยวข้องกับเครื่องปรับสมุด",
      exampleSentence: "เครื่องปรับสมุด, book bank ใช้ไม่ได้",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 18,
      subTopic: "เครื่องนับเงิน",
      mainTopic: "ระบบธนาคารและเทคโนโลยี",
      definition: "ที่เกี่ยวข้องกับเครื่องนับเงิน",
      exampleSentence: "เครื่องนับเงินนับไม่ถูกต้อง",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 19,
      subTopic: "รายละเอียดผลิตภัณฑ์",
      mainTopic: "เงื่อนไขผลิตภัณฑ์",
      definition: "เกี่ยวกับผลิตภัณฑ์ธนาคาร เช่น เงินฝาก, สินเชื่อ, ประกัน",
      exampleSentence: "ดอกเบี้ยสูง ค่าธรรมเนียมแพง",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 20,
      subTopic: "เกณฑ์การอนุมัติ",
      mainTopic: "เงื่อนไขผลิตภัณฑ์",
      definition: "เกี่ยวกับเกณฑ์การสมัครใช้บริการของธนาคาร",
      exampleSentence: "ขอกู้ยากมาก เงื่อนไขไม่ผ่าน",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 21,
      subTopic: "ระยะเวลาอนุมัติ",
      mainTopic: "เงื่อนไขผลิตภัณฑ์",
      definition: "เกี่ยวกับเวลาการรออนุมัติผลิตภัณฑ์ของธนาคาร",
      exampleSentence: "อนุมัตินาน รอผลนาน ยื่นกู้แปปเดียวรู้ผลแล้ว",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 22,
      subTopic: "ความเรียบง่ายข้อมูล",
      mainTopic: "เงื่อนไขผลิตภัณฑ์",
      definition: "ความซับซ้อนของผลิตภัณฑ์ การทำความเข้าใจ",
      exampleSentence: "ขั้นตอนซับซ้อน ภาษาเข้าใจยาก",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 23,
      subTopic: "ความสะอาด",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition: "ภาพรวมความสะอาดของพื้นที่ให้บริการ (ไม่รวมห้องน้ำ)",
      exampleSentence: "พื้นเงาวับ สะอาด ไม่สะอาด",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 24,
      subTopic: "ทำเลพื้นที่และควาบคับคั่ง",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition: "ทำเลที่ตั้งของสาขา ความคับคั่ง",
      exampleSentence: "สาขากว้าง สาขาแน่น ไปสาขายาก",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 25,
      subTopic: "อุณหภูมิ",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition:
        "เกี่ยวข้องกับอุณหภูมิของสาขาหรืออุปกรณ์ให้ความเย็น เช่น แอร์ พัดลม",
      exampleSentence: "อากาศเย็น ร้อน หนาว แอร์เสีย",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 26,
      subTopic: "ที่นั่งรอ",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition: "เกี่ยวกับพื้นที่นั่งรอคิวสำหรับลูกค้า ม้านั่ง",
      exampleSentence: "ไม่มีที่นั่ง เก้าอี้พัง",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 27,
      subTopic: "แสงสว่าง",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition:
        "เกี่ยวกับแสงสว่างของพื้นที่ให้บริการ หากสว่างคือดี มืดหรือสลัวคือแย่",
      exampleSentence: "สว่าง มืด สลัว",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 28,
      subTopic: "เสียง",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition:
        "เกี่ยวกับเสียงที่ได้ยินภายในสาขา (ที่ไม่ได้มาจากตัวพนักงาน)",
      exampleSentence:
        "มีเสียงรบกวน ลูกค้าคนอื่นคุยกัน เสียงเพลงดังมาก เสียงประกาศดังเกินไป",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 29,
      subTopic: "ห้องน้ำ",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition:
        "ความสะอาด ความสว่าง หรืออุปกรณ์อื่นๆ ที่มีการกล่าวถึงเกี่ยวข้องกับห้องน้ำภายในสาขา",
      exampleSentence: "ห้องน้ำสะอาด สกปรก กระดาษชำระ",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 30,
      subTopic: "ที่จอดรถ",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition:
        "ความคับคั่ง ทำเล ความสะอาด ความสว่าง หรืออื่นๆที่กล่าวถึงและเกี่ยวข้องกับที่จอดรถ",
      exampleSentence: "มีที่จอดกว้าง ยามโบกให้ ที่จอดรถ",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 31,
      subTopic: "ป้าย-สื่อประชาสัมพันธ์",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition: "ป้ายพนักงาน ป้ายหน้าเคาเตอร์ โบชัวร์ ป้ายโฆษณาหน้าสาขา",
      exampleSentence: "ป้ายชัด ตัวอักษรใหญ่ชัดเจน ป้ายโบชัวเก่าแล้ว",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 32,
      subTopic: "สิ่งอำนวยความสะดวกอื่นๆ",
      mainTopic: "สภาพแวดล้อมและสิ่งอำนวยความสะดวก",
      definition:
        "สิ่งอำนวยความสะดวกอื่นๆที่ไม่เกี่ยวข้องกับข้ออื่นๆ เช่น น้ำดื่ม โทรทัศน์ WiFi ฯลฯ",
      exampleSentence: "บริการน้ำดื่มสะอาดฟรี มีตู้น้ำเย็น มี wifi แรง",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 33,
      subTopic: "การหลอกลวง",
      mainTopic: "Market Conduct",
      definition: "การหลอกลวงผู้ใช้บริการ",
      exampleSentence:
        "หลอกให้ทำประกันโดยแจ้งว่าเป็นเงินฝาก บอกข้อเท็จจริงไม่ครบถ้วน",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 34,
      subTopic: "การเอาเปรียบ",
      mainTopic: "Market Conduct",
      definition:
        "การเอาเปรียบผู้ใช้บริการ การเรียกเก็บค่าธรรมเนียมที่ไม่เป็นธรรม หรือการใช้กลอุบายในการขาย",
      exampleSentence:
        "เรียกเก็บค่าธรรมเนียมที่ไม่เป็นธรรม เอาเปรียบลูกค้า ไม่แฟร์",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 35,
      subTopic: "การบังคับ",
      mainTopic: "Market Conduct",
      definition: "การบังคับผู้ใช้บริการ",
      exampleSentence: "บีบบังคับ ต้องซื้อ สมัครทันที ถูกกดดัน",
      status: "อนุญาต", // แก้สะกด
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 36,
      subTopic: "การรบกวน",
      mainTopic: "Market Conduct",
      definition: "การรบกวนผู้ใช้บริการ",
      exampleSentence:
        "รำคาญ ไม่เคารพเวลา พูดซ้ำๆ ถามซ้ำๆ ถามข้อมูลส่วนตัว",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
    {
      no: 37,
      subTopic: "อื่นๆ",
      mainTopic: "ความประทับใจอื่นๆ",
      definition:
        "ความประทับใจหรือความไม่ประทับใจอื่น ๆ ที่มีต่อสิ่งที่สนใจ โดยไม่ซ้ำกับประเด็นที่กล่าวไว้ในข้อก่อนหน้า",
      exampleSentence: "ลูกอมที่พนักงานให้อร่อยมากค่ะ",
      status: "อนุญาต",
      createdAt: "14/8/2568",
      lastUpdate: "14/8/2568",
    },
  ]);

  const handleEdit = (row: any) => {
    setEditingItem(row);
    setEditModalOpen(true);
  };
  const handleDelete = (row: any) => {
    if (window.confirm(`คุณต้องการลบ "${row.subTopic}" หรือไม่?`)) {
      setCategoryData((prev) => prev.filter((item) => item.no !== row.no));
    }
  };
  const handleSaveEdit = (updated: any) => {
    setCategoryData((prev) => prev.map((it) => (it.no === updated.no ? updated : it)));
  };

  const categoryColumns = [
    { key: "no", label: "No.", width: "w-16" },
    { key: "subTopic", label: "Sub Topic", width: "w-48", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "mainTopic", label: "Main Topic", width: "w-56", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "definition", label: "Definition", width: "w-80", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "exampleSentence", label: "Example Sentence", width: "w-80", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "status", label: "Status", width: "w-32", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "createdAt", label: "Created At", width: "w-28", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "lastUpdate", label: "Last Update", width: "w-28", render: (v: any) => <Trunc>{v}</Trunc> },
    {
      key: "actions",
      label: "",
      width: "w-40",
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => handleEdit(row)}
            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
            title="แก้ไข"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            title="ลบ"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  /* ---------- Branch Reference (sample data + CRUD local) ---------- */
  const [branchEditModalOpen, setBranchEditModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);

  const [branchData, setBranchData] = useState<any[]>([
    { branchId: 4, branchName: 'หน้าพระลาน', parentBranch: '-', address: '25-27 ถนนหน้าพระลาน แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพฯ 10200', division: 1, region: 3, district: 'พระนคร', description: 'ศิริราช', telephone: '0-2224-8060-1', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2224-8060 ต่อ 13', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 5, branchName: 'ยุติธรรม', parentBranch: '-', address: 'บริเวณอาคารที่จอดรถศาลอาญา ถนนรัชดาภิเษก แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900', division: 1, region: 1, district: 'จตุจักร', description: 'ห้วยขวาง', telephone: '0-2541-2638, 0-2541-2762,08-45377638, 08-45378074, 08-40114341, 08-60114095', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '-', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 6, branchName: 'มหาดไทย', parentBranch: '-', address: 'ภายในกระทรวงมหาดไทย ถนนเฟื่องนคร แขวงวัดราชบพิธ เขตพระนคร กรุงเทพฯ 10200', division: 1, region: 3, district: 'พระนคร', description: 'ศิริราช', telephone: 'เบอร์ติดต่อชั่วคราว 08 6037 3461 , 09 2757 9325 , 08 7804 4413', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2223-8287', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 7, branchName: 'บางลำภูบน', parentBranch: '-', address: '23-27 ถนนสิบสามห้าง แขวงตลาดยอด เขตพระนคร กรุงเทพฯ 10200', division: 1, region: 3, district: 'พระนคร', description: 'ศิริราช', telephone: '0-2281-9687, 0-2281-9307', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2281-9687 ต่อ 18', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 8, branchName: 'เทเวศร์', parentBranch: '-', address: '250/7-9 ถนนสามเสน แขวงบางขุนพรหม เขตพระนคร กรุงเทพฯ 10200', division: 1, region: 3, district: 'พระนคร', description: 'ศิริราช', telephone: '0-2282-6365-66', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2282-6366 ต่อ 20', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 9, branchName: 'ศรีย่าน', parentBranch: '-', address: '785-787 ถนนสามเสน แขวงถนนนครไชยศรี เขตดุสิต กรุงเทพฯ 10300', division: 1, region: 1, district: 'ดุสิต', description: 'ราชวัตร', telephone: '0-2243-0295, 0-2241-0364, 0-2244-8903, 08-5662-9303', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2243-0295', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 10, branchName: 'ราชวัตร', parentBranch: '-', address: '981/2 ถนนนครไชยศรี แขวงถนนนครไชยศรี เขตดุสิต กรุงเทพฯ 10300', division: 1, region: 1, district: 'ดุสิต', description: 'ราชวัตร', telephone: '0-2241-4511', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2241-4511 ต่อ 16', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 11, branchName: 'เจริญผล', parentBranch: '-', address: '1210-1212 ถนนบรรทัดทอง แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330', division: 1, region: 2, district: 'ปทุมวัน', description: 'ถนนเพชรบุรี', telephone: '0-2612-5203, 0-2214-0209', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2612-5203 ต่อ 106', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 12, branchName: 'หัวลำโพง', parentBranch: '-', address: '405 ถนนพระราม 4 แขวงรองเมือง เขตปทุมวัน กรุงเทพฯ 10330', division: 1, region: 2, district: 'ปทุมวัน', description: 'บางรัก', telephone: '0-2216-6340, 0-2214-0650', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2216-6340, 0-2214-0650 ต่อ 20', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 13, branchName: 'สามย่าน', parentBranch: '-', address: '1529, 1531 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330', division: 1, region: 2, district: 'ปทุมวัน', description: 'พร้อมพงษ์', telephone: '0-2216-8554, 0-2214-4810, 0-2215-1482', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2216-8230', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 14, branchName: 'คลองเตย', parentBranch: '-', address: '1210 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', division: 1, region: 2, district: 'คลองเตย', description: 'พร้อมพงษ์', telephone: '0-2671-2996, 0-2249-7951', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2249-7951 ต่อ 204', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 15, branchName: 'ทุ่งมหาเมฆ', parentBranch: '-', address: '572/1-2 ซอยสวนพลู ถนนสาทรใต้ แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพฯ 10120', division: 1, region: 3, district: 'สาทร', description: 'บางคอแหลม', telephone: '0-2679-4763', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2677-5731', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 16, branchName: 'บางคอแหลม', parentBranch: '-', address: '2350/22 ถนนเจริญกรุง แขวงบางคอแหลม เขตบางคอแหลม กรุงเทพฯ 10120', division: 1, region: 3, district: 'บางคอแหลม', description: 'บางคอแหลม', telephone: '0-2291-2879, 0-2292-0125, 09-8835-2028, 09-8835-2029', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2292-0125', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 17, branchName: 'สาทร', parentBranch: '-', address: '151-153 ถนนเจริญกรุง 57 แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120', division: 1, region: 2, district: 'สาทร', description: 'บางรัก', telephone: '0-2212-5444', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2212-5444 ต่อ 20', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 18, branchName: 'บางรัก', parentBranch: '-', address: '1231 ถนนเจริญกรุง แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500', division: 1, region: 2, district: 'บางรัก', description: 'บางรัก', telephone: '0-2630-9748, 0-2630-9808, 0-2234-9014', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2630-9808 ต่อ 20', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 19, branchName: 'ปากคลองตลาด', parentBranch: '-', address: '239 ถนนอัษฎางค์ แขวงวังบูรพาภิรมย์ เขตพระนคร กรุงเทพฯ 10200', division: 1, region: 3, district: 'พระนคร', description: 'ศิริราช', telephone: '0-2221-8365, 0-2223-2377', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2223-2377 ต่อ 16', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 21, branchName: 'จักรวรรดิ', parentBranch: '-', address: '327-335 ถนนจักรวรรดิ แขวงจักรวรรดิ เขตสัมพันธวงศ์ กรุงเทพฯ 10100', division: 1, region: 2, district: 'สัมพันธวงศ์', description: 'ถนนเพชรบุรี', telephone: '0-2223-7564, 0-2224-5307', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2224-5307', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 22, branchName: 'วรจักร', parentBranch: '-', address: '90-92 ถนนวรจักร แขวงบ้านบาตร เขตป้อมปราบศัตรูพ่าย กรุงเทพฯ 10100', division: 1, region: 2, district: 'ป้อมปราบศัตรูพ่าย', description: 'ถนนเพชรบุรี', telephone: '0-2223-2376', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2621-2198', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 23, branchName: 'นางเลิ้ง', parentBranch: '-', address: '159 ถนนนครสวรรค์ แขวงวัดโสมนัส เขตป้อมปราบศัตรูพ่าย กรุงเทพฯ 10100', division: 1, region: 1, district: 'ป้อมปราบศัตรูพ่าย', description: 'ราชวัตร', telephone: '0-2282-8505 ต่อ 11-13, 08-6010-0235', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2282-8505 ต่อ 16', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 24, branchName: 'มหานาค', parentBranch: '-', address: '292/13-14 ถนนลูกหลวง แขวงสี่แยกมหานาค เขตดุสิต กรุงเทพฯ 10300', division: 1, region: 1, district: 'ดุสิต', description: 'ราชวัตร', telephone: '0-2281-9356', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '-', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 25, branchName: 'ทำเนียบรัฐบาล', parentBranch: '-', address: '1 ทำเนียบรัฐบาล ถนนพิษณุโลก แขวงดุสิต เขตดุสิต กรุงเทพฯ 10300', division: 1, region: 1, district: 'ดุสิต', description: 'ราชวัตร', telephone: '0-2282-4333, 08-6010-1411', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2282-4333 ต่อ 13', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 26, branchName: 'อุรุพงษ์', parentBranch: '-', address: '133 ซอย 3 ถนนเพชรบุรี แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ 10400', division: 1, region: 2, district: 'ราชเทวี', description: 'ถนนเพชรบุรี', telephone: '0-2215-7816, 0-2216-6339', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2612-0070', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 27, branchName: 'ชัยสมรภูมิ', parentBranch: '-', address: '417/14 ถนนราชวิถี แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ 10400', division: 1, region: 1, district: 'ราชเทวี', description: 'ห้วยขวาง', telephone: '0-2644-9865-6, 08-6011-6010, 08-4537-6315, 08-4537-5938', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2644-9865 ต่อ 21 หรือ 12', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 28, branchName: 'ดินแดง', parentBranch: '-', address: '53/32 ถนนดินแดง แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400', division: 1, region: 1, district: 'ดินแดง', description: 'ห้วยขวาง', telephone: '0-2643-4242, 0-2643-3796, 08-6011-6625, 08-6011-7480, 08-7803-5738', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '-', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 29, branchName: 'ห้วยขวาง', parentBranch: '-', address: '2000/2-4 ถนนประชาสงเคราะห์ แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400', division: 1, region: 1, district: 'ดินแดง', description: 'ห้วยขวาง', telephone: '0-2277-4199, 0-2692-5657, 0-2692-7500, 08-45375011, 08-60119341,08-60117891', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2692-6923', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 30, branchName: 'โชคชัย 4', parentBranch: '-', address: '1748-1750 ถนนลาดพร้าว แขวงวังทองหลาง เขตวังทองหลาง กรุงเทพฯ 10310', division: 1, region: 2, district: 'วังทองหลาง', description: 'คลองจั่น', telephone: '0-2933-7700, 0-2530-5210, 0-2933-6789 ,0-2514-3090', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2933-6789, 0-2933-7700 ต่อ 13, 26', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 31, branchName: 'ลาดพร้าว', parentBranch: '-', address: '593/5-6 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900', division: 1, region: 1, district: 'จตุจักร', description: 'ห้วยขวาง', telephone: '0-2513-3661, 0-2513-8311, 08-6011-9558, 08-6011-9522, 09-2757-9265', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2513-3661 ต่อ 14', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 33, branchName: 'บางเขน', parentBranch: '-', address: '1712-14 ถนนพหลโยธิน แขวงจันทรเกษม เขตจตุจักร กรุงเทพฯ 10900', division: 1, region: 1, district: 'จตุจักร', description: 'บางเขน', telephone: '0-2513-7074, 0-2513-7019', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2513-7074 ต่อ 18', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 34, branchName: 'มหาวิทยาลัยเกษตรศาสตร์', parentBranch: '-', address: '50 มหาวิทยาลัยเกษตรศาสตร์ ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900', division: 1, region: 1, district: 'จตุจักร', description: 'บางเขน', telephone: '0-2562-0716, 0-2579-7556', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2562-0716', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 36, branchName: 'เตาปูน', parentBranch: '-', address: '416/8-9 ถนนประชาราษฎร์ สาย 2 แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 10800', division: 1, region: 1, district: 'บางซื่อ', description: 'บางเขน', telephone: '0-2585-6143, 0-2910-3905', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2910-3905 ต่อ 20', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 37, branchName: 'ถนนเพชรบุรี', parentBranch: '-', address: '1089/2-3 ถนนเพชรบุรีตัดใหม่ แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400', division: 1, region: 2, district: 'ราชเทวี', description: 'ถนนเพชรบุรี', telephone: '0-2253-2939, 0-2650-1644, 0-2651-6300', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2253-2939 ต่อ 20', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 38, branchName: 'พร้อมพงษ์', parentBranch: '-', address: '659 ปากซอยสุขุมวิท 39 ถนนสุขุมวิท แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110', division: 1, region: 2, district: 'วัฒนา', description: 'พร้อมพงษ์', telephone: '0-2662-7275-7', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2662-7274', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 39, branchName: 'ป้อมปราบ', parentBranch: '-', address: '1/1-2 ถนนเสือป่า แขวงป้อมปราบ เขตป้อมปราบศัตรูพ่าย กรุงเทพฯ 10100', division: 1, region: 2, district: 'ป้อมปราบศัตรูพ่าย', description: 'ถนนเพชรบุรี', telephone: '0-2226-3042, 0-2622-9903', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2222-3860', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 40, branchName: 'พระโขนง', parentBranch: '-', address: '1176 ถนนสุขุมวิท 48 แขวงพระโขนง เขตคลองเตย กรุงเทพฯ 10110', division: 1, region: 2, district: 'คลองเตย', description: 'พระโขนง', telephone: '0-2391-1608, 0-2712-4086, 0-2713-5370', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2712-4115', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 42, branchName: 'ราชประสงค์', parentBranch: '-', address: '492/1 ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330', division: 1, region: 2, district: 'ปทุมวัน', description: 'พร้อมพงษ์', telephone: '0-2252-7319, 0-2255-3868', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2252-7319 ต่อ 20', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 43, branchName: 'ศูนย์ราชการเฉลิมพระเกียรติ แจ้งวัฒนะ (อาคาร B)', parentBranch: '-', address: 'ห้องเลขที่ 126-128 ชั้น BC1 อาคาร B ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพฯ 10210', division: 1, region: 1, district: 'หลักสี่', description: 'สะพานใหม่', telephone: '0-2143-8958-60', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2143-8958-60 ต่อ 19', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 44, branchName: 'กระทรวงการคลัง', parentBranch: '-', address: 'ภายในกระทรวงการคลัง ถนนพระราม 6 แขวงพญาไท เขตพญาไท กรุงเทพฯ 10400', division: 1, region: 1, district: 'พญาไท', description: 'ห้วยขวาง', telephone: '0-2298-5898, 0-2271-2444, 08-6013-0790, 08-6013-0620', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '-', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 45, branchName: 'สาธุประดิษฐ์', parentBranch: '-', address: '604/128, 134 ถนนสาธุประดิษฐ์ แขวงบางโพงพาง เขตยานนาวา กรุงเทพฯ 10120', division: 1, region: 3, district: 'ยานนาวา', description: 'บางคอแหลม', telephone: '0-2294-2071', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2284-0486', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 46, branchName: 'ถนนจันทน์', parentBranch: '-', address: '115 ถนนจันทน์ แขวงทุ่งวัดดอน เขตสาทร กรุงเทพฯ 10120', division: 1, region: 2, district: 'สาทร', description: 'บางรัก', telephone: '0-2676-3009-10, 0-2286-5852', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2676-3009 ต่อ 14', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 47, branchName: 'จตุจักร', parentBranch: '-', address: 'ภายในกองอำนวยการตลาดนัดจตุจักร ถนนกำแพงเพชร 2 แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900', division: 1, region: 1, district: 'จตุจักร', description: 'บางเขน', telephone: '0-2002-1592 , 086-009-4533 , 086-009-4707', province: 'กรุงเทพฯ', branchType: '7 วัน', fax: '-', serviceTime: 'จ-อา 09.00-17.00 น.', workTime: 'จ-อา 09.00-18.00 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 48, branchName: 'บางโพงพาง', parentBranch: '-', address: '247/1-3 ซอยสาธุประดิษฐ์ 58 แยก 18 ถนนสาธุประดิษฐ์ แขวงบางโพงพาง เขตยานนาวา กรุงเทพฯ 10120', division: 1, region: 3, district: 'ยานนาวา', description: 'บางคอแหลม', telephone: '0-2294-8701, 0-2294-8705', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2294-8701', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 49, branchName: 'สวนจิตรลดา', parentBranch: '-', address: 'อาคารธนาคารออมสินเฉลิมพระเกียรติ ภายในบริเวณพระราชวังสวนจิตรลดา แขวงสวนจิตรลดา เขตดุสิต กรุงเทพฯ 10303', division: 1, region: 1, district: 'ดุสิต', description: 'ราชวัตร', telephone: '0-2668-3458-9', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2668-3459', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 50, branchName: 'ตลาดวงศกร', parentBranch: '-', address: '80/2 ถนนสายไหม แขวงสายไหม เขตสายไหม กรุงเทพฯ 10220', division: 1, region: 1, district: 'สายไหม', description: 'สะพานใหม่', telephone: '0-2563-5213-15', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2563-5213-15 ต่อ 20', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 51, branchName: 'สีลม', parentBranch: '-', address: '144, 144/1 ถนนสีลม แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500', division: 1, region: 2, district: 'บางรัก', description: 'บางรัก', telephone: '0-2634-4977-8', province: 'กรุงเทพฯ', branchType: '5 วัน', fax: '0-2634-4977 ต่อ 13', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 52, branchName: 'ไอที สแควร์', parentBranch: '-', address: 'ห้องเลขที่ B-009 - 012 ชั้น 2 ศูนย์การค้าไอที สแควร์ เลขที่ 333/37 ถนนกำแพงเพชร 6 แขวงตลาดบางเขน เขตหลักสี่ กรุงเทพฯ 10210', division: 1, region: 1, district: 'หลักสี่', description: 'สะพานใหม่', telephone: '0-2576-1624, 0-2576-1628', province: 'กรุงเทพฯ', branchType: '7 วัน', fax: '-', serviceTime: 'จ-อา 10.00-18.00 น.', workTime: 'จ-อา 10.00-19.00 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 201, branchName: 'นนทบุรี', parentBranch: '-', address: '22/31 หมู่ที่ 4 ถนนประชาราษฎร์ ตำบลสวนใหญ่ อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000', division: 2, region: 5, district: 'เมืองนนทบุรี', description: 'นนทบุรี 1', telephone: '0-2526-6518, 0-2967-3207, 0-2525-0216', province: 'นนทบุรี', branchType: '5 วัน', fax: '0-2525-0216, 0-2526-6518,0-2967-3207 ต่อ 15', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 203, branchName: 'บางบัวทอง', parentBranch: '-', address: '26/1 หมู่ที่ 2 ถนนบางกรวย – ไทรน้อย ตำบลโสนลอย อำเภอบางบัวทอง จังหวัดนนทบุรี 11110', division: 2, region: 5, district: 'บางบัวทอง', description: 'นนทบุรี 2', telephone: '0-2571-2460, 0-2571-7970', province: 'นนทบุรี', branchType: '5 วัน', fax: '0-2571-7970 ต่อ 13', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 204, branchName: 'บางกรวย', parentBranch: '-', address: '99/99 หมู่ที่ 3 ตำบลวัดชลอ อำเภอบางกรวย จังหวัดนนทบุรี 11130', division: 2, region: 5, district: 'บางกรวย', description: 'นนทบุรี 2', telephone: '0-2447-5108, 0-2883-6977, 0-2883-7837', province: 'นนทบุรี', branchType: '5 วัน', fax: '0-2883-7837 ต่อ 17', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 205, branchName: 'บางใหญ่', parentBranch: '-', address: '107 หมู่ที่ 2 ตำบลบางม่วง อำเภอบางใหญ่ จังหวัดนนทบุรี 11140', division: 2, region: 5, district: 'บางใหญ่', description: 'นนทบุรี 2', telephone: '0-2595-1625', province: 'นนทบุรี', branchType: '5 วัน', fax: '0-2595-1625 ต่อ 21', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' },
    { branchId: 206, branchName: 'ปากเกร็ด', parentBranch: '-', address: '100/19-21 ถนนแจ้งวัฒนะ ตำบลปากเกร็ด อำเภอปากเกร็ด จังหวัดนนทบุรี 11120', division: 2, region: 5, district: 'ปากเกร็ด', description: 'นนทบุรี 1', telephone: '0-2583-3376, 0-2583-4616', province: 'นนทบุรี', branchType: '5 วัน', fax: '0-2583-3376', serviceTime: 'จ-ศ 08.30-15.30 น.', workTime: 'จ-ศ 08.30-16.30 น.', status: 'อนุญาต', createdAt: '01/01/2567', lastUpdate: '15/01/2567' }
  ]);

  const handleBranchEdit = (row: any) => {
    setEditingBranch(row);
    setBranchEditModalOpen(true);
  };
  const handleSaveBranchEdit = (updated: any) => {
    setBranchData((prev) => prev.map((it) => (it.branchId === updated.branchId ? updated : it)));
  };
  const handleBranchDelete = (row: any) => {
    if (window.confirm(`คุณต้องการลบสาขา "${row.branchName}" หรือไม่?`)) {
      setBranchData((prev) => prev.filter((it) => it.branchId !== row.branchId));
    }
  };

  const branchColumns = [
    { key: "branchId", label: "Branch ID", width: "w-24" },
    { key: "branchName", label: "Branch Name", width: "w-56", render: (v: any) => <Trunc>{v}</Trunc> },
    {
      key: "parentBranch",
      label: "Parent Branch",
      width: "w-32",
      render: (v: any) => <Trunc>{v === "-" || !v ? "-" : v}</Trunc>,
    },
    { key: "address", label: "Address", width: "w-80", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "division", label: "Division", width: "w-24" },
    { key: "region", label: "Region", width: "w-24" },
    { key: "district", label: "District", width: "w-40", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "description", label: "Description", width: "w-40", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "telephone", label: "Telephone", width: "w-64", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "province", label: "Province", width: "w-32", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "branchType", label: "Branch Type", width: "w-32", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "fax", label: "Fax", width: "w-48", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "serviceTime", label: "Service Time", width: "w-48", render: (v: any) => <Trunc>{v}</Trunc> },
    { key: "workTime", label: "Work Time", width: "w-48", render: (v: any) => <Trunc>{v}</Trunc> },
    {
      key: "actions",
      label: "",
      width: "w-40",
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => handleBranchEdit(row)}
            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
            title="แก้ไข"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleBranchDelete(row)}
            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            title="ลบ"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleLogout = () => navigate("/");

  const handleRefresh = () => {
    // ปกติจะเรียก API; ตอนนี้รีโหลดหน้าแทน
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mini rail */}
      <MiniRailSidebar activeMenu="เอกสารอ้างอิง" onToggleMainSidebar={() => setDrawerOpen(true)} />

      {/* Topbar */}
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
                <p className="text-white text-base font-kanit">อัปเดตล่าสุด: {updatedAt}</p>
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

      {/* Drawer เมนูหลัก */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" className="w-80 md:ml-[72px]">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle className="font-kanit">เมนูหลัก</SheetTitle>
          </SheetHeader>

          <div className="mt-6">
            <MenuItems activeKey="เอกสารอ้างอิง" onItemClick={() => setDrawerOpen(false)} />
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-xs text-muted-foreground text-center font-kanit">
              อัปเดตล่าสุด: {updatedAt}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main */}
      <main className="main-content transition-all duration-200 ease-out">
        <div className="container mx-auto p-6 space-y-8">
          {/* หัวข้อหน้า */}
          <div className="mb-2">
            <h2 className="text-3xl font-bold text-foreground font-kanit mb-2">เอกสารอ้างอิง</h2>
            <p className="text-muted-foreground font-kanit">
              รวบรวมเอกสาร นโยบาย และคู่มือที่เกี่ยวข้องกับการจัดการข้อร้องเรียน
            </p>
          </div>

          {/* ตารางอ้างอิงหมวดหมู่ */}
          <TableCard title="ตารางอ้างอิงหมวดหมู่ (Category Reference)" onRefresh={handleRefresh}>
            {/* ป้องกันตัดบรรทัด + ให้เลื่อนแกน X ได้ */}
            <div className="overflow-x-auto whitespace-nowrap">
              <DataTable
                columns={categoryColumns}
                rows={categoryData}
                searchableKeys={["subTopic", "mainTopic", "definition", "exampleSentence"]}
                sortableKeys={["subTopic", "mainTopic"]}
                statusKey="status"
                itemsPerPage={20}
              />
            </div>
          </TableCard>

          {/* ตารางอ้างอิงสาขา */}
          <TableCard title="ตารางอ้างอิงสาขา (Branch Reference)" onRefresh={handleRefresh}>
            <div className="overflow-x-auto whitespace-nowrap">
              <DataTable
                columns={branchColumns}
                rows={branchData}
                searchableKeys={[
                  "branchId",
                  "branchName",
                  "address",
                  "district",
                  "province",
                  "telephone",
                  "description",
                ]}
                sortableKeys={["branchName", "province"]}
                itemsPerPage={20}
              />
            </div>
          </TableCard>
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

      {/* Modals */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveEdit}
        initialData={editingItem}
      />
      <BranchEditModal
        isOpen={branchEditModalOpen}
        onClose={() => {
          setBranchEditModalOpen(false);
          setEditingBranch(null);
        }}
        onSave={handleSaveBranchEdit}
        initialData={editingBranch}
      />
      <FeedbackFlowModal open={flowOpen} onOpenChange={setFlowOpen} hideInternalTrigger />
    </div>
  );
};

export default ReferenceTablesPage;
