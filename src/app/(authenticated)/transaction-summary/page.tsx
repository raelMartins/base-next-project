"use client";

import { useSearchParams } from "next/navigation";
import { ReferralTransactionSummary } from "@/components/pages/Referral/TransactionSummary";

export default function TransactionSummaryRoutePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const user_id = searchParams.get("user_id") ?? "";

  return <ReferralTransactionSummary id={id} user_id={user_id} />;
}
