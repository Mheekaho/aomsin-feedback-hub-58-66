import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
}
const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [formData, setFormData] = useState({
    subTopic: '',
    mainTopic: '',
    definition: '',
    exampleSentence: '',
    status: 'อนุญาต',
    createdAt: ''
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        subTopic: initialData.subTopic || '',
        mainTopic: initialData.mainTopic || '',
        definition: initialData.definition || '',
        exampleSentence: initialData.exampleSentence || '',
        status: initialData.status || 'อนุญาต',
        createdAt: initialData.createdAt || ''
      });
    }
  }, [initialData]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const lastUpdate = now.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    onSave({
      ...initialData,
      ...formData,
      lastUpdate
    });
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">แก้ไขข้อมูลหมวดหมู่</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sub Topic</label>
            <input type="text" value={formData.subTopic} onChange={e => setFormData({
            ...formData,
            subTopic: e.target.value
          })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Topic</label>
            <input type="text" value={formData.mainTopic} onChange={e => setFormData({
            ...formData,
            mainTopic: e.target.value
          })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Definition</label>
            <textarea value={formData.definition} onChange={e => setFormData({
            ...formData,
            definition: e.target.value
          })} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Example Sentence</label>
            <textarea value={formData.exampleSentence} onChange={e => setFormData({
            ...formData,
            exampleSentence: e.target.value
          })} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" required />
          </div>
          
          <div>
            
            
          </div>
          
          <div>
            
            
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
              ยกเลิก
            </button>
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <Save className="w-4 h-4" />
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default EditModal;