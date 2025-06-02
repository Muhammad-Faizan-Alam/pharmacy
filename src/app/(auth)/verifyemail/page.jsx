"use client";
import { Suspense } from "react";
import VerifyEmailContent from "@/components/VerifyEmailContent";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}