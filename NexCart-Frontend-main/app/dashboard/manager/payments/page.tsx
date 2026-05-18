"use client";
import { useEffect } from "react";
export default function PaymentsRedirect() {
  useEffect(() => {
    window.location.replace("/dashboard/manager");
  }, []);
  return null;
}
