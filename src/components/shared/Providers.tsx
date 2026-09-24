"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PlanProvider } from "@/context/PlanContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      {children}

      <ToastContainer position="bottom-right" autoClose={2500} theme="dark" />
    </PlanProvider>
  );
}
