"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";

export default function ClientToast() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover
      style={{ zIndex: 2147483647 }}
      toastStyle={{ zIndex: 2147483647 }}
    />,
    document.body
  );
}
