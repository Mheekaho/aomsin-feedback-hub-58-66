import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopicOption {
  value: string;
  label: string;
}

interface TopicFilterDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const topicOptions: TopicOption[] = [
  { value: "all", label: "เลือกทั้งหมด" },
  { value: "การดูแล ความเอาใจใส่", label: "การดูแล ความเอาใจใส่" },
  { value: "ความน่าเชื่อถือการตอบคำถามและแนะนำ", label: "ความน่าเชื่อถือการตอบคำถามและแนะนำ" },
  { value: "ความรวดเร็วในการให้บริการ", label: "ความรวดเร็วในการให้บริการ" },
  { value: "ความถูกต้องในการทำธุรกรรม", label: "ความถูกต้องในการทำธุรกรรม" },
  { value: "ความพร้อมของเครื่องมือ", label: "ความพร้อมของเครื่องมือ" },
  { value: "สภาพแวดล้อมของสาขา", label: "สภาพแวดล้อมของสาขา" },
  { value: "ความประทับใจในการให้บริการ", label: "ความประทับใจในการให้บริการ" }
];

export const TopicFilterDropdown: React.FC<TopicFilterDropdownProps> = ({
  value,
  onValueChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = topicOptions.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : "เลือกทั้งหมด";

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, optionValue: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect(optionValue);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-auto min-w-[180px] bg-white border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 text-sm font-kanit justify-between rounded-lg shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className="whitespace-nowrap">{displayText}</span>
        <ChevronDown className="h-4 w-4 flex-shrink-0" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown Menu */}
          <div 
            className="absolute right-0 mt-1 w-auto min-w-[360px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden"
            role="menu"
            aria-orientation="vertical"
          >
            {topicOptions.map((option) => (
              <div
                key={option.value}
                role="menuitemradio"
                aria-checked={value === option.value}
                tabIndex={0}
                className="relative flex items-center whitespace-nowrap leading-6 py-2 px-3 hover:bg-gray-50 cursor-pointer font-kanit text-sm transition-colors"
                onClick={() => handleSelect(option.value)}
                onKeyDown={(e) => handleKeyDown(e, option.value)}
              >
                {/* Icon area - ~20px wide */}
                <div className="w-5 h-5 mr-2 flex items-center justify-center flex-shrink-0">
                  {value === option.value && (
                    <Check className="h-4 w-4 text-pink-600" />
                  )}
                </div>
                
                {/* Text content */}
                <span className="whitespace-nowrap">
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};