import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortConfig, SortCriterion, SortField } from "@shared/schema";
import { Button } from "@/components/ui/button";
import SortCriterionItem from "./sort-criterion-item";
import { Plus } from "lucide-react";

interface SortPanelProps {
  sortConfig: SortConfig;
  onChange: (config: SortConfig) => void;
  onApply: () => void;
  onClose: () => void;
}

const FIELD_LABELS: Record<SortField, string> = {
  name: "Client Name",
  createdAt: "Created At",
  updatedAt: "Updated At",
  id: "Client ID",
  type: "Client Type",
  email: "Email",
  status: "Status",
};

const FIELD_OPTIONS: Record<SortField, { asc: string; desc: string }> = {
  name: { asc: "A-Z", desc: "Z-A" },
  createdAt: { asc: "Oldest to Newest", desc: "Newest to Oldest" },
  updatedAt: { asc: "Oldest to Newest", desc: "Newest to Oldest" },
  id: { asc: "A-Z", desc: "Z-A" },
  type: { asc: "A-Z", desc: "Z-A" },
  email: { asc: "A-Z", desc: "Z-A" },
  status: { asc: "A-Z", desc: "Z-A" },
};

export default function SortPanel({ sortConfig, onChange, onApply, onClose }: SortPanelProps) {
  const [localConfig, setLocalConfig] = useState<SortConfig>(sortConfig);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLocalConfig(sortConfig);
  }, [sortConfig]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localConfig.activeCriteria.findIndex(
        (criterion) => `${criterion.field}-${criterion.direction}` === active.id
      );
      const newIndex = localConfig.activeCriteria.findIndex(
        (criterion) => `${criterion.field}-${criterion.direction}` === over.id
      );

      const newActiveCriteria = arrayMove(localConfig.activeCriteria, oldIndex, newIndex);
      const newConfig = { ...localConfig, activeCriteria: newActiveCriteria };
      setLocalConfig(newConfig);
      onChange(newConfig);
    }
  };

  const toggleDirection = (field: SortField) => {
    const criterionIndex = localConfig.activeCriteria.findIndex(c => c.field === field);
    if (criterionIndex >= 0) {
      const newActiveCriteria = [...localConfig.activeCriteria];
      newActiveCriteria[criterionIndex] = {
        ...newActiveCriteria[criterionIndex],
        direction: newActiveCriteria[criterionIndex].direction === 'asc' ? 'desc' : 'asc'
      };
      const newConfig = { ...localConfig, activeCriteria: newActiveCriteria };
      setLocalConfig(newConfig);
      onChange(newConfig);
    }
  };

  const removeCriterion = (field: SortField) => {
    const newActiveCriteria = localConfig.activeCriteria.filter(c => c.field !== field);
    const newInactiveCriteria = [...localConfig.inactiveCriteria, field];
    const newConfig = {
      activeCriteria: newActiveCriteria,
      inactiveCriteria: newInactiveCriteria
    };
    setLocalConfig(newConfig);
    onChange(newConfig);
  };

  const addCriterion = (field: SortField) => {
    const defaultDirection: 'asc' | 'desc' = field === 'createdAt' || field === 'updatedAt' ? 'desc' : 'asc';
    const newCriterion: SortCriterion = { field, direction: defaultDirection };
    const newActiveCriteria = [...localConfig.activeCriteria, newCriterion];
    const newInactiveCriteria = localConfig.inactiveCriteria.filter(f => f !== field);
    const newConfig = {
      activeCriteria: newActiveCriteria,
      inactiveCriteria: newInactiveCriteria
    };
    setLocalConfig(newConfig);
    onChange(newConfig);
  };

  const clearAll = () => {
    const allFields: SortField[] = ['name', 'createdAt', 'updatedAt', 'id', 'type', 'email', 'status'];
    const newConfig = {
      activeCriteria: [],
      inactiveCriteria: allFields
    };
    setLocalConfig(newConfig);
    onChange(newConfig);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25" 
        onClick={onClose}
        data-testid="sort-panel-backdrop"
      />
      
      {/* Modal */}
      <div className="fixed right-[25rem] top-32 w-1/3 bg-white rounded-lg shadow-xl border border-slate-200">
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Sort By</h3>
        </div>
        
        {/* Modal Body */}
        <div className="p-4 space-y-4">
          {/* Active Sort Criteria */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={localConfig.activeCriteria.map(c => `${c.field}-${c.direction}`)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {localConfig.activeCriteria.map((criterion) => (
                  <SortCriterionItem
                    key={`${criterion.field}-${criterion.direction}`}
                    id={`${criterion.field}-${criterion.direction}`}
                    field={criterion.field}
                    direction={criterion.direction}
                    label={FIELD_LABELS[criterion.field]}
                    options={FIELD_OPTIONS[criterion.field]}
                    onToggleDirection={() => toggleDirection(criterion.field)}
                    onRemove={() => removeCriterion(criterion.field)}
                    data-testid={`sort-criterion-${criterion.field}`}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          
          {/* Inactive Sort Criteria */}
          {localConfig.inactiveCriteria.length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <div className="space-y-2">
                {localConfig.inactiveCriteria.map((field) => (
                  <button
                    key={field}
                    onClick={() => addCriterion(field)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-50 rounded-md border border-slate-200 transition-colors"
                    data-testid={`add-criterion-${field}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Plus className="w-4 h-4 text-slate-300" />
                      <span className="text-sm text-slate-600">{FIELD_LABELS[field]}</span>
                    </div>
                    <div className="flex text-xs text-slate-400 space-x-1">
                      <span>{FIELD_OPTIONS[field].asc}</span>
                      <span>·</span>
                      <span>{FIELD_OPTIONS[field].desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
          <Button
            variant="ghost"
            onClick={clearAll}
            className="text-sm text-slate-500 hover:text-slate-700"
            data-testid="button-clear-all"
          >
            Clear all
          </Button>
          <Button
            onClick={onApply}
            className="bg-slate-900 text-white hover:bg-slate-800 text-sm"
            data-testid="button-apply-sort"
          >
            Apply Sort
          </Button>
        </div>
      </div>
    </div>
  );
}
