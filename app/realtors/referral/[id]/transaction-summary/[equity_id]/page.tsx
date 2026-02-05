'use client';
import { ReferralTransactionSummary } from '@veerge/realtors-portal';
import { useParams } from 'next/navigation';

export default function ReferralTransactionSummaryPage() {
  const { id, equity_id } = useParams();
  return (
    <ReferralTransactionSummary
      user_id={id as string}
      id={equity_id as string}
    />
  );
}
