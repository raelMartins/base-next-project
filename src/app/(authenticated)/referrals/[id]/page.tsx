"use client";

import { use } from "react";
import { ReferralsPage } from "@/components/pages/Referral";

export default function ReferralDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <ReferralsPage id={id} />;
}
