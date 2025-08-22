import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortField, SortDirection } from "@shared/schema";

interface SortCriterionItemProps {
  id: string;
  field: SortField;
  direction: SortDirection;
  label: string;
  options: { asc: string; desc: string };
  onToggleDirection: () => void;
  onRemove: () => void;
}

export default function SortCriterionItem({
  id,
  field,
  direction,
  label,
  options,
  onToggleDirection,
  onRemove,
}: SortCriterionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200 group hover:bg-slate-100 transition-colors"
      data-testid={`sortable-item-${field}`}
    >
      {/* Drag Handle */}
      <div className="flex items-center space-x-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
          data-testid={`drag-handle-${field}`}
        >
          <GripVertical className="w-4 h-4 text-slate-400" />
        </div>
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      
      {/* Controls */}
      <div className="flex items-center space-x-2">
        {/* Toggle Direction Buttons */}
        <div className="flex bg-white border border-slate-200 rounded-md overflow-hidden">
          <button
            onClick={onToggleDirection}
            className={`px-3 py-1 text-xs ${
              direction === 'asc'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            data-testid={`toggle-asc-${field}`}
          >
            {options.asc}
          </button>
          <button
            onClick={onToggleDirection}
            className={`px-3 py-1 text-xs ${
              direction === 'desc'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            data-testid={`toggle-desc-${field}`}
          >
            {options.desc}
          </button>
        </div>
        
        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-6 w-6 p-1 text-slate-400 hover:text-slate-600 rounded"
          data-testid={`remove-criterion-${field}`}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
