'use client';
import { LibraryProvider, ListingsPage } from '@raelmartins/realtors-portal';

export default function OurOfferingsPage() {
  return (
    <LibraryProvider>
      <ListingsPage apiKey='' userName={''} />
    </LibraryProvider>
  );
}
