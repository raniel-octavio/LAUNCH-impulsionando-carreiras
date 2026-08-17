"use client";
import { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";

type ModalContextType = {
  setModal: (modal: React.ReactNode | null) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<React.ReactNode | null>(null);

  return (
    <ModalContext.Provider value={{ setModal }}>
      {children}
      {modal &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
            {modal}
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
}
