import React, { useState } from "react";

/** ---------- Types ---------- */
type TagTone = "positive" | "negative";
type Tag = { group: string; name: string; tone: TagTone; note?: string };
type Area = { line: number; region: number; province: string; district: string; branch: string };
type Dataset = {
  id: string;
  sentiment: "Positive" | "Negative";
  submittedAt: string;
  area: Area;
  types: string[];
  comment: string;
  tags: Tag[];
  scores: number[];
};

type FeedbackFlowModalProps = {
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
  hideInternalTrigger?: boolean;
};

/** ---------- Main Component ---------- */
export default function FeedbackFlowModal({
  open,
  onOpenChange,
  hideInternalTrigger,
}: FeedbackFlowModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const actuallyOpen = open ?? internalOpen;

  const handleClose = () => {
    onOpenChange?.(false);
    setInternalOpen(false);
  };

  const METRICS = [
    "การดูแล เอาใจใส่ ความสบายใจขณะเข้าใช้บริการ:",
    "การตอบคำถาม ให้คำแนะนำ ความน่าเชื่อถือ ความเป็นมืออาชีพ:",
    "ความรวดเร็วในการให้บริการ (หลังเรียกคิว):",
    "ความถูกต้องในการทำธุรกรรม:",
    "ความพร้อมของเครื่องมือ:",
    "ภาพแวดล้อมของสาขา เช่น การจัดพื้นที่ ความสะอาด แสงสว่าง:",
    "ความประทับใจในการเข้าใช้บริการที่ธนาคารออมสินสาขา:",
  ];

  const datasets: Dataset[] = [
    {
      id: "6402_2025-06-10T02:14:23.000Z",
      sentiment: "Positive",
      submittedAt: "10 มิ.ย. 2025 | 09:14 น.",
      area: { line: 6, region: 16, province: "ภูเก็ต", district: "กะทู้", branch: "ป่าตอง" },
      types: ["ฝากเงินถอนเงิน"],
      comment: "พนักงานเป็นกันเอง",
      tags: [{ group: "พนักงานและบุคลากร", name: "ความเอาใจใส่ในการให้บริการลูกค้า", tone: "positive", note: "พนักงานเป็นกันเอง" }],
      scores: [5, 5, 5, 5, 5, 5, 5],
    },
    {
      id: "151_2025-06-03T04:57:30.000Z",
      sentiment: "Negative",
      submittedAt: "03 มิ.ย. 2025 | 11:57 น.",
      area: { line: 1, region: 1, province: "กรุงเทพฯ", district: "บางเขน", branch: "ตลาดยิ่งเจริญ" },
      types: ["สมัครใช้ผลิตภัณฑ์"],
      comment: "รอนาน ระบบติดขัดช่วงยื่นเอกสาร",
      tags: [{ group: "พนักงานและบุคลากร", name: "ความรวดเร็วในการให้บริการ", tone: "negative", note: "คิวช้า" }],
      scores: [3, 4, 2, 4, 3, 4, 3],
    },
    {
      id: "115_2025-05-27T07:13:02.000Z",
      sentiment: "Positive",
      submittedAt: "27 พ.ค. 2025 | 14:13 น.",
      area: { line: 1, region: 3, province: "กรุงเทพฯ", district: "บางกอกใหญ่", branch: "ท่าพระ" },
      types: ["ฝากเงินถอนเงิน", "สอบถามข้อมูล"],
      comment: "ให้คำแนะนำดีมาก บริการรวดเร็ว",
      tags: [
        { group: "พนักงานและบุคลากร", name: "ความสามารถในการตอบคำถามหรือให้คำแนะนำ", tone: "positive", note: "ให้คำแนะนำดี" },
        { group: "พนักงานและบุคลากร", name: "ความรวดเร็วในการให้บริการ", tone: "positive", note: "บริการรวดเร็ว" },
      ],
      scores: [5, 5, 5, 5, 4, 4, 5],
    },
    {
      id: "6601_2025-05-16T04:54:32.000Z",
      sentiment: "Negative",
      submittedAt: "16 พ.ค. 2025 | 11:54 น.",
      area: { line: 6, region: 17, province: "ตรัง", district: "เมืองตรัง", branch: "ตรัง" },
      types: ["ฝากเงินถอนเงิน"],
      comment: "เครื่องกดบัตรเสียบ่อย ต้องเดินไปถามพนักงาน",
      tags: [{ group: "อุปกรณ์/ระบบ", name: "ความพร้อมของเครื่องมือ", tone: "negative", note: "เครื่องขัดข้อง" }],
      scores: [4, 4, 3, 4, 2, 4, 3],
    },
    {
      id: "9999_2025-05-01T08:30:00.000Z",
      sentiment: "Positive",
      submittedAt: "01 พ.ค. 2025 | 15:30 น.",
      area: { line: 4, region: 5, province: "เชียงใหม่", district: "เมือง", branch: "นิมมาน" },
      types: ["ปรึกษาสินเชื่อ"],
      comment: "อธิบายเงื่อนไขชัดเจน ไม่ยัดเยียดการขาย",
      tags: [{ group: "พนักงานและบุคลากร", name: "ความน่าเชื่อถือ/ความเป็นมืออาชีพ", tone: "positive", note: "สุภาพ" }],
      scores: [5, 5, 4, 5, 4, 5, 5],
    },
  ];

  return (
    <div>
      {!hideInternalTrigger && (
        <button
          type="button"
          onClick={() => setInternalOpen(true)}
          className="rounded bg-rose-600 px-4 py-2 text-white"
        >
          เปิดประวัติ
        </button>
      )}

      {actuallyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 z-40 bg-black/40" onClick={handleClose} aria-hidden="true" />
          {/* Dialog */}
          <div
            className="relative z-50 h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Header modal */}
            <div className="bg-white">
              <div className="h-1 bg-gradient-to-r from-[#DF7AB0] to-[#F9B5D3]" />
              <div className="flex items-center justify-between px-6 py-3">
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="close"
                  className="absolute top-3 right-3 rounded-lg p-2 hover:bg-neutral-100"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="h-[calc(90vh-56px)] overflow-y-auto px-6 pb-6 pt-4 space-y-6">
              {datasets.map((d) => (
                <Page key={d.id} data={d} metrics={METRICS} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** ---------- Sub-components ---------- */
function Page({ data, metrics }: { data: Dataset; metrics: string[] }) {
  const isPos = data.sentiment === "Positive";
  const theme = isPos
    ? { wrap: "border-emerald-200 bg-emerald-50", senti: "text-emerald-700" }
    : { wrap: "border-rose-200 bg-rose-50", senti: "text-rose-700" };

  return (
    <div className={`overflow-hidden rounded-2xl border ${theme.wrap}`}>
      {/* Card header */}
      <div className="bg-white/90">
        <div className="h-1 bg-gradient-to-r from-[#E879F9] via-[#F472B6] to-[#F9A8D4]" />
        <div className="flex items-center justify-between px-5 py-3">
          <div className="font-mono text-xs text-neutral-600">ID: {data.id}</div>
          <div className={`text-xs font-medium ${theme.senti}`}>{data.sentiment}</div>
        </div>
      </div>

      {/* Content: แยกซ้าย/ขวา ชัดเจน */}
      <div className="grid gap-6 bg-white/70 p-5 md:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <Section title="เวลาที่ส่งข้อเสนอแนะ">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">เวลาที่ส่ง:</span>
              <span className="font-medium text-neutral-800">{data.submittedAt}</span>
            </div>
          </Section>

          {/* พื้นที่ให้บริการ (คงกรอบ) */}
          <Section title="พื้นที่ให้บริการ">
            <InfoRow label="สายกิจ" value={String(data.area.line)} />
            <InfoRow label="ภาค" value={String(data.area.region)} />
            <InfoRow label="จังหวัด" value={data.area.province} />
            <InfoRow label="เขต" value={data.area.district} />
            <InfoRow label="สาขา" value={data.area.branch} />
          </Section>

          {/* ความพึงพอใจ (คงกรอบ + progress) */}
          <Section title="ความพึงพอใจ">
            <div className="space-y-3">
              {metrics.map((m, i) => {
                const score = data.scores[i] ?? 0;
                const percent = Math.max(0, Math.min(100, score * 20));
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="pr-3 text-neutral-800">{m}</div>
                      <div className="shrink-0 text-neutral-800">{score}/5</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                      <div className={`h-full ${isPos ? "bg-emerald-500" : "bg-rose-500"}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* ประเภทที่ใช้บริการ → ใส่กรอบการ์ด และยาวเท่าอันอื่น */}
          <Section title="ประเภทที่ใช้บริการ">
            <div className="flex flex-wrap gap-2">
              {data.types.map((t, i) => (
                <span
                  key={i}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </Section>


          {/* การจำแนกประเภทความคิดเห็น (คงกรอบ) */}
          <Section title="การจำแนกประเภทความคิดเห็น">
            {data.tags.length === 0 ? (
              <div className="text-sm text-neutral-500">ยังไม่มีการจำแนกประเภท</div>
            ) : (
              <div className="space-y-3">
                {data.tags.map((t, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-3 ${
                      t.tone === "positive" ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"
                    }`}
                  >
                    <div className="text-xs font-semibold text-neutral-700">{t.group}</div>
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <div className="text-sm text-neutral-800">{t.name}</div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.tone === "positive" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                        }`}
                      >
                        {t.tone === "positive" ? "เชิงบวก" : "เชิงลบ"}
                      </span>
                    </div>
                    {t.note && <div className="mt-1 text-xs text-neutral-600">{t.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}

/** ---------- UI atoms ---------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
        <div className="text-sm font-semibold text-neutral-800">{title}</div>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-neutral-500">{label}</span>
      <span className="text-neutral-800">{value}</span>
    </div>
  );
}