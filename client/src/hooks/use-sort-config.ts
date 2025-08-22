import { useState, useEffect } from "react";
import { SortConfig, SortField } from "@shared/schema";

const STORAGE_KEY = "clientTableSortConfig";

const defaultSortConfig: SortConfig = {
  activeCriteria: [
    { field: "name", direction: "asc" },
    { field: "createdAt", direction: "desc" },
  ],
  inactiveCriteria: ["updatedAt", "id", "type", "email", "status"],
};

export function useSortConfig() {
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSortConfig);
  const [appliedConfig, setAppliedConfig] = useState<SortConfig>(defaultSortConfig);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSortConfig(parsed);
        setAppliedConfig(parsed);
      }
    } catch (error) {
      console.error("Failed to load sort config from localStorage:", error);
    }
  }, []);

  const updateSortConfig = (newConfig: SortConfig) => {
    setSortConfig(newConfig);
  };

  const applySortConfig = () => {
    setAppliedConfig(sortConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sortConfig));
    } catch (error) {
      console.error("Failed to save sort config to localStorage:", error);
    }
  };

  return {
    sortConfig: appliedConfig,
    tempConfig: sortConfig,
    updateSortConfig,
    applySortConfig,
  };
}
