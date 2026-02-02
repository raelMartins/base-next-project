'use client';
import { LibraryProvider, RequestPage } from '@raelmartins/realtors-portal';

export default function MyRequestPage() {
  return (
    <LibraryProvider>
      <RequestPage apiKey='' userName={''} />
    </LibraryProvider>
  );
}
