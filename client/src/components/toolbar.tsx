import { Search, ArrowUpDown, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ToolbarProps {
  activeTab: "All" | "Individual" | "Company";
  onTabChange: (tab: "All" | "Individual" | "Company") => void;
  activeSortCount: number;
  onSortClick: () => void;
}

export default function Toolbar({ 
  activeTab, 
  onTabChange, 
  activeSortCount, 
  onSortClick 
}: ToolbarProps) {
  const tabs = ["All", "Individual", "Company"] as const;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
      {/* Tabs */}
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-1 ${
              activeTab === tab
                ? "text-slate-900 font-medium border-b-2 border-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
            data-testid={`tab-${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Search Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-slate-600"
          data-testid="button-search"
        >
          <Search className="w-5 h-5" />
        </Button>

        {/* Sort Icon with Badge */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-400 hover:text-slate-600"
          onClick={onSortClick}
          data-testid="button-sort"
        >
          <ArrowUpDown className="w-5 h-5" />
          {activeSortCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0"
              data-testid="badge-sort-count"
            >
              {activeSortCount}
            </Badge>
          )}
        </Button>

        {/* Filter Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-slate-600"
          data-testid="button-filter"
        >
          <Filter className="w-5 h-5" />
        </Button>

        {/* Add Client Button */}
        <Button 
          className="bg-slate-900 text-white hover:bg-slate-800"
          data-testid="button-add-client"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>
    </div>
  );
}
