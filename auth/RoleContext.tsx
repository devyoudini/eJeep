import React, { ReactNode, createContext, useContext, useState } from "react";

export const RoleContext = createContext<{
  role: string;
  updateRole(value: string): void;
}>({
  role: "",
  updateRole() {
    return null;
  },
});

export const RoleContextProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState("");

  function updateRole(value: string) {
    setRole(value);
  }
  return (
    <RoleContext.Provider value={{ role, updateRole }}>
      {children}
    </RoleContext.Provider>
  );
};
