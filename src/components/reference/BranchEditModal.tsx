import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

interface BranchEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
}

const BranchEditModal: React.FC<BranchEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    branchId: "",
    branchName: "",
    parentBranch: "",
    address: "",
    region: "",
    status: "อนุญาต",
    createdAt: "",
    lastUpdate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        branchId: initialData.branchId || "",
        branchName: initialData.branchName || "",
        parentBranch: initialData.parentBranch || "",
        address: initialData.address || "",
        region: initialData.region || "",
        status: initialData.status || "อนุญาต",
        createdAt: initialData.createdAt || "",
        lastUpdate: initialData.lastUpdate || "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const lastUpdate = now.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    onSave({
      ...initialData,
      ...formData,
      lastUpdate,
    });
    onClose();
  };

  if (!isOpen) return null;

  // ชุดคลาสมาตรฐานของ input/select/textarea ให้กึ่ง compact และไม่หักบรรทัด
  const baseField =
    "w-full min-w-0 px-3 py-2 rounded-lg border border-gray-200 outline-none " +
    "focus:ring-2 focus:ring-[#D8218C]/20 focus:border-[#D8218C]";

  const readOnlyField =
    "w-full min-w-0 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 outline-none";

  const labelClass =
    "block text-sm font-medium text-gray-700 mb-1 whitespace-nowrap";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">แก้ไขข้อมูลสาขา</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="ปิด"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* กริด 12 คอลัมน์ เว้นช่องน้อยลงเพื่อไม่ให้บรรทัดกระโดด */}
          <div className="grid grid-cols-12 gap-x-4 gap-y-3">
            {/* แถวบน: ID / สถานะ / ภาค */}
            <div className="col-span-12 md:col-span-4">
              <label className={labelClass}>Branch ID</label>
              <input type="text" value={formData.branchId} className={readOnlyField} readOnly />
            </div>

            <div className="col-span-12 md:col-span-4">
              <label className={labelClass}>สถานะ</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className={baseField}
              >
                <option value="อนุญาต">อนุญาต</option>
                <option value="ไม่อนุญาต">ไม่อนุญาต</option>
              </select>
            </div>

            <div className="col-span-12 md:col-span-4">
              <label className={labelClass}>Region</label>
              <select
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className={baseField}
                required
              >
                <option value="">เลือกภาค</option>
                <option value="กลาง">กลาง</option>
                <option value="เหนือ">เหนือ</option>
                <option value="อีสาน">อีสาน</option>
                <option value="ใต้">ใต้</option>
              </select>
            </div>

            {/* ชื่อสาขา / สาขาต้นสังกัด */}
            <div className="col-span-12 md:col-span-8">
              <label className={labelClass}>Branch Name</label>
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) =>
                  setFormData({ ...formData, branchName: e.target.value })
                }
                className={baseField}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <label className={labelClass}>Parent Branch</label>
              <input
                type="text"
                value={formData.parentBranch}
                onChange={(e) =>
                  setFormData({ ...formData, parentBranch: e.target.value })
                }
                className={baseField}
                placeholder="-"
              />
            </div>

            {/* ที่อยู่ เต็มแถว */}
            <div className="col-span-12">
              <label className={labelClass}>Address</label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={3}
                className={`${baseField} resize-none`}
                required
              />
            </div>

            {/* วันสร้าง / อัปเดตล่าสุด (แสดงอ่านอย่างเดียว) */}
            <div className="col-span-12 md:col-span-6">
              <label className={labelClass}>สร้างเมื่อ</label>
              <input
                type="text"
                value={formData.createdAt || "-"}
                className={readOnlyField}
                readOnly
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label className={labelClass}>อัปเดตล่าสุด</label>
              <input
                type="text"
                value={formData.lastUpdate || "-"}
                className={readOnlyField}
                readOnly
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-[#D8218C] text-white rounded-lg hover:bg-[#D8218C]/90 transition-colors text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchEditModal;