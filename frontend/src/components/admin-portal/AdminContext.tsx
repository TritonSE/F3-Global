"use client";
import { createContext, useContext, useState } from "react";

const AdminContext = createContext<{
  hasChanges: boolean;
  setHasChanges: (v: boolean) => void;
  activeSidebarItem: string | null;
  setActiveSidebarItem: (v: string | null) => void;
}>({
  hasChanges: false,
  setHasChanges: () => {},
  activeSidebarItem: null,
  setActiveSidebarItem: () => {},
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>(null);
  return (
    <AdminContext.Provider
      value={{ hasChanges, setHasChanges, activeSidebarItem, setActiveSidebarItem }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
