'use client';
import {
  LibraryProvider,
  TransactionsPage
} from '@raelmartins/realtors-portal';

export default function MyReferralsPage() {
  return (
    <LibraryProvider>
      <TransactionsPage apiKey='' userName={''} />
    </LibraryProvider>
  );
}
