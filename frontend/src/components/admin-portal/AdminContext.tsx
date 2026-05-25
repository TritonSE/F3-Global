"use client";
import { createContext, useContext, useState } from "react";

const AdminContext = createContext<{
  hasChanges: boolean;
  setHasChanges: (v: boolean) => void;
}>({ hasChanges: false, setHasChanges: () => {} });

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasChanges, setHasChanges] = useState(false);
  return (
    <AdminContext.Provider value={{ hasChanges, setHasChanges }}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
