"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        toastClassName="relative flex p-1 min-h-20 rounded-md justify-between overflow-hidden cursor-pointer default"
        position="top-right"
        autoClose={5000}
      />
    </>
  );
}
