import { createContext, useEffect, useState, ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import Customer from "../types/customer";
import Login from "./login";
import Ticket from "../types/ticket";

export interface AuthContextProps {
  authId: string | null;
  activeFileId: number | null;
  setActiveFileId: (id?: number) => void;
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  customerInfo: Customer | null;
  setCustomerInfo: (customerInfo: Customer) => void;
  login: (authId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  authId: null,
  activeFileId: null,
  setActiveFileId: (id?: number) => {},
  tickets: [],
  setTickets: (tickets: Ticket[]) => {},
  customerInfo: null,
  setCustomerInfo: () => {},
  login: () => {},
  logout: () => {},
});

export default AuthContext;
export interface AuthContextProviderProps {
  children: ReactNode;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authId, setAuthId] = useState<string | null>(null);
  const [activeFile, setActiveFile] = useState<number | null>(null);
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [params, setParams] = useSearchParams();
  const [openTickets, setOpenTickets] = useState<Ticket[]>([]);

  const login = (authId: string) => {
    localStorage.setItem("authId", authId);
    setAuthId(authId);
  };

  const logout = () => {
    localStorage.removeItem("authId");
    params.delete("lId");
    setParams(params);
    setAuthId("");
  };

  const setActiveFileId = (id?: number) => {
    if (!id || id === activeFile) return;
    localStorage.setItem("activeFileId", JSON.stringify(id));
    setActiveFile(id);
  };

  var context = {
    authId,
    login,
    logout,
    activeFileId: activeFile,
    setActiveFileId,
    tickets: openTickets,
    setTickets: setOpenTickets,
    customerInfo,
    setCustomerInfo,
  };

  useEffect(() => {
    if (authId === null) {
      let item = params.get("lId");
      if (!item) item = localStorage.getItem("authId");
      setAuthId(item);
    }
    const activeFileId = localStorage.getItem("activeFileId");
    if (!activeFile)
      setActiveFile(activeFileId ? (JSON.parse(activeFileId) as number) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContext.Provider value={context}>
      {authId ? children : <Login />}
    </AuthContext.Provider>
  );
};
