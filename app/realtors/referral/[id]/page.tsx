'use client';
import { ReferralsPage } from '@veerge/realtors-portal';
import { useParams } from 'next/navigation';

export default function MyReferralsPage() {
  const { id } = useParams();
  return <ReferralsPage id={id as string} />;
}
