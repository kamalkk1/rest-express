import { useState } from "react";
import ClientTable from "@/components/client-table";
import Toolbar from "@/components/toolbar";
import SortPanel from "@/components/sort-panel";
import { useSortConfig } from "@/hooks/use-sort-config";
import { multiSort } from "@/lib/multi-sort";
import { mockClients } from "@/lib/mock-data";

export default function ClientTablePage() {
  const [activeTab, setActiveTab] = useState<"All" | "Individual" | "Company">("All");
  const [showSortPanel, setShowSortPanel] = useState(false);
  const { sortConfig, updateSortConfig, applySortConfig } = useSortConfig();

  // Filter clients based on active tab
  const filteredClients = mockClients.filter(client => {
    if (activeTab === "All") return true;
    return client.type === activeTab;
  });

  // Apply sorting to filtered clients
  const sortedClients = multiSort(filteredClients, sortConfig.activeCriteria);

  const handleApplySort = () => {
    applySortConfig();
    setShowSortPanel(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-semibold text-slate-900">Clients</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
          <Toolbar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeSortCount={sortConfig.activeCriteria.length}
            onSortClick={() => setShowSortPanel(true)}
            data-testid="toolbar"
          />
          <ClientTable 
            clients={sortedClients} 
            data-testid="client-table"
          />
        </div>
      </div>

      {/* Sort Panel Modal */}
      {showSortPanel && (
        <SortPanel
          sortConfig={sortConfig}
          onChange={updateSortConfig}
          onApply={handleApplySort}
          onClose={() => setShowSortPanel(false)}
          data-testid="sort-panel"
        />
      )}
    </div>
  );
}
