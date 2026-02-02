'use client';
import {
  LibraryProvider,
  TransactionsPage
} from '@raelmartins/realtors-portal';

export default function MyTransactionsPage() {
  return (
    <LibraryProvider>
      <TransactionsPage apiKey='' userName={''} />
    </LibraryProvider>
  );
}
